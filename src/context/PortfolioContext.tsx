import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { db } from '../firebase';
import { PortfolioItem, ClientInquiry } from '../types';
import { INITIAL_PORTFOLIO } from '../data/initialData';

export interface AuthAttemptResult {
  success: boolean;
  reason?: 'invalid_password' | 'rate_limited' | 'bruteforce';
  remainingAttempts?: number;
  retryAfterSeconds?: number;
  message?: string;
}

interface PortfolioContextType {
  items: PortfolioItem[];
  approvedItems: PortfolioItem[];
  isCloudConnected: boolean;
  isLoading: boolean;
  toggleApproval: (id: string) => Promise<void>;
  toggleFeatured: (id: string) => Promise<void>;
  addItem: (item: Omit<PortfolioItem, 'id' | 'dateAdded'>) => Promise<string>;
  deleteItem: (id: string) => Promise<void>;
  updateItem: (id: string, updates: Partial<PortfolioItem>) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  inquiries: ClientInquiry[];
  addInquiry: (inquiry: Omit<ClientInquiry, 'id' | 'createdAt' | 'status'>) => Promise<string>;
  markInquiryContacted: (id: string) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => AuthAttemptResult;
  logoutAdmin: () => void;
  getSecurityLockStatus: () => { isLocked: boolean; remainingSeconds: number; isBruteForce: boolean };
}

