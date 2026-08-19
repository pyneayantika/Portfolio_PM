const { createClient } = require('@supabase/supabase-js')
const projects = require('../data/projects.json')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cfcxesalkbhpxarqwgno.supabase.co'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmY3hlc2Fsa2JocHhhcnF3Z25vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzA3OTQwMiwiZXhwIjoyMTAyNjU1NDAyfQ.DahJNBEEgr5GHad3gJgHV9LMJtebNSyJWeaPXIUnnUE'

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function seed() {
  console.log('Testing Supabase connection...')
  
  const { data: existing, error: checkError } = await supabase.from('works').select('id')
  
  if (checkError) {
    console.error('Table check error (Did you run supabase-schema.sql in Supabase SQL editor?):', checkError.message)
    return
  }

  console.log(`Current works in DB: ${existing?.length || 0}`)

  if (existing?.length === 0) {
    console.log('Seeding initial works...')
    const toInsert = projects.map(({ id, ...p }) => p)
    const { data, error } = await supabase.from('works').insert(toInsert).select()
    if (error) {
      console.error('Seed insert error:', error.message)
    } else {
      console.log(`Successfully seeded ${data.length} works!`)
    }
  } else {
    console.log('Works table already populated.')
  }
}

seed()
