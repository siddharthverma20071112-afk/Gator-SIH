export type BusinessType = 'dairy' | 'grocery' | 'tailoring' | 'mobile_repair' | 'food_processing';

export interface ExtractedFacts {
  business?: BusinessType;
  businessName?: string;
  marginCapital?: number;
  village?: string;
  block?: string;
  district?: string;
  state?: string;
  experienceYears?: number;
  hasLandOrShop?: boolean;
  electricityReliable?: boolean;
  existingLoans?: number;
  applicantName?: string;
  applicantPhone?: string;
}

export interface MissingQuestion {
  key: keyof ExtractedFacts;
  labelEn: string;
  labelHi: string;
  questionHi: string;
  questionEn: string;
}

export interface LocalDataEngineResult {
  village: string;
  block: string;
  district: string;
  state: string;
  population: number;
  households: number;
  competitorsCount: number;
  competitorsList: string[];
  marketDistanceKm: number;
  roadAccess: boolean;
  electricityHoursPerDay: number;
  mandiPriceBenchmark: {
    item: string;
    wholesaleRate: string;
    retailRate: string;
    marginPercent: number;
  };
  weatherAndClimate: {
    seasonalRisk: 'Low' | 'Medium' | 'High';
    description: string;
    monsoonStatus: string;
  };
  dataSourceNotes: {
    census: string;
    osm: string;
    agmarknet: string;
    imd: string;
  };
}

export interface FeasibilityScores {
  demandScore: number;
  competitionScore: number;
  supplyScore: number;
  infrastructureScore: number;
  riskPenaltyScore: number;
  overallScore: number;
  category: 'Strong' | 'Moderate' | 'Weak' | 'Poor';
  categoryHi: string;
  confidencePercent: number;
  keyDrivers: string[];
  keyBottlenecks: string[];
}

export interface FinancialPlan {
  marginCapital: number;
  projectCost: number;
  loanAmount: number;
  debtEquityRatio: string;
  interestRateAnnual: number;
  tenureMonths: number;
  moratoriumMonths: number;
  monthlyEmi: number;
  estimatedMonthlyRevenue: number;
  estimatedMonthlyOpex: number;
  estimatedMonthlyNetProfit: number;
  dscrRatio: number;
  breakEvenMonths: number;
  defaultRiskLevel: 'Low' | 'Moderate' | 'High';
  defaultRiskScore: number; // 0-100 (lower is safer)
  costBreakdown: {
    category: string;
    amount: number;
    description: string;
  }[];
  monthlyCashFlow: {
    month: number;
    revenue: number;
    opex: number;
    emi: number;
    netProfit: number;
    cumulativeCash: number;
  }[];
}

export interface EligibleScheme {
  id: string;
  name: string;
  nameHi: string;
  agency: string;
  type: 'Micro Finance' | 'Term Loan' | 'Special Subsidy';
  subsidyPercentage: number;
  subsidyAmount: number;
  effectiveLoanAmount: number;
  interestRate: string;
  maxTenureYears: number;
  collateralRequirement: string;
  eligibilityDescription: string;
  requiredDocuments: string[];
}

export interface BusinessDossier {
  id: string;
  timestamp: string;
  applicant: ExtractedFacts;
  localData: LocalDataEngineResult;
  feasibility: FeasibilityScores;
  finance: FinancialPlan;
  schemes: EligibleScheme[];
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  strategicRisks: {
    risk: string;
    mitigation: string;
    severity: 'High' | 'Medium' | 'Low';
  }[];
  actionPlan30_60_90: {
    day30: string[];
    day60: string[];
    day90: string[];
  };
  whatsAppMessage: string;
  bankLoanAppraisalSummary: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  audioText?: string;
  timestamp: string;
  detectedFacts?: Partial<ExtractedFacts>;
}
