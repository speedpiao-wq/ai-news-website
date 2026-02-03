import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ status: 'Webhook is ready' })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('Received webhook:', data)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
