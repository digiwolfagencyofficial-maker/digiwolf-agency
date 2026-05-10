import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, service, budget, message } = body

    // Basic validation
    if (!name || !email || !service || !budget || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Here you would normally send an email or save to DB
    // For now we just log and return success
    console.log('Contact form submission:', { name, email, company, service, budget, message })

    return NextResponse.json(
      { success: true, message: 'Thank you! We will be in touch within 4 business hours.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
