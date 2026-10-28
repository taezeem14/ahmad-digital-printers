import React, { useState, useEffect } from 'react';
import {
  Shield,
  Upload,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Trash2,
  Star,
  Lock,
  LogOut,
  RefreshCw,
  Plus,
  Image as ImageIcon,
  Check,
  Search,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProductCategory } from '../types';

const CATEGORIES: ProductCategory[] = [
  'Wedding Cards',
  'Flex & Banners',
  'Packaging & Boxes',
  'Corporate Stationery',
  'Stickers & Labels',
  'Books & Bill Books',
  'Signage & Hoardings',
];

interface AdminPortalProps {
  onBackToSite: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToSite }) => {
  const {
    items,
    toggleApproval,
    toggleFeatured,
    addItem,
    deleteItem,
    resetToDefaults,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    getSecurityLockStatus,
  } = usePortfolio();

  // Auth form state
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isBruteForceAlert, setIsBruteForceAlert] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);

  // Lock status countdown
  const [lockCountdown, setLockCountdown] = useState<number>(0);

  useEffect(() => {
    const checkLock = () => {
      const status = getSecurityLockStatus();
      if (status.isLocked) {
        setLockCountdown(status.remainingSeconds);
        setIsBruteForceAlert(status.isBruteForce);
      } else {
        setLockCountdown(0);
        setIsBruteForceAlert(false);
      }
    };

    checkLock();
    const interval = setInterval(checkLock, 1000);
    return () => clearInterval(interval);
  }, [getSecurityLockStatus]);

  // Dashboard Filter & Search
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'hidden'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Upload Form State
  const [isUploading, setIsUploading] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ProductCategory>('Wedding Cards');
  const [newClient, setNewClient] = useState('');
  const [newFinish, setNewFinish] = useState('');
  const [newDimensions, setNewDimensions] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newIsApproved, setNewIsApproved] = useState(true);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockCountdown > 0) return;

    const result = loginAdmin(passwordInput);
    if (result.success) {
      setErrorMessage(null);
      setPasswordInput('');
      setRemainingAttempts(null);
    } else {
      setErrorMessage(result.message || 'Authentication failed.');
      if (result.reason === 'bruteforce') {
        setIsBruteForceAlert(true);
      }
      if (result.remainingAttempts !== undefined) {
        setRemainingAttempts(result.remainingAttempts);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit. Please choose a smaller photo.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newImageUrl.trim()) {
      alert('Please provide a title and image.');
      return;
    }

    addItem({
      title: newTitle.trim(),
      category: newCategory,
      client: newClient.trim() || 'Ahmad Digital Printers Client',
      finish: newFinish.trim() || 'Standard Commercial Finish',
      dimensions: newDimensions.trim() || 'Standard Spec',
      description: newDescription.trim() || 'High precision print job executed at Main Chowk Sopore workshop.',
      imageUrl: newImageUrl,
      isApproved: newIsApproved,
      isFeatured: false,
    });

    setNewTitle('');
    setNewClient('');
    setNewFinish('');
    setNewDimensions('');
    setNewDescription('');
    setNewImageUrl('');
    setUploadSuccessMsg(true);
    setTimeout(() => {
      setUploadSuccessMsg(false);
      setIsUploading(false);
    }, 1500);
  };

  const filteredItems = items.filter((item) => {
    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'approved'
        ? item.isApproved
        : !item.isApproved;

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.client && item.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const totalCount = items.length;
  const approvedCount = items.filter((i) => i.isApproved).length;
  const hiddenCount = totalCount - approvedCount;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Discreet Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <button
            onClick={onBackToSite}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Website</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              Discreet Portal
            </span>
            {isAdminAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-rose-300 bg-rose-950/60 border border-rose-800/60 hover:bg-rose-900 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>

        {!isAdminAuthenticated ? (
          /* Discreet Login Screen with Rate Limiting & Anti-Bruteforce */
          <div className="max-w-md mx-auto py-16 text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 text-amber-400 flex items-center justify-center mx-auto shadow-xl">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">Staff Authentication</h2>
              <p className="text-xs text-slate-400 mt-1">
                Administrative portal for Ahmad Digital Printers moderation.
              </p>
            </div>

            {/* Brute-force or Rate-limit Lock Warning */}
            {lockCountdown > 0 ? (
              <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-800 text-left space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {isBruteForceAlert
                      ? 'Security Lockout: Automated Activity Detected'
                      : 'Rate Limit Exceeded (Max 5 attempts / min)'}
                  </span>
                </div>
                <p className="text-[11px] text-rose-200 leading-relaxed">
                  Authentication is temporarily frozen. Please wait before retrying:
                </p>
                <div className="font-mono text-lg font-black text-rose-300">
                  {Math.floor(lockCountdown / 60)}m {lockCountdown % 60}s remaining
                </div>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={passwordInput}
                    disabled={lockCountdown > 0}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setErrorMessage(null);
                    }}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-800 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-600 text-center tracking-wider text-sm font-mono disabled:opacity-50"
                    autoFocus
                  />

                  {errorMessage && (
                    <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-300 text-xs font-semibold flex items-center justify-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {remainingAttempts !== null && remainingAttempts > 0 && lockCountdown === 0 && (
                    <p className="text-[11px] text-slate-400">
                      {remainingAttempts} attempt{remainingAttempts === 1 ? '' : 's'} remaining this minute.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={lockCountdown > 0}
                  className="w-full py-3 rounded-2xl text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 shadow transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Verify Credentials
                </button>
              </form>
            )}

            <div className="text-[11px] text-slate-500 pt-4 border-t border-slate-900">
              Protected by automated brute-force defense &bull; 5 attempts per minute max
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="space-y-6">
            {/* Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Uploads</span>
                  <h5 className="text-xl font-black text-white">{totalCount}</h5>
                </div>
                <ImageIcon className="w-5 h-5 text-slate-500" />
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Live on Site</span>
                  <h5 className="text-xl font-black text-emerald-300">{approvedCount}</h5>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Hidden / Offline</span>
                  <h5 className="text-xl font-black text-amber-300">{hiddenCount}</h5>
                </div>
                <XCircle className="w-5 h-5 text-amber-400" />
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setIsUploading(!isUploading)}
                  className="w-full py-2 px-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isUploading ? 'View Photo List' : 'Upload New Photo'}</span>
                </button>
              </div>
            </div>

            {/* Upload Drawer */}
            {isUploading && (
              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 animate-in fade-in space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <Upload className="w-4 h-4 text-violet-400" />
                    <span>Upload &amp; Moderate New Photo</span>
                  </h4>
                  <button
                    onClick={() => setIsUploading(false)}
                    className="text-xs text-slate-400 hover:text-white underline"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleAddItem} className="space-y-3.5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-xs font-bold text-slate-300">
                        Choose Photo File (or Paste URL)
                      </label>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 hover:border-violet-500 rounded-2xl p-4 bg-slate-950 cursor-pointer transition-colors">
                          <Upload className="w-5 h-5 text-violet-400 mb-1" />
                          <span className="text-xs font-semibold text-slate-200">
                            Upload image file from device
                          </span>
                          <span className="text-[10px] text-slate-500">PNG, JPG, WEBP up to 5MB</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>

                        <div className="flex-1 flex flex-col justify-center">
                          <span className="text-[11px] text-slate-400 mb-1">Or image URL:</span>
                          <input
                            type="url"
                            placeholder="https://example.com/photo.jpg"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            className="px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                          />
                        </div>
                      </div>

                      {newImageUrl && (
                        <div className="mt-2 flex items-center gap-3 p-2 rounded-xl bg-slate-950 border border-slate-800">
                          <img
                            src={newImageUrl}
                            alt="Upload preview"
                            className="w-12 h-12 rounded-lg object-cover border border-slate-800"
                          />
                          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Image attached
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kashmiri Velvet Gold Wedding Box"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Category
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Client / Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Model Town Sopore"
                        value={newClient}
                        onChange={(e) => setNewClient(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Finish / Material Specs
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 400 GSM + Gold Foil"
                        value={newFinish}
                        onChange={(e) => setNewFinish(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Print specs..."
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2 p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block">
                          Show on public website immediately?
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Toggle OFF to keep as draft.
                        </span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newIsApproved}
                          onChange={(e) => setNewIsApproved(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-800 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsUploading(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Photo</span>
                    </button>
                  </div>

                  {uploadSuccessMsg && (
                    <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Photo added successfully!
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-semibold">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    statusFilter === 'all'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({totalCount})
                </button>
                <button
                  onClick={() => setStatusFilter('approved')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                    statusFilter === 'approved'
                      ? 'bg-emerald-700 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Live ({approvedCount})
                </button>
                <button
                  onClick={() => setStatusFilter('hidden')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                    statusFilter === 'hidden'
                      ? 'bg-amber-700 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <EyeOff className="w-3.5 h-3.5" /> Hidden ({hiddenCount})
                </button>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-56">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search photo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-800 text-xs bg-slate-900 text-white focus:outline-none focus:ring-1 focus:ring-violet-600"
                  />
                </div>

                <button
                  onClick={() => {
                    if (confirm('Reset portfolio to original default samples?')) {
                      resetToDefaults();
                    }
                  }}
                  title="Reset to default items"
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* List of Photos */}
            <div className="space-y-3">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  No images found matching your filter.
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      item.isApproved
                        ? 'bg-slate-900 border-slate-800'
                        : 'bg-amber-950/20 border-amber-900/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-800 flex-shrink-0"
                      />

                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-800 text-slate-300">
                            {item.category}
                          </span>
                          {item.isApproved ? (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-950 text-emerald-400 flex items-center gap-1 border border-emerald-800">
                              <CheckCircle2 className="w-3 h-3" /> Visible on Website
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-950 text-amber-400 flex items-center gap-1 border border-amber-800">
                              <EyeOff className="w-3 h-3" /> Hidden from Public
                            </span>
                          )}
                        </div>

                        <h5 className="font-bold text-xs sm:text-sm text-white truncate">
                          {item.title}
                        </h5>
                        <p className="text-[10px] text-slate-400 truncate">
                          {item.client} &bull; {item.finish}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                      {/* Master Visibility Switch */}
                      <button
                        onClick={() => toggleApproval(item.id)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          item.isApproved
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {item.isApproved ? (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Live on Site</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                            <span>Hidden (Click to Show)</span>
                          </>
                        )}
                      </button>

                      {/* Featured Star */}
                      <button
                        onClick={() => toggleFeatured(item.id)}
                        className={`p-2 rounded-xl text-xs border ${
                          item.isFeatured
                            ? 'bg-amber-950/80 text-amber-400 border-amber-800'
                            : 'text-slate-500 border-slate-800 hover:text-white'
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className={`w-3.5 h-3.5 ${item.isFeatured ? 'fill-amber-400' : ''}`} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${item.title}"?`)) {
                            deleteItem(item.id);
                          }
                        }}
                        className="p-2 rounded-xl text-slate-500 hover:text-rose-400 border border-slate-800 hover:border-rose-900 transition-colors"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
