export type ProductCategory =
  | 'All'
  | 'Wedding Cards'
  | 'Flex & Banners'
  | 'Packaging & Boxes'
  | 'Corporate Stationery'
  | 'Stickers & Labels'
  | 'Books & Bill Books'
  | 'Signage & Hoardings';

export interface PortfolioItem {
  id: string;
  title: string;
  category: ProductCategory;
  imageUrl: string;
  client?: string;
  description: string;
  finish?: string;
  dimensions?: string;
  dateAdded: string;
  isApproved: boolean;
  isFeatured?: boolean;
}

export interface ServiceDetail {
  id: string;
  title: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  specs: string[];
  turnaround: string;
  popularFor?: string;
  startingPrice: string;
  iconName: string;
  isAvailable?: boolean;
  orderIndex?: number;
}

export interface InquiryFormState {
  name: string;
  phone: string;
  businessName?: string;
  productType: string;
  estimatedQuantity: string;
  details: string;
  urgency: 'Standard (2-3 Days)' | 'Express (24 Hours)' | 'Same Day Urgent';
}

export interface ClientInquiry extends InquiryFormState {
  id: string;
  createdAt: string;
  status?: 'New' | 'Contacted' | 'Completed';
}
