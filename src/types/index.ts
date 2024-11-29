// Add these interfaces to the existing types
export interface TopProduct {
  name: string;
  description: string;
  url: string;
  annualRevenue: number; // in millions USD
}

export interface CompanyMetrics {
  trustScore: number; // 0-100
  dealProbability: number; // 0-100
  annualRevenue: number; // in millions USD
  yearOverYearGrowth: number; // percentage
  marketShare: number; // percentage
  topProducts: TopProduct[];
}

// Update Record interface to include metrics
export interface Record {
  id: string;
  status: string;
  level: string;
  lastAccessed: string;
  subject: string;
  details: string;
  requiredClearance: string;
  name: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  logo: string;
  images: string[];
  category: string[];
  tags: string[];
  socialMedia: {
    twitter?: string;
    linkedin?: string;
  };
  description: string;
  sourceFound: string;
  ceo: string;
  previousCEOs?: string[];
  language: string[];
  taxId: string;
  metrics: CompanyMetrics;
  verificationStatus: {
    [key: string]: {
      verified: boolean;
      lastChecked: string;
      verifiedBy: string;
      entries?: VerificationEntry[];
    };
  };
}