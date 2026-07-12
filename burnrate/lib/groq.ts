export async function callLLM(systemPrompt: string, userPrompt: string): Promise<string> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 2000,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    }),
  })

  if (!res.ok) throw new Error('llm_failed')

  const data = await res.json()
  return data.choices[0].message.content as string
}

export function parseJSON<T>(raw: string): T {
  const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim()
  try {
    return JSON.parse(cleaned) as T
  } catch {
    throw new Error('parse_failed')
  }
}
