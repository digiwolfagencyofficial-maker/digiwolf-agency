export const COMPANY = {
  legalName: 'Digi Wolf Agency s.r.o.',
  ico: '243 44 648',
  email: 'info@digiwolf.agency',
  phone: '+420 296 183 158',
  address: {
    street: 'Varšavská 715/36',
    district: 'Vinohrady',
    city: 'Praha 2',
    postalCode: '120 00',
    country: 'Czech Republic',
  },
} as const

export const companyFullAddress = `${COMPANY.address.street}, ${COMPANY.address.district}, ${COMPANY.address.postalCode} ${COMPANY.address.city}`

export const companyLegalLine = `${COMPANY.legalName}, IČO ${COMPANY.ico}`

export const companyCopyright = `© ${new Date().getFullYear()} ${COMPANY.legalName}, IČO ${COMPANY.ico}. All rights reserved.`
