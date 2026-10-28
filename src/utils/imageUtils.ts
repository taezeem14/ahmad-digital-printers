import { supabase, BUCKET_NAME } from '../supabase';

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
 * Converts a base64 Data URL to a native binary Blob for efficient network upload.
 */
function dataURLtoBlob(dataUrl: string): { blob: Blob; mimeType: string } {
  const parts = dataUrl.split(',');
  const mimeMatch = parts[0].match(/:(.*?);/);
  const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const binaryString = atob(parts[1]);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return {
    blob: new Blob([bytes], { type: mimeType }),
    mimeType,
  };
}

/**
 * Uploads an image to Supabase Cloud Storage (public 'portfolio' bucket) with zero CORS issues,
 * accompanied by graceful fallback to direct compressed Data URL if network is offline.
 */
export async function uploadImageToCloud(
  dataUrlOrUrl: string,
  fileNamePrefix: string = 'work'
): Promise<string> {
  // If already an external HTTP/HTTPS URL, no need to upload
  if (dataUrlOrUrl.startsWith('http://') || dataUrlOrUrl.startsWith('https://')) {
    return dataUrlOrUrl;
  }

  // If it's a data URL, upload to Supabase Storage
  try {
    const timestamp = Date.now();
    const cleanPrefix = fileNamePrefix
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .substring(0, 25);

    const { blob, mimeType } = dataURLtoBlob(dataUrlOrUrl);
    const extension = mimeType === 'image/png' ? 'png' : mimeType === 'image/webp' ? 'webp' : 'jpg';
    const filePath = `works/${cleanPrefix}_${timestamp}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, blob, {
        contentType: mimeType,
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: publicData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    if (!publicData || !publicData.publicUrl) {
      throw new Error('Could not retrieve public URL from Supabase');
    }

    console.log('Successfully uploaded image to Supabase Storage:', publicData.publicUrl);
    return publicData.publicUrl;
  } catch (supabaseErr) {
    console.warn(
      'Supabase Storage upload warning. Falling back safely to high-res compressed image data:',
      supabaseErr
    );
    // Gracefully fall back to the compressed data URL directly stored in Firestore!
    return dataUrlOrUrl;
  }
}

/**
 * Safely deletes an image from Supabase Storage if it was uploaded to our bucket.
 */
export async function deleteImageFromCloud(imageUrl?: string): Promise<void> {
  if (!imageUrl) return;
  
  const bucketPrefix = `/storage/v1/object/public/${BUCKET_NAME}/`;
  if (imageUrl.includes(bucketPrefix)) {
    try {
      const path = imageUrl.split(bucketPrefix)[1];
      if (path) {
        await supabase.storage.from(BUCKET_NAME).remove([decodeURIComponent(path)]);
        console.log('Deleted image from Supabase Storage:', path);
      }
    } catch (err) {
      console.warn('Failed to delete image from Supabase Storage:', err);
    }
  }
}
