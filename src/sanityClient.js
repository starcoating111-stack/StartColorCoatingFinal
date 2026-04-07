

import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '3838mk19',
  dataset: 'production',
  apiVersion: '2023-10-01', 
  useCdn: true,
})

export default client