const STORAGE_KEY = 'ahmad_printers_portfolio_v3';
const ADMIN_AUTH_KEY = 'ahmad_printers_admin_session';
const SECURITY_STORAGE_KEY = 'adp_admin_sec_v1';
export const ADMIN_PASSWORD = 'suhailahmaddar123';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local fallback / initial cache
  const [items, setItems] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load local cached portfolio:', e);
    }
    return INITIAL_PORTFOLIO;
  });

  const [inquiries, setInquiries] = useState<ClientInquiry[]>([]);
  const [isCloudConnected, setIsCloudConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // 1. Real-time Firebase Cloud Firestore Listener for Portfolio Works
  useEffect(() => {
    let isSubscribed = true;
    const portfolioCollection = collection(db, 'portfolio_items');

    const unsubscribe = onSnapshot(
      portfolioCollection,
      (snapshot) => {
        if (!isSubscribed) return;

        if (snapshot.empty) {
          // When Firestore collection is empty (e.g. admin deleted all cards),
          // DO NOT re-seed! Respect the admin's deletion so items stay empty.
          console.log('Cloud Firestore portfolio_items collection is empty.');
          setItems([]);
          setIsCloudConnected(true);
          setIsLoading(false);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
          } catch {
            // ignore
          }
        } else {
          const cloudItems: PortfolioItem[] = [];
          snapshot.forEach((snapDoc) => {
            const data = snapDoc.data() as Omit<PortfolioItem, 'id'>;
            cloudItems.push({
              id: snapDoc.id,
              ...data,
            });
          });

          // Sort by dateAdded descending
          cloudItems.sort((a, b) => (b.dateAdded || '').localeCompare(a.dateAdded || ''));

          setItems(cloudItems);
          setIsCloudConnected(true);
          setIsLoading(false);

          // Update local cache for instant offline rendering
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudItems));
          } catch {
            // ignore
          }
        }
      },
      (error) => {
        console.error('Firestore real-time sync error (using local cache):', error);
        setIsCloudConnected(false);
        setIsLoading(false);
      }
    );

    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  // 2. Real-time Firebase Cloud Firestore Listener for Client Inquiries
  useEffect(() => {
    const inquiriesCollection = collection(db, 'client_inquiries');

    const unsubscribe = onSnapshot(
      inquiriesCollection,
      (snapshot) => {
        const cloudInquiries: ClientInquiry[] = [];
        snapshot.forEach((snapDoc) => {
          cloudInquiries.push({
            id: snapDoc.id,
            ...(snapDoc.data() as Omit<ClientInquiry, 'id'>),
          });
        });

        // Sort inquiries newest first
        cloudInquiries.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        setInquiries(cloudInquiries);
      },
      (error) => {
        console.warn('Firestore client_inquiries listener:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  const approvedItems = items.filter((item) => item.isApproved);

  // Real-time Cloud CRUD Operations
  const toggleApproval = async (id: string) => {
    const current = items.find((i) => i.id === id);
    if (!current) return;
    const nextApproved = !current.isApproved;

    // Optimistic UI update
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isApproved: nextApproved } : item))
    );

    try {
      const itemRef = doc(db, 'portfolio_items', id);
      await updateDoc(itemRef, { isApproved: nextApproved });
    } catch (e) {
      console.error('Error toggling approval in Cloud Firestore:', e);
    }
  };

  const toggleFeatured = async (id: string) => {
    const current = items.find((i) => i.id === id);
    if (!current) return;
    const nextFeatured = !current.isFeatured;

    // Optimistic UI update
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFeatured: nextFeatured } : item))
    );

    try {
      const itemRef = doc(db, 'portfolio_items', id);
      await updateDoc(itemRef, { isFeatured: nextFeatured });
    } catch (e) {
      console.error('Error toggling featured in Cloud Firestore:', e);
    }
  };

  const addItem = async (newItemData: Omit<PortfolioItem, 'id' | 'dateAdded'>): Promise<string> => {
    const newId = 'port-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const newItem: PortfolioItem = {
      ...newItemData,
      id: newId,
      dateAdded: new Date().toISOString().split('T')[0],
    };

    // Optimistic UI update
    setItems((prev) => [newItem, ...prev]);

    try {
      const itemRef = doc(db, 'portfolio_items', newId);
      await setDoc(itemRef, newItem);
      console.log('Saved new work to Cloud Firestore:', newId);
    } catch (e) {
      console.error('Error saving item to Cloud Firestore:', e);
    }

    return newId;
  };

  const deleteItem = async (id: string) => {
    // Optimistic UI update
    setItems((prev) => prev.filter((item) => item.id !== id));

    try {
      const itemRef = doc(db, 'portfolio_items', id);
      await deleteDoc(itemRef);
    } catch (e) {
      console.error('Error deleting item from Cloud Firestore:', e);
    }
  };

  const updateItem = async (id: string, updates: Partial<PortfolioItem>) => {
    // Optimistic UI update
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );

    try {
      const itemRef = doc(db, 'portfolio_items', id);
      await updateDoc(itemRef, updates);
    } catch (e) {
      console.error('Error updating item in Cloud Firestore:', e);
    }
  };

  const resetToDefaults = async () => {
    setItems(INITIAL_PORTFOLIO);
    try {
      const snap = await getDocs(collection(db, 'portfolio_items'));
      const batch = writeBatch(db);
      snap.forEach((d) => batch.delete(d.ref));
      INITIAL_PORTFOLIO.forEach((item) => {
        batch.set(doc(db, 'portfolio_items', item.id), item);
      });
      await batch.commit();
      console.log('Reset Cloud Firestore to default samples.');
    } catch (e) {
      console.error('Error resetting Cloud Firestore:', e);
    }
  };

  // Cloud Inquiry Management
  const addInquiry = async (
    inquiryData: Omit<ClientInquiry, 'id' | 'createdAt' | 'status'>
  ): Promise<string> => {
    const inqId = 'inq-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const newInquiry: ClientInquiry = {
      ...inquiryData,
      id: inqId,
      createdAt: new Date().toISOString(),
      status: 'New',
    };

    try {
      await setDoc(doc(db, 'client_inquiries', inqId), newInquiry);
      console.log('Logged order inquiry to Cloud Firestore:', inqId);
    } catch (e) {
      console.error('Error logging inquiry to Cloud Firestore:', e);
    }

    return inqId;
  };

  const markInquiryContacted = async (id: string) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: 'Contacted' } : inq))
    );
    try {
      await updateDoc(doc(db, 'client_inquiries', id), { status: 'Contacted' });
    } catch (e) {
      console.error('Error updating inquiry status in Firestore:', e);
    }
  };

  const deleteInquiry = async (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    try {
      await deleteDoc(doc(db, 'client_inquiries', id));
    } catch (e) {
      console.error('Error deleting inquiry from Firestore:', e);
    }
  };

  // Anti-Bruteforce & Rate Limiting Security Engine
  const getSecurityData = () => {
    try {
      const raw = localStorage.getItem(SECURITY_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return {
      failedAttempts: [] as number[],
      lastAttemptTime: 0,
      lockedUntil: 0,
      bruteForceUntil: 0,
    };
  };

  const saveSecurityData = (data: any) => {
    try {
      localStorage.setItem(SECURITY_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  };

  const getSecurityLockStatus = () => {
    const sec = getSecurityData();
    const now = Date.now();

    if (sec.bruteForceUntil && now < sec.bruteForceUntil) {
      return {
        isLocked: true,
        remainingSeconds: Math.ceil((sec.bruteForceUntil - now) / 1000),
        isBruteForce: true,
      };
    }

    if (sec.lockedUntil && now < sec.lockedUntil) {
      return {
        isLocked: true,
        remainingSeconds: Math.ceil((sec.lockedUntil - now) / 1000),
        isBruteForce: false,
      };
    }

    return {
      isLocked: false,
      remainingSeconds: 0,
      isBruteForce: false,
    };
  };

  const loginAdmin = (passwordInput: string): AuthAttemptResult => {
    const now = Date.now();
    const sec = getSecurityData();

    // 1. Check if already under active lockout
    if (sec.bruteForceUntil && now < sec.bruteForceUntil) {
      const remaining = Math.ceil((sec.bruteForceUntil - now) / 1000);
      return {
        success: false,
        reason: 'bruteforce',
        retryAfterSeconds: remaining,
        message: `Automated brute-force pattern detected. Locked out for ${remaining} seconds.`,
      };
    }

    if (sec.lockedUntil && now < sec.lockedUntil) {
      const remaining = Math.ceil((sec.lockedUntil - now) / 1000);
      return {
        success: false,
        reason: 'rate_limited',
        retryAfterSeconds: remaining,
        message: `Maximum attempts exceeded. Try again in ${remaining} seconds.`,
      };
    }

    // 2. Anti-Bruteforcer Detection: Rapid consecutive attempts (< 600ms)
    if (sec.lastAttemptTime && now - sec.lastAttemptTime < 600) {
      sec.bruteForceUntil = now + 5 * 60 * 1000; // 5 minute lock
      sec.lastAttemptTime = now;
      saveSecurityData(sec);
      return {
        success: false,
        reason: 'bruteforce',
        retryAfterSeconds: 300,
        message: 'Security Alert: Rapid automated submissions detected. Access blocked for 5 minutes.',
      };
    }

    sec.lastAttemptTime = now;

    // 3. Password Verification
    if (passwordInput.trim() === ADMIN_PASSWORD) {
      saveSecurityData({
        failedAttempts: [],
        lastAttemptTime: now,
        lockedUntil: 0,
        bruteForceUntil: 0,
      });
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch {
        // ignore
      }
      return { success: true };
    }

    // 4. Failed attempt handling (max 5 per minute)
    const recentFailures = (sec.failedAttempts || []).filter(
      (ts: number) => now - ts < 60 * 1000
    );
    recentFailures.push(now);
    sec.failedAttempts = recentFailures;

    if (recentFailures.length >= 5) {
      sec.lockedUntil = now + 60 * 1000; // 60s lockout
      saveSecurityData(sec);
      return {
        success: false,
        reason: 'rate_limited',
        retryAfterSeconds: 60,
        message: 'Rate limit reached: Maximum 5 attempts per minute. Locked for 60 seconds.',
      };
    }

    const remaining = 5 - recentFailures.length;
    saveSecurityData(sec);
    return {
      success: false,
      reason: 'invalid_password',
      remainingAttempts: remaining,
      message: `Incorrect password. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining this minute.`,
    };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        items,
        approvedItems,
        isCloudConnected,
        isLoading,
        toggleApproval,
        toggleFeatured,
        addItem,
        deleteItem,
        updateItem,
        resetToDefaults,
        inquiries,
        addInquiry,
        markInquiryContacted,
        deleteInquiry,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        getSecurityLockStatus,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
