import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioItem } from '../types';
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
  toggleApproval: (id: string) => void;
  toggleFeatured: (id: string) => void;
  addItem: (item: Omit<PortfolioItem, 'id' | 'dateAdded'>) => void;
  deleteItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<PortfolioItem>) => void;
  resetToDefaults: () => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => AuthAttemptResult;
  logoutAdmin: () => void;
  getSecurityLockStatus: () => { isLocked: boolean; remainingSeconds: number; isBruteForce: boolean };
}

const STORAGE_KEY = 'ahmad_printers_portfolio_v2';
const ADMIN_AUTH_KEY = 'ahmad_printers_admin_session';
const SECURITY_STORAGE_KEY = 'adp_admin_sec_v1';
export const ADMIN_PASSWORD = 'suhailahmaddar123';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load portfolio:', e);
    }
    return INITIAL_PORTFOLIO;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save portfolio:', e);
    }
  }, [items]);

  const approvedItems = items.filter((item) => item.isApproved);

  const toggleApproval = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isApproved: !item.isApproved } : item
      )
    );
  };

  const toggleFeatured = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFeatured: !item.isFeatured } : item
      )
    );
  };

  const addItem = (newItemData: Omit<PortfolioItem, 'id' | 'dateAdded'>) => {
    const newItem: PortfolioItem = {
      ...newItemData,
      id: 'port-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setItems((prev) => [newItem, ...prev]);
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<PortfolioItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const resetToDefaults = () => {
    setItems(INITIAL_PORTFOLIO);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Security helper
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
      // Clear penalties
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
        toggleApproval,
        toggleFeatured,
        addItem,
        deleteItem,
        updateItem,
        resetToDefaults,
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
