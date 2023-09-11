import { NextApiRequest, NextApiResponse } from 'next'
import { env } from '@/env.mjs'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const VERCEL_URL = process.env.VERCEL_URL
  const VERCEL_BRANCH_URL = process.env.VERCEL_BRANCH_URL
  const NEXT_PUBLIC_VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  const NEXTAUTH_URL = env.NEXTAUTH_URL
  const SIWE_URL = env.SIWE_URL

  res.json({
    VERCEL_URL,
    VERCEL_BRANCH_URL,
    NEXTAUTH_URL,
    SIWE_URL,
    NEXT_PUBLIC_VERCEL_URL,
  })
}
