import React, { useState, useEffect } from 'react';
import {
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
  ArrowLeft,
  Cloud,
  CloudOff,
  Inbox,
  Phone,
  MessageCircle,
  Loader2,
  Calendar,
  Sparkles,
  Printer,
  Edit3,
  Clock,
  Maximize2,
  Package,
  Briefcase,
  Tag,
  BookOpen,
  Layers,
  FileText,
  ShieldCheck,
  Palette,
  X
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProductCategory, ServiceDetail } from '../types';
import { compressImageFile, uploadImageToCloud } from '../utils/imageUtils';

const CATEGORIES: ProductCategory[] = [
  'Wedding Cards',
  'Flex & Banners',
  'Packaging & Boxes',
  'Corporate Stationery',
  'Stickers & Labels',
  'Books & Bill Books',
  'Signage & Hoardings',
];

const SERVICE_ICONS = [
  { name: 'Sparkles', label: 'Luxury / Wedding', icon: Sparkles },
  { name: 'Maximize2', label: 'Flex / Outdoor', icon: Maximize2 },
  { name: 'Package', label: 'Boxes / Cartons', icon: Package },
  { name: 'Briefcase', label: 'Corporate / Cards', icon: Briefcase },
  { name: 'Tag', label: 'Stickers / Labels', icon: Tag },
  { name: 'BookOpen', label: 'Bill Books / Ledgers', icon: BookOpen },
  { name: 'Printer', label: 'Digital Press', icon: Printer },
  { name: 'Layers', label: 'Board / Materials', icon: Layers },
  { name: 'FileText', label: 'Documents / Receipts', icon: FileText },
  { name: 'ShieldCheck', label: 'Warranty / Quality', icon: ShieldCheck },
  { name: 'Palette', label: 'Design / Color', icon: Palette },
];

const renderServiceIcon = (iconName: string) => {
  const match = SERVICE_ICONS.find((i) => i.name === iconName);
  const IconComp = match ? match.icon : Sparkles;
  return <IconComp className="w-5 h-5 text-violet-400" />;
};

