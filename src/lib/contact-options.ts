import { z } from 'zod'

export const CONTACT_SERVICES = [
  'Web Development',
  'Czech S.R.O. Formation',
  'AI Automation',
  'Website Maintenance',
] as const

export const CONTACT_BUDGETS = [
  'Under 15k CZK',
  '15k–45k CZK',
  '45k–100k CZK',
  '100k+ CZK',
  'Monthly Retainer',
] as const

export type ContactService = (typeof CONTACT_SERVICES)[number]
export type ContactBudget = (typeof CONTACT_BUDGETS)[number]

export const contactLeadSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name'),
  email: z.string().trim().email('Please enter a valid email address'),
  company: z.string().trim().max(200, 'Company name is too long').optional().or(z.literal('')),
  service: z.enum(CONTACT_SERVICES, { message: 'Please select a service' }),
  budget: z.enum(CONTACT_BUDGETS, { message: 'Please select a budget range' }),
  message: z
    .string()
    .trim()
    .min(10, 'Please provide at least a brief project description')
    .max(5000, 'Message is too long (max 5000 characters)'),
})

export type ContactLeadInput = z.infer<typeof contactLeadSchema>

export function formatContactFieldErrors(
  error: z.ZodError
): Record<string, string> {
  const fields: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = issue.path[0]
    if (typeof key === 'string' && !fields[key]) {
      fields[key] = issue.message
    }
  }
  return fields
}
