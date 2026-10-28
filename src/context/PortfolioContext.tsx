import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioItem } from '../types';
import { INITIAL_PORTFOLIO } from '../data/initialData';

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
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
}

const STORAGE_KEY = 'ahmad_printers_portfolio_v2';
const ADMIN_AUTH_KEY = 'ahmad_printers_admin_session';
export const ADMIN_PIN = 'ahmad2026';

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
      console.error('Failed to load portfolio from storage:', e);
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
      console.error('Failed to save portfolio to storage:', e);
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

  const loginAdmin = (pin: string): boolean => {
    if (pin.trim() === ADMIN_PIN) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch {
        // ignore
      }
      return true;
    }
    return false;
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