interface AdminPortalProps {
  onBackToSite: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToSite }) => {
  const {
    items,
    approvedItems,
    isCloudConnected,
    isLoading,
    toggleApproval,
    toggleFeatured,
    addItem,
    deleteItem,
    resetToDefaults,

    services,
    addService,
    updateService,
    deleteService,
    toggleServiceAvailability,
    resetServicesToDefaults,

    inquiries,
    markInquiryContacted,
    deleteInquiry,
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

  // Main Tabs: 'works' | 'services' | 'inquiries'
  const [activeTab, setActiveTab] = useState<'works' | 'services' | 'inquiries'>('works');

  // Works Tab State
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'hidden'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingToCloud, setIsUploadingToCloud] = useState(false);
  const [uploadStatusText, setUploadStatusText] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ProductCategory>('Wedding Cards');
  const [newClient, setNewClient] = useState('');
  const [newFinish, setNewFinish] = useState('');
  const [newDimensions, setNewDimensions] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newIsApproved, setNewIsApproved] = useState(true);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState(false);

  // Services Tab State
  const [serviceSearchQuery, setServiceSearchQuery] = useState('');
  const [serviceStatusFilter, setServiceStatusFilter] = useState<'all' | 'live' | 'hidden'>('all');
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingService, setEditingService] = useState<ServiceDetail | null>(null);
  const [isSavingService, setIsSavingService] = useState(false);
  const [serviceSuccessMsg, setServiceSuccessMsg] = useState(false);

  // New Service Form fields
  const [serviceFormTitle, setServiceFormTitle] = useState('');
  const [serviceFormCategory, setServiceFormCategory] = useState<ProductCategory>('Wedding Cards');
  const [serviceFormPrice, setServiceFormPrice] = useState('₹45 / card');
  const [serviceFormTurnaround, setServiceFormTurnaround] = useState('3 - 5 Days');
  const [serviceFormTagline, setServiceFormTagline] = useState('');
  const [serviceFormDescription, setServiceFormDescription] = useState('');
  const [serviceFormSpecs, setServiceFormSpecs] = useState('');
  const [serviceFormIcon, setServiceFormIcon] = useState('Sparkles');
  const [serviceFormIsAvailable, setServiceFormIsAvailable] = useState(true);

  const openAddServiceForm = () => {
    setServiceFormTitle('');
    setServiceFormCategory('Wedding Cards');
    setServiceFormPrice('₹45 / card');
    setServiceFormTurnaround('3 - 5 Days');
    setServiceFormTagline('');
    setServiceFormDescription('');
    setServiceFormSpecs('Premium imported board\nHot foil metallic embossing\nCustom calligraphy\nProtective velvet casing');
    setServiceFormIcon('Sparkles');
    setServiceFormIsAvailable(true);
    setEditingService(null);
    setIsAddingService(true);
  };

  const openEditServiceModal = (srv: ServiceDetail) => {
    setEditingService(srv);
    setServiceFormTitle(srv.title);
    setServiceFormCategory(srv.category);
    setServiceFormPrice(srv.startingPrice);
    setServiceFormTurnaround(srv.turnaround);
    setServiceFormTagline(srv.tagline);
    setServiceFormDescription(srv.description);
    setServiceFormSpecs((srv.specs || []).join('\n'));
    setServiceFormIcon(srv.iconName || 'Sparkles');
    setServiceFormIsAvailable(srv.isAvailable !== false);
    setIsAddingService(false);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceFormTitle.trim() || !serviceFormPrice.trim()) {
      alert('Please provide at least a service title and a starting price.');
      return;
    }

    const specsArray = serviceFormSpecs
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    try {
      setIsSavingService(true);

      if (editingService) {
        // Update existing service
        await updateService(editingService.id, {
          title: serviceFormTitle.trim(),
          category: serviceFormCategory,
          startingPrice: serviceFormPrice.trim(),
          turnaround: serviceFormTurnaround.trim(),
          tagline: serviceFormTagline.trim(),
          description: serviceFormDescription.trim(),
          specs: specsArray,
          iconName: serviceFormIcon,
          isAvailable: serviceFormIsAvailable,
        });
        setEditingService(null);
      } else {
        // Create new service
        await addService({
          title: serviceFormTitle.trim(),
          category: serviceFormCategory,
          startingPrice: serviceFormPrice.trim(),
          turnaround: serviceFormTurnaround.trim(),
          tagline: serviceFormTagline.trim() || 'Custom commercial print craftsmanship',
          description:
            serviceFormDescription.trim() ||
            'Custom high-precision print production crafted in our Sopore workshop.',
          specs: specsArray.length > 0 ? specsArray : ['Commercial grade print', 'Direct workshop pricing'],
          iconName: serviceFormIcon,
          isAvailable: serviceFormIsAvailable,
          popularFor: serviceFormCategory,
        });
        setIsAddingService(false);
      }

      setServiceSuccessMsg(true);
      setTimeout(() => setServiceSuccessMsg(false), 2000);
    } catch (err) {
      console.error('Error saving service to Cloud Firestore:', err);
      alert('Failed to save service changes.');
    } finally {
      setIsSavingService(false);
    }
  };

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

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        alert('File size exceeds 15MB. Please choose a smaller photo.');
        return;
      }
      try {
        setUploadStatusText('Optimizing photo for cloud delivery...');
        const compressedDataUrl = await compressImageFile(file);
        setNewImageUrl(compressedDataUrl);
        setUploadStatusText('Ready to save to Cloud Firestore.');
      } catch (err) {
        console.error('Image compression error:', err);
        alert('Failed to process image file.');
      }
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newImageUrl.trim()) {
      alert('Please provide a title and an image.');
      return;
    }

    try {
      setIsUploadingToCloud(true);
      setUploadStatusText('Uploading image to Firebase Cloud...');

      const finalCloudUrl = await uploadImageToCloud(newImageUrl, newTitle);

      setUploadStatusText('Publishing work to Cloud Firestore...');
      await addItem({
        title: newTitle.trim(),
        category: newCategory,
        client: newClient.trim() || 'Ahmad Digital Printers Client',
        finish: newFinish.trim() || 'Standard Commercial Finish',
        dimensions: newDimensions.trim() || 'Standard Spec',
        description:
          newDescription.trim() ||
          'High precision commercial print work produced at Main Chowk Sopore workshop.',
        imageUrl: finalCloudUrl,
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
    } catch (err) {
      console.error('Error saving item to Firebase:', err);
      alert('Failed to save to Firebase. Please check your internet connection.');
    } finally {
      setIsUploadingToCloud(false);
      setUploadStatusText('');
    }
  };

  // Filtered Works
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

  // Filtered Services
  const filteredServices = services.filter((srv) => {
    const isLive = srv.isAvailable !== false;
    const matchesStatus =
      serviceStatusFilter === 'all'
        ? true
        : serviceStatusFilter === 'live'
        ? isLive
        : !isLive;

    const query = serviceSearchQuery.toLowerCase();
    const matchesSearch =
      srv.title.toLowerCase().includes(query) ||
      srv.category.toLowerCase().includes(query) ||
      srv.startingPrice.toLowerCase().includes(query) ||
      (srv.specs && srv.specs.some((spec) => spec.toLowerCase().includes(query)));

    return matchesStatus && matchesSearch;
  });

  const totalCount = items.length;
  const approvedCount = items.filter((i) => i.isApproved).length;
  const hiddenCount = totalCount - approvedCount;

  const totalServicesCount = services.length;
  const liveServicesCount = services.filter((s) => s.isAvailable !== false).length;
  const hiddenServicesCount = totalServicesCount - liveServicesCount;

  const unreadInquiriesCount = inquiries.filter((inq) => inq.status === 'New').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Discreet Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Public Website</span>
            </button>

            {/* Live Cloud Status Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono">
              {isCloudConnected ? (
                <>
                  <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Cloud Synced: ahmad-digital-printers</span>
                </>
              ) : (
                <>
                  <CloudOff className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-400">Offline / Local Cache</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              Discreet Staff Portal
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
                Ahmad Digital Printers Cloud Management Portal &bull; Main Chowk Sopore
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
            {/* Realtime Live Broadcast Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-violet-950/50 via-slate-900 to-slate-900 border border-violet-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                <div>
                  <span className="font-extrabold text-white block">
                    Cloud Firestore Real-Time Broadcast Active
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Any edit, price change, or new item updates instantly for all website visitors across Kashmir in real time.
                  </span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 self-stretch sm:self-auto overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setActiveTab('works')}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap ${
                    activeTab === 'works'
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Work Showcase ({totalCount})</span>
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap ${
                    activeTab === 'services'
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Services &amp; Pricing ({totalServicesCount})</span>
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap ${
                    activeTab === 'inquiries'
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Inbox className="w-3.5 h-3.5" />
                  <span>Client Orders</span>
                  {unreadInquiriesCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-black">
                      {unreadInquiriesCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* ============================================================== */}
            {/* TAB 1: WORK SHOWCASE MODERATION                                */}
            {/* ============================================================== */}
            {activeTab === 'works' && (
              <div className="space-y-6">
                {/* Stats Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Works</span>
                      <h5 className="text-xl font-black text-white">{totalCount}</h5>
                    </div>
                    <ImageIcon className="w-5 h-5 text-slate-500" />
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Live on Website</span>
                      <h5 className="text-xl font-black text-emerald-300">{approvedCount}</h5>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Hidden / Draft</span>
                      <h5 className="text-xl font-black text-amber-300">{hiddenCount}</h5>
                    </div>
                    <XCircle className="w-5 h-5 text-amber-400" />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => setIsUploading(!isUploading)}
                      className="w-full py-2 px-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isUploading ? 'Close Upload Form' : 'Upload Real Photo'}</span>
                    </button>
                  </div>
                </div>

                {/* Upload Drawer */}
                {isUploading && (
                  <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 animate-in fade-in space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                        <Upload className="w-4 h-4 text-violet-400" />
                        <span>Upload &amp; Publish Real Print Job to Cloud</span>
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
                            Select Photo from Device (or Paste Image URL)
                          </label>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 hover:border-violet-500 rounded-2xl p-4 bg-slate-950 cursor-pointer transition-colors text-center">
                              <Upload className="w-6 h-6 text-violet-400 mb-1" />
                              <span className="text-xs font-bold text-slate-200">
                                Click or Tap to Upload Photo
                              </span>
                              <span className="text-[10px] text-slate-500 mt-0.5">
                                Automatically compressed &amp; optimized for instant cloud loading
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                              />
                            </label>

                            <div className="flex-1 flex flex-col justify-center">
                              <span className="text-[11px] text-slate-400 mb-1">Or paste direct photo URL:</span>
                              <input
                                type="url"
                                placeholder="https://example.com/photo.jpg"
                                value={newImageUrl}
                                onChange={(e) => setNewImageUrl(e.target.value)}
                                className="px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                              />
                            </div>
                          </div>

                          {uploadStatusText && (
                            <p className="text-[11px] text-violet-300 flex items-center gap-1.5 font-medium pt-1">
                              <Sparkles className="w-3.5 h-3.5 animate-spin" />
                              <span>{uploadStatusText}</span>
                            </p>
                          )}

                          {newImageUrl && (
                            <div className="mt-2 flex items-center gap-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                              <img
                                src={newImageUrl}
                                alt="Upload preview"
                                className="w-14 h-14 rounded-lg object-cover border border-slate-800 flex-shrink-0"
                              />
                              <div className="min-w-0">
                                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Photo Attached &amp; Validated
                                </span>
                                <span className="text-[10px] text-slate-400 truncate block">
                                  Will be stored in Cloud Firestore and visible to all visitors.
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Job Title *
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
                            Category *
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
                            placeholder="e.g. 400 GSM + Gold Foil Embossing"
                            value={newFinish}
                            onChange={(e) => setNewFinish(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Job Description
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Craft details, paper specifications, print press used..."
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
                              Leave ON to publish live to all clients. Turn OFF to keep as private draft.
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
                          disabled={isUploadingToCloud}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isUploadingToCloud}
                          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 flex items-center gap-1.5 shadow disabled:opacity-50"
                        >
                          {isUploadingToCloud ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Saving to Cloud...</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Publish to Cloud</span>
                            </>
                          )}
                        </button>
                      </div>

                      {uploadSuccessMsg && (
                        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> Published to Firebase Cloud successfully! Now live for all visitors.
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
                      onClick={async () => {
                        if (confirm('Sync & reset all works in Cloud Firestore to default high-quality samples?')) {
                          await resetToDefaults();
                          alert('Cloud Firestore reset to default samples.');
                        }
                      }}
                      title="Sync / Reset to default sample items"
                      className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 text-xs"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* List of Photos */}
                <div className="space-y-3">
                  {isLoading ? (
                    <div className="text-center py-12 text-slate-400 text-xs flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
                      <span>Syncing with Cloud Firestore...</span>
                    </div>
                  ) : items.length === 0 ? (
                    <div className="text-center py-16 bg-slate-900 rounded-3xl border border-dashed border-slate-800 p-8 space-y-3">
                      <ImageIcon className="w-10 h-10 text-slate-600 mx-auto" />
                      <div>
                        <h5 className="font-bold text-sm text-white">No works currently in showcase</h5>
                        <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                          All cards have been deleted. You can upload your own real workshop photos using the button above, or click below if you wish to restore default sample cards anytime.
                        </p>
                      </div>
                      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                        <button
                          onClick={() => setIsUploading(true)}
                          className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Upload Real Photo</span>
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm('Load default Kashmir sample works into Cloud Firestore?')) {
                              await resetToDefaults();
                            }
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                          <span>Load Sample Works</span>
                        </button>
                      </div>
                    </div>
                  ) : filteredItems.length === 0 ? (
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
                                  <CheckCircle2 className="w-3 h-3" /> Visible to All Visitors
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
                          {/* Live Toggle */}
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
                              if (confirm(`Delete "${item.title}" from Cloud Firestore permanently?`)) {
                                deleteItem(item.id);
                              }
                            }}
                            className="p-2 rounded-xl text-slate-500 hover:text-rose-400 border border-slate-800 hover:border-rose-900 transition-colors"
                            title="Delete photo permanently"
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

            {/* ============================================================== */}
            {/* TAB 2: SERVICES & PRICING MANAGEMENT                          */}
            {/* ============================================================== */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                {/* Stats Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Services</span>
                      <h5 className="text-xl font-black text-white">{totalServicesCount}</h5>
                    </div>
                    <Printer className="w-5 h-5 text-slate-500" />
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Live on Site</span>
                      <h5 className="text-xl font-black text-emerald-300">{liveServicesCount}</h5>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Hidden Cards</span>
                      <h5 className="text-xl font-black text-amber-300">{hiddenServicesCount}</h5>
                    </div>
                    <EyeOff className="w-5 h-5 text-amber-400" />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (isAddingService) {
                          setIsAddingService(false);
                        } else {
                          openAddServiceForm();
                        }
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isAddingService ? 'Close Form' : 'Add New Service'}</span>
                    </button>
                  </div>
                </div>

                {/* Service Create / Edit Drawer */}
                {(isAddingService || editingService) && (
                  <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-violet-800/50 shadow-2xl space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <Printer className="w-4 h-4 text-violet-400" />
                        <h4 className="font-extrabold text-sm text-white">
                          {editingService ? `Edit Service: "${editingService.title}"` : 'Add New Commercial Service'}
                        </h4>
                      </div>
                      <button
                        onClick={() => {
                          setIsAddingService(false);
                          setEditingService(null);
                        }}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>

                    <form onSubmit={handleSaveService} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        {/* Title */}
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Service Title *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Luxury Kashmiri Wedding Invitations"
                            value={serviceFormTitle}
                            onChange={(e) => setServiceFormTitle(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                          />
                        </div>

                        {/* Starting Price */}
                        <div>
                          <label className="block text-xs font-bold text-amber-400 mb-1">
                            Estimated Base Price *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. ₹45 / card, ₹12 / sq.ft, ₹18 / box"
                            value={serviceFormPrice}
                            onChange={(e) => setServiceFormPrice(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-amber-600/40 bg-slate-950 text-amber-300 font-bold text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>

                        {/* Category */}
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Category *
                          </label>
                          <select
                            value={serviceFormCategory}
                            onChange={(e) => setServiceFormCategory(e.target.value as ProductCategory)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                          >
                            {CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Turnaround Time */}
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Turnaround Time *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Same Day / 24 Hours, 3 - 5 Days"
                            value={serviceFormTurnaround}
                            onChange={(e) => setServiceFormTurnaround(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                          />
                        </div>

                        {/* Tagline / Subtitle */}
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Tagline / Highlight
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Regal foil stamping, velvet textures"
                            value={serviceFormTagline}
                            onChange={(e) => setServiceFormTagline(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                          />
                        </div>

                        {/* Description */}
                        <div className="sm:col-span-3">
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Full Service Description
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Describe paper grades, machinery, inks, durability, applications..."
                            value={serviceFormDescription}
                            onChange={(e) => setServiceFormDescription(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-violet-600 focus:outline-none"
                          />
                        </div>

                        {/* Specs Bullets (One per line) */}
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Specifications / Bullet Points (One per line)
                          </label>
                          <textarea
                            rows={3}
                            placeholder="350 - 600 GSM Velvet/Handmade Board&#10;Metallic Hot Foil Stamping&#10;Custom Laser Cutting &amp; Crest Box"
                            value={serviceFormSpecs}
                            onChange={(e) => setServiceFormSpecs(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs font-mono focus:ring-2 focus:ring-violet-600 focus:outline-none"
                          />
                          <span className="text-[10px] text-slate-500 block mt-0.5">
                            Each line appears with an emerald checkmark on the public card.
                          </span>
                        </div>

                        {/* Icon Selection */}
                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-slate-300">
                            Service Card Icon
                          </label>
                          <div className="grid grid-cols-4 gap-1.5 p-2 rounded-xl bg-slate-950 border border-slate-800">
                            {SERVICE_ICONS.map((item) => {
                              const isSelected = serviceFormIcon === item.name;
                              const IconComponent = item.icon;
                              return (
                                <button
                                  key={item.name}
                                  type="button"
                                  onClick={() => setServiceFormIcon(item.name)}
                                  title={item.label}
                                  className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? 'bg-violet-600 text-white shadow'
                                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                                  }`}
                                >
                                  <IconComponent className="w-4 h-4" />
                                </button>
                              );
                            })}
                          </div>
                          <span className="text-[10px] text-slate-400">
                            Selected: {serviceFormIcon}
                          </span>
                        </div>

                        {/* Live Toggle */}
                        <div className="sm:col-span-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-white block">
                              Publish on Website Services Section?
                            </span>
                            <span className="text-[10px] text-slate-400">
                              Active services appear immediately for visitors with WhatsApp order buttons.
                            </span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={serviceFormIsAvailable}
                              onChange={(e) => setServiceFormIsAvailable(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-800 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingService(false);
                            setEditingService(null);
                          }}
                          disabled={isSavingService}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSavingService}
                          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 flex items-center gap-1.5 shadow disabled:opacity-50"
                        >
                          {isSavingService ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Saving to Cloud...</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{editingService ? 'Save Price & Changes' : 'Publish Service to Cloud'}</span>
                            </>
                          )}
                        </button>
                      </div>

                      {serviceSuccessMsg && (
                        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> Service updated in Cloud Firestore successfully!
                        </div>
                      )}
                    </form>
                  </div>
                )}

                {/* Filter & Search Bar */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-semibold">
                    <button
                      onClick={() => setServiceStatusFilter('all')}
                      className={`px-3 py-1.5 rounded-xl transition-all ${
                        serviceStatusFilter === 'all'
                          ? 'bg-slate-800 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      All ({totalServicesCount})
                    </button>
                    <button
                      onClick={() => setServiceStatusFilter('live')}
                      className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                        serviceStatusFilter === 'live'
                          ? 'bg-emerald-700 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Live ({liveServicesCount})
                    </button>
                    <button
                      onClick={() => setServiceStatusFilter('hidden')}
                      className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                        serviceStatusFilter === 'hidden'
                          ? 'bg-amber-700 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <EyeOff className="w-3.5 h-3.5" /> Hidden ({hiddenServicesCount})
                    </button>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-56">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search service, price..."
                        value={serviceSearchQuery}
                        onChange={(e) => setServiceSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-800 text-xs bg-slate-900 text-white focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>

                    <button
                      onClick={async () => {
                        if (confirm('Reset services in Cloud Firestore to the original 6 Kashmir workshop defaults?')) {
                          await resetServicesToDefaults();
                          alert('Services reset to default prices.');
                        }
                      }}
                      title="Sync / Reset services to defaults"
                      className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 text-xs flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* List of Services */}
                <div className="space-y-3">
                  {services.length === 0 ? (
                    <div className="text-center py-16 bg-slate-900 rounded-3xl border border-dashed border-slate-800 p-8 space-y-3">
                      <Printer className="w-10 h-10 text-slate-600 mx-auto" />
                      <div>
                        <h5 className="font-bold text-sm text-white">No services currently configured</h5>
                        <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                          You can create new printing services with custom pricing and turnaround times, or load the original Kashmir print services.
                        </p>
                      </div>
                      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                        <button
                          onClick={openAddServiceForm}
                          className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add New Service</span>
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm('Load default Kashmir printing services into Cloud Firestore?')) {
                              await resetServicesToDefaults();
                            }
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                          <span>Load Default 6 Services</span>
                        </button>
                      </div>
                    </div>
                  ) : filteredServices.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-xs">
                      No services match your search filter.
                    </div>
                  ) : (
                    filteredServices.map((srv) => {
                      const isLive = srv.isAvailable !== false;
                      return (
                        <div
                          key={srv.id}
                          className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                            isLive
                              ? 'bg-slate-900 border-slate-800'
                              : 'bg-amber-950/20 border-amber-900/40'
                          }`}
                        >
                          <div className="flex items-start gap-3.5 min-w-0 flex-1">
                            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                              {renderServiceIcon(srv.iconName)}
                            </div>

                            <div className="min-w-0 space-y-1 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-800 text-slate-300">
                                  {srv.category}
                                </span>

                                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                                  <Clock className="w-3 h-3 text-emerald-400" /> {srv.turnaround}
                                </span>

                                {isLive ? (
                                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-950 text-emerald-400 flex items-center gap-1 border border-emerald-800">
                                    <CheckCircle2 className="w-3 h-3" /> Live on Site
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-950 text-amber-400 flex items-center gap-1 border border-amber-800">
                                    <EyeOff className="w-3 h-3" /> Hidden
                                  </span>
                                )}
                              </div>

                              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                                <h5 className="font-extrabold text-sm text-white">
                                  {srv.title}
                                </h5>
                                <div className="px-2.5 py-0.5 rounded-lg bg-amber-950/80 border border-amber-700/80 text-amber-300 font-extrabold text-xs">
                                  {srv.startingPrice}
                                </div>
                              </div>

                              <p className="text-[11px] text-slate-400 line-clamp-1">
                                {srv.tagline || srv.description}
                              </p>

                              {srv.specs && srv.specs.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {srv.specs.slice(0, 3).map((spec, spIdx) => (
                                    <span
                                      key={spIdx}
                                      className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800/80"
                                    >
                                      &bull; {spec}
                                    </span>
                                  ))}
                                  {srv.specs.length > 3 && (
                                    <span className="text-[10px] text-slate-500">
                                      +{srv.specs.length - 3} more
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                            {/* Edit Button */}
                            <button
                              onClick={() => openEditServiceModal(srv)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-violet-300 bg-violet-950/60 border border-violet-800/80 hover:bg-violet-900 transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit / Change Price</span>
                            </button>

                            {/* Visibility Toggle */}
                            <button
                              onClick={() => toggleServiceAvailability(srv.id)}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                isLive
                                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                              }`}
                            >
                              {isLive ? (
                                <>
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Live</span>
                                </>
                              ) : (
                                <>
                                  <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                                  <span>Hidden</span>
                                </>
                              )}
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => {
                                if (confirm(`Delete "${srv.title}" from Cloud Firestore permanently?`)) {
                                  deleteService(srv.id);
                                }
                              }}
                              className="p-2 rounded-xl text-slate-500 hover:text-rose-400 border border-slate-800 hover:border-rose-900 transition-colors"
                              title="Delete service permanently"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* TAB 3: LIVE CLIENT ORDERS & INQUIRIES                         */}
            {/* ============================================================== */}
            {activeTab === 'inquiries' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div>
                    <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                      <Inbox className="w-4 h-4 text-violet-400" />
                      <span>Live Client Orders &amp; Inquiries</span>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Logged in real-time from clients submitting the order inquiry form on your website.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-300">
                    Total: {inquiries.length}
                  </span>
                </div>

                {inquiries.length === 0 ? (
                  <div className="text-center py-16 bg-slate-900 rounded-3xl border border-dashed border-slate-800 p-8 space-y-2">
                    <Inbox className="w-8 h-8 text-slate-500 mx-auto" />
                    <h5 className="font-bold text-sm text-white">No incoming inquiries yet</h5>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      When a customer fills out the order form on your website, their specifications and phone number will immediately appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-white">{inq.name}</span>
                            {inq.businessName && (
                              <span className="text-xs text-slate-400">({inq.businessName})</span>
                            )}
                            <span
                              className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                inq.status === 'Contacted'
                                  ? 'bg-slate-800 text-slate-400'
                                  : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              }`}
                            >
                              {inq.status || 'New'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            <span>
                              {inq.createdAt ? new Date(inq.createdAt).toLocaleString() : 'Recent'}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase font-bold">Service</span>
                            <span className="font-semibold text-slate-200">{inq.productType}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase font-bold">Quantity</span>
                            <span className="font-semibold text-slate-200">{inq.estimatedQuantity || 'To discuss'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase font-bold">Urgency</span>
                            <span className="font-semibold text-amber-400">{inq.urgency}</span>
                          </div>
                        </div>

                        {inq.details && (
                          <div className="p-2.5 rounded-xl bg-slate-950 text-xs text-slate-300 leading-relaxed border border-slate-800/80">
                            <span className="font-bold text-slate-400 block text-[10px] uppercase">Client Notes:</span>
                            {inq.details}
                          </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                            <Phone className="w-3.5 h-3.5" />
                            <a href={`tel:${inq.phone}`} className="hover:underline font-bold">
                              {inq.phone}
                            </a>
                          </div>

                          <div className="flex items-center gap-2">
                            {inq.status !== 'Contacted' && (
                              <button
                                onClick={() => markInquiryContacted(inq.id)}
                                className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white"
                              >
                                Mark Contacted
                              </button>
                            )}

                            <a
                              href={`https://wa.me/91${inq.phone.replace(/[^0-9]/g, '')}?text=Assalam%20o%20Alaikum%20${encodeURIComponent(
                                inq.name
                              )}%2C%20this%20is%20Ahmad%20Digital%20Printers%20(Main%20Chowk%20Sopore)%20replying%20to%20your%20inquiry%20regarding%20${encodeURIComponent(
                                inq.productType
                              )}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Reply on WhatsApp</span>
                            </a>

                            <button
                              onClick={() => {
                                if (confirm('Delete this inquiry?')) {
                                  deleteInquiry(inq.id);
                                }
                              }}
                              className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 border border-slate-800"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
