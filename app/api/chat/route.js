import { NextResponse } from 'next/server'
import { CHAT_SYSTEM_PROMPT } from '@/lib/chatSystemPrompt'
import { getServiceSupabase } from '@/lib/supabase'

const RATE_LIMIT_PER_HOUR = 25

export async function POST(request) {
  try {
    const { messages, sessionId } = await request.json()

    if (!messages || !sessionId) {
      return NextResponse.json(
        { error: 'Missing messages array or sessionId.' },
        { status: 400 }
      )
    }

    const supabase = getServiceSupabase()
    const lastUserMsg = messages[messages.length - 1]?.content || ''

    // 1. Rate Limiting Check (if Supabase is available)
    if (supabase) {
      try {
        const oneHourAgo = new Date(Date.now() - 3600000).toISOString()
        const { count } = await supabase
          .from('chat_logs')
          .select('*', { count: 'exact', head: true })
          .eq('session_id', sessionId)
          .eq('role', 'user')
          .gte('created_at', oneHourAgo)

        if (count >= RATE_LIMIT_PER_HOUR) {
          return NextResponse.json(
            { reply: "You've reached the hourly message limit. Feel free to connect directly with Ayantika via LinkedIn or email!" },
            { status: 429 }
          )
        }
      } catch (err) {
        console.warn('Chat rate limiting lookup warning:', err)
      }
    }

    // 2. Call Groq Free Tier API if key is present
    const groqApiKey = process.env.GROQ_API_KEY

    let reply = ''

    if (groqApiKey && !groqApiKey.includes('your_groq_api_key')) {
      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`,
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b',
          messages: [
            { role: 'system', content: CHAT_SYSTEM_PROMPT },
            ...messages.slice(-10),
          ],
          max_tokens: 400,
          temperature: 0.7,
        }),
      })

      if (groqResponse.ok) {
        const data = await groqResponse.json()
        reply = data.choices?.[0]?.message?.content || "I'm not sure how to answer that."
      } else {
        console.warn('Groq API returned non-200 status:', groqResponse.status)
      }
    }

    // Fallback AI simulation if Groq key is unset or in local demo mode
    if (!reply) {
      const lower = lastUserMsg.toLowerCase()
      if (lower.includes('different') || lower.includes('why hire') || lower.includes('stand out')) {
        reply = "What makes me different is that I don't treat ESG as a policy checkbox — I treat it as a hard systems & data architecture problem. After 4 years of translating messy mandates across 8 regulated entities, I build AI-native products with deep respect for data integrity, precision metrics, and ruthless scoping."
      } else if (lower.includes('ragbench') || lower.includes('rag')) {
        reply = "RAGBench is my benchmark framework where I tested 36 RAG pipeline configurations against complex multi-table GHG Protocol PDFs on a ₹0 budget constraint. I compared different chunking strategies, hybrid BM25 + dense retrieval, and embedding architectures."
      } else if (lower.includes('framework') || lower.includes('focused') || lower.includes('game') || lower.includes('sifted')) {
        reply = "I regularly use FOCUSED for product scoping, GAME for market sizing and guesstimates, SIFTED for multi-tiered variable modeling, and JTBD for customer research. Check out the interactive Product Lab on this site to see worked examples!"
      } else if (lower.includes('role') || lower.includes('looking for') || lower.includes('opportunity')) {
        reply = "I'm actively targeting APM / PM-1 / Product Manager roles at AI-native startups, Climate-tech, FinTech, and B2B SaaS organizations where I can solve high-friction data problems and ship user-centric products."
      } else if (lower.includes('myntra') || lower.includes('maya') || lower.includes('teardown')) {
        reply = "In my Myntra Maya teardown, I redesigned the conversational shopping experience into an autonomous 5-agent system (Stylist, Sizing, Budget, Returns Predictor, and Orchestrator) validated with a 30-respondent survey."
      } else {
        reply = `Thanks for asking! I'm Ayantika Pyne — Sustainability Manager & Product Owner at Bajaj Finserv Group, where I manage ESG data architecture across 8 entities and built Sprih GHG accounting SaaS. Feel free to explore my works above or reach me at pyneayantika1998@gmail.com!`
      }
    }

    // 3. Log to Supabase chat_logs if available
    if (supabase) {
      try {
        await supabase.from('chat_logs').insert([
          { session_id: sessionId, role: 'user', content: lastUserMsg },
          { session_id: sessionId, role: 'assistant', content: reply },
        ])
      } catch (err) {
        console.warn('Chat logging error:', err)
      }
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Chat route error:', error)
    return NextResponse.json(
      { error: 'Something went wrong processing your request.' },
      { status: 500 }
    )
  }
}
