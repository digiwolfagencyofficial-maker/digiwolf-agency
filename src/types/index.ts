export type UserRole = 'admin' | 'client'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  company: string | null
  phone: string | null
  created_at: string
  updated_at: string
}

export type ProjectStatus = 'discovery' | 'design' | 'development' | 'review' | 'launched' | 'paused'

export interface Project {
  id: string
  client_id: string
  title: string
  description: string | null
  status: ProjectStatus
  start_date: string | null
  end_date: string | null
  budget: number | null
  currency: string
  progress: number
  created_at: string
  updated_at: string
  // Relations
  client?: Profile
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'

export interface LineItem {
  description: string
  quantity: number
  unit_price: number
  total: number
}

export interface Invoice {
  id: string
  client_id: string
  project_id: string | null
  invoice_number: string
  amount: number
  currency: string
  status: InvoiceStatus
  due_date: string | null
  paid_date: string | null
  notes: string | null
  line_items: LineItem[]
  created_at: string
  updated_at: string
  // Relations
  client?: Profile
  project?: Project
}

export interface File {
  id: string
  project_id: string
  client_id: string
  name: string
  url: string
  size: number | null
  type: string | null
  uploaded_by: string
  created_at: string
  // Relations
  project?: Project
  client?: Profile
  uploader?: Profile
}

export interface Message {
  id: string
  project_id: string
  sender_id: string
  content: string
  read: boolean
  created_at: string
  // Relations
  project?: Project
  sender?: Profile
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost'

export interface Lead {
  id: string
  name: string
  email: string
  company: string | null
  service: string | null
  budget: string | null
  message: string | null
  status: LeadStatus
  source: string
  created_at: string
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  service?: string
  budget?: string
  message: string
}
