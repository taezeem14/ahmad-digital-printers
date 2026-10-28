import React, { useState } from 'react';
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
  X,
  Info
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
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
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
  } = usePortfolio();

  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'hidden'>('all');
  const [searchQuery, setSearchQuery] = useState('');

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
    if (loginAdmin(pinInput)) {
      setAuthError(false);
      setPinInput('');
    } else {
      setAuthError(true);
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
      alert('Please provide a title and an image (upload a file or paste a URL).');
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-amber-500 flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base tracking-wide flex items-center gap-2">
                Ahmad Digital Printers — Content &amp; Image Moderation
              </h3>
              <p className="text-[11px] text-slate-400">
                Directly manage which photo uploads appear on the public website showcase
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {!isAdminAuthenticated ? (
            <div className="max-w-md mx-auto py-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900">Admin Authentication</h4>
              <p className="text-xs text-slate-500 mt-1.5 mb-6">
                Enter your administrative PIN to add or approve images for Ahmad Digital Printers.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Enter PIN (e.g. ahmad2026)"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setAuthError(false);
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-violet-600 text-center tracking-widest text-lg font-mono"
                    autoFocus
                  />
                  {authError && (
                    <p className="text-xs text-rose-600 mt-2 font-semibold">
                      Invalid PIN. Hint: Use <code className="bg-rose-50 px-1 py-0.5 rounded">ahmad2026</code>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md transition-all"
                >
                  Unlock Admin Portal
                </button>
              </form>

              <div className="mt-6 p-3 rounded-xl bg-violet-50 border border-violet-100 text-[11px] text-violet-900 text-left flex items-start gap-2">
                <Info className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Demo Master PIN:</strong> <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-violet-200">ahmad2026</code>. You can approve or hide uploaded images with a single click.
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Uploads</span>
                    <h5 className="text-2xl font-black text-slate-900">{totalCount}</h5>
                  </div>
                  <ImageIcon className="w-6 h-6 text-slate-400" />
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Live on Website</span>
                    <h5 className="text-2xl font-black text-emerald-800">{approvedCount}</h5>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Hidden / Pending</span>
                    <h5 className="text-2xl font-black text-amber-800">{hiddenCount}</h5>
                  </div>
                  <XCircle className="w-6 h-6 text-amber-600" />
                </div>

                <div className="p-4 rounded-2xl bg-violet-50 border border-violet-200 flex items-center justify-between">
                  <button
                    onClick={() => setIsUploading(!isUploading)}
                    className="w-full py-2 px-3 rounded-xl bg-violet-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-violet-700 transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isUploading ? 'View Image List' : 'Upload New Photo'}</span>
                  </button>
                </div>
              </div>

              {isUploading ? (
                <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 animate-in fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <Upload className="w-5 h-5 text-violet-600" />
                      <span>Upload &amp; Moderate New Photo</span>
                    </h4>
                    <button
                      onClick={() => setIsUploading(false)}
                      className="text-xs text-slate-500 hover:text-slate-900 underline"
                    >
                      Cancel &amp; return to list
                    </button>
                  </div>

                  <form onSubmit={handleAddItem} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2 space-y-2">
                        <label className="block text-xs font-bold text-slate-700">
                          Image File (or Image URL)
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-stone-300 hover:border-violet-500 rounded-2xl p-4 bg-white cursor-pointer transition-colors">
                            <Upload className="w-6 h-6 text-violet-600 mb-1" />
                            <span className="text-xs font-semibold text-slate-700">
                              Upload local photo from device
                            </span>
                            <span className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 5MB</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </label>

                          <div className="flex-1 flex flex-col justify-center">
                            <span className="text-[11px] text-slate-500 mb-1">Or paste photo URL:</span>
                            <input
                              type="url"
                              placeholder="https://example.com/photo.jpg"
                              value={newImageUrl}
                              onChange={(e) => setNewImageUrl(e.target.value)}
                              className="px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-violet-600"
                            />
                          </div>
                        </div>

                        {newImageUrl && (
                          <div className="mt-2 flex items-center gap-3 p-2 rounded-xl bg-white border border-stone-200">
                            <img
                              src={newImageUrl}
                              alt="Upload preview"
                              className="w-14 h-14 rounded-lg object-cover border"
                            />
                            <div className="text-[11px] text-slate-600">
                              <span className="font-bold text-emerald-600 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Image ready
                              </span>
                              <span className="text-slate-400">Will be saved to local storage</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Product / Project Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Star Flex Hoarding for Apple Mandi"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-violet-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Category
                        </label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                          className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-violet-600"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Client / Location
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Model Town Sopore / Fruit Mandi"
                          value={newClient}
                          onChange={(e) => setNewClient(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-violet-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Finish / Stock Specs
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Gold Foil + Velvet 400 GSM"
                          value={newFinish}
                          onChange={(e) => setNewFinish(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-violet-600"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Short Description
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Crafted at Ahmad Digital Printers Sopore..."
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-violet-600"
                        />
                      </div>

                      <div className="md:col-span-2 p-3.5 rounded-2xl bg-white border border-stone-200 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            Publish to Website Immediately?
                          </span>
                          <span className="text-[11px] text-slate-500">
                            If enabled, it will appear in the public work showcase right away.
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newIsApproved}
                            onChange={(e) => setNewIsApproved(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsUploading(false)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-stone-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 shadow-md transition-all flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save &amp; Add Photo</span>
                      </button>
                    </div>

                    {uploadSuccessMsg && (
                      <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Photo added successfully to portfolio!
                      </div>
                    )}
                  </form>
                </div>
              ) : null}

              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pb-2 border-b border-stone-200">
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-stone-100 border border-stone-200 text-xs font-semibold">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-xl transition-all ${
                      statusFilter === 'all'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All ({totalCount})
                  </button>
                  <button
                    onClick={() => setStatusFilter('approved')}
                    className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                      statusFilter === 'approved'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approved ({approvedCount})
                  </button>
                  <button
                    onClick={() => setStatusFilter('hidden')}
                    className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                      statusFilter === 'hidden'
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <EyeOff className="w-3.5 h-3.5" /> Hidden ({hiddenCount})
                  </button>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search photo, client, category..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-stone-200 text-xs bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-violet-600"
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (confirm('Reset portfolio to original Ahmad Digital Printers sample items?')) {
                        resetToDefaults();
                      }
                    }}
                    title="Reset to default samples"
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-stone-100 border border-stone-200 text-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    No images found matching your filter.
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        item.isApproved
                          ? 'bg-white border-stone-200 shadow-sm'
                          : 'bg-amber-50/40 border-amber-200/80'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative flex-shrink-0">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-stone-200"
                          />
                          {item.isFeatured && (
                            <span className="absolute -top-1 -right-1 bg-amber-500 text-white p-0.5 rounded-full shadow">
                              <Star className="w-3 h-3 fill-white" />
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-slate-700">
                              {item.category}
                            </span>
                            {item.isApproved ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Visible on Website
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                                <EyeOff className="w-3.5 h-3.5" /> Hidden from Public
                              </span>
                            )}
                          </div>

                          <h5 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                            {item.title}
                          </h5>

                          <p className="text-[11px] text-slate-500 truncate">
                            {item.client} • {item.finish || 'Standard'} • {item.dimensions || ''}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0">
                        <button
                          onClick={() => toggleApproval(item.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                            item.isApproved
                              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                              : 'bg-stone-800 text-stone-200 hover:bg-stone-900'
                          }`}
                          title={item.isApproved ? 'Click to hide this photo' : 'Click to approve & display on website'}
                        >
                          {item.isApproved ? (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>Show on Site (Live)</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                              <span>Hidden (Click to Show)</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => toggleFeatured(item.id)}
                          className={`p-2 rounded-xl text-xs transition-colors border ${
                            item.isFeatured
                              ? 'bg-amber-100 text-amber-700 border-amber-300'
                              : 'text-slate-400 hover:text-slate-700 border-stone-200'
                          }`}
                          title="Toggle Highlight on Featured list"
                        >
                          <Star className={`w-3.5 h-3.5 ${item.isFeatured ? 'fill-amber-500' : ''}`} />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete "${item.title}" permanently?`)) {
                              deleteItem(item.id);
                            }
                          }}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-stone-200 transition-colors"
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

        <div className="bg-stone-50 border-t border-stone-200 px-6 py-3 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <span>Ahmad Digital Printers • Main Chowk Sopore, near Old J&amp;K Bank Building</span>
          <span className="font-mono text-emerald-700 font-semibold">Local Storage Persistent &bull; Vercel Ready</span>
        </div>
      </div>
    </div>
  );
};