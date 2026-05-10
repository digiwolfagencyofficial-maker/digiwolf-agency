export type UserRole = 'admin' | 'client'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  company: string | null
  phone: string | null
  created_at: string
}

export type ProjectStatus = 'discovery' | 'design' | 'development' | 'review' | 'launched' | 'paused'

export interface Project {
  id: string
  client_id: string
  title: string
  description: string | null
  status: ProjectStatus
  progress: number
  budget: number | null
  currency: string
  start_date: string | null
  end_date: string | null
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'

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
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost'

export interface Lead {
  id: string
  name: string
  email: string
  company: string | null
  service: string | null
  budget: string | null
  message: string
  status: LeadStatus
  source: string | null
  created_at: string
}

export interface Message {
  id: string
  project_id: string
  sender_id: string
  content: string
  read: boolean
  created_at: string
}

export interface FileRecord {
  id: string
  project_id: string
  client_id: string
  name: string
  url: string
  size: number
  type: string
}
