// This file serves as the data schema for the PayVibe application.
// It defines the core data structures used throughout the app.

// =================================================================
// AUTH & USER MANAGEMENT
// =================================================================

export type UserRole = 'Admin' | 'Accountant' | 'Viewer' | 'FirmAdmin';

export type User = {
  id: string; // e.g., 'user_123'
  firstName: string;
  lastName: string;
  email: string; // Used for login
  jobTitle?: string;
  avatarUrl?: string;
  role: UserRole;
  accountId: string; // The account this user belongs to
};

// An Account can be either a Business or a Firm
export type Account = {
  id: string; // e.g., 'acc_abc'
  type: 'business' | 'firm';
  plan: 'Free' | 'Pro' | 'Enterprise';
  createdAt: string; // ISO 8601 date string
};

// =================================================================
// ENTITIES
// =================================================================

export type Business = {
  accountId: string;
  companyName: string;
  taxId?: string;
  address?: string;
  website?: string;
  // A business might be managed by a firm
  managedByFirmId?: string; 
};

export type Firm = {
  accountId: string;
  firmName: string;
  licenseNumber?: string;
  address?: string;
  principalAccountant?: string;
};

// Customer represents a client of a Business
export type Customer = {
  id: string;
  companyName: string;
  contactName?: string;
  email?: string;
  phone?: string;
};

// Vendor represents a service provider to a Business
export type Vendor = {
  id: string;
  businessId: string; // Belongs to which business
  companyName: string;
  contactName?: string;
  email?: string;
  phone?: string;
  trustScore?: number; // 0-100
  status?: 'Verified' | 'Preferred' | 'Review';
};


// =================================================================
// FINANCIAL & OPERATIONS
// =================================================================

export type BillStatus = 'Pending' | 'Approved' | 'Scheduled' | 'Paid' | 'Overdue' | 'Draft';

export type Bill = {
  id: string;
  vendor: string; // Denormalized for easy display
  amount: number;
  invoiceNumber?: string;
  dueDate: string; // ISO 8601 date string
  status: BillStatus;
};

export type Invoice = {
  id: string;
  businessId: string;
  customerId: string;
  customerName: string; // Denormalized for easy display
  amount: number;
  currency: 'USD' | 'EUR' | 'GBP';
  invoiceNumber?: string;
  issueDate: string; // ISO 8601 date string
  dueDate: string; // ISO 8601 date string
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
};

export type TransactionStatus = 'Completed' | 'Pending' | 'Failed';

export type Transaction = {
  id: string;
  accountId: string;
  date: string; // ISO 8601 date string
  description: string;
  amount: number; // Positive for income, negative for expense
  status: TransactionStatus;
  category?: string;
  relatedBillId?: string;
  relatedInvoiceId?: string;
};


// =================================================================
// SETTINGS & WORKFLOWS
// =================================================================

export type WorkflowStep = {
  approverRole: UserRole;
  threshold?: number; // e.g., only applies to amounts over this value
};

export type ApprovalWorkflow = {
  id: string;
  accountId: string;
  name: string;
  isEnabled: boolean;
  conditions: string[]; // e.g., 'Invoice total > 1000'
  steps: WorkflowStep[];
};

export type PaymentMethod = {
  id: string;
  accountId: string;
  type: 'Bank Account' | 'Credit Card' | 'PayPal';
  details: string; // e.g., 'Chase Bank **** 1234'
  isDefault: boolean;
};

export type ReceivingMethod = {
  id: string;
  accountId: string;
  type: 'Bank Account';
  details: string; // e.g., 'Wells Fargo **** 5678'
  isDefault: boolean;
};
