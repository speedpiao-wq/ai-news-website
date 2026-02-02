cat > app/api/webhook/route.ts << 'EOF'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const { data, error } = await supabase
      .from('news')
      .insert([{
        title: body.title,
        summary: body.summary,
        content: body.content,
        category: body.category || 'AI',
        source_url: body.source_url || '',
        created_at: new Date().toISOString()
      }])

    if (error) throw error

    return NextResponse.json({ success: true, message: '新闻已保存' })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Webhook is ready' })
}
EOF
