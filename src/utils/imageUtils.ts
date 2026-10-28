import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

/**
 * Compresses an image file client-side using an HTML5 Canvas.
 * Keeps aspect ratio, caps dimensions to max 1200px, converts to high-quality JPEG (quality 0.82),
 * resulting in lean ~100-250KB images that upload lightning-fast and never lag mobile devices.
 */
export const compressImageFile = (
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.82
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Uploads an image to Firebase Storage, with seamless fallback to direct compressed Data URL.
 * If Storage rules or CORS fail, it gracefully returns the compressed Data URL so the upload NEVER fails.
 */
export async function uploadImageToCloud(
  dataUrlOrUrl: string,
  fileNamePrefix: string = 'work'
): Promise<string> {
  // If already an external HTTP/HTTPS URL, no need to upload
  if (dataUrlOrUrl.startsWith('http://') || dataUrlOrUrl.startsWith('https://')) {
    return dataUrlOrUrl;
  }

  // If it's a data URL, attempt upload to Firebase Storage
  try {
    const timestamp = Date.now();
    const cleanPrefix = fileNamePrefix.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 20);
    const storageRef = ref(storage, `portfolio/${cleanPrefix}_${timestamp}.jpg`);
    
    // Upload string format 'data_url'
    const snapshot = await uploadString(storageRef, dataUrlOrUrl, 'data_url');
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (storageErr) {
    console.warn(
      'Firebase Storage bucket unavailable or restricted by rules. Falling back to high-res compressed document image:',
      storageErr
    );
    // Fall back cleanly to the compressed data URL directly stored in Firestore!
    return dataUrlOrUrl;
  }
}
