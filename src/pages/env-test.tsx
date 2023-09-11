import { env } from '@/env.mjs'

type Props = {
  VERCEL_URL: string
  VERCEL_BRANCH_URL: string
  NEXTAUTH_URL: string
  SIWE_URL: string
}

export const getServerSideProps = () => {
  const VERCEL_URL = process.env.VERCEL_URL
  const VERCEL_BRANCH_URL = process.env.VERCEL_BRANCH_URL
  const NEXTAUTH_URL = env.NEXTAUTH_URL
  const SIWE_URL = env.SIWE_URL
  return {
    props: {
      VERCEL_URL,
      VERCEL_BRANCH_URL,
      NEXTAUTH_URL,
      SIWE_URL,
    },
  }
}

export default function EnvTest({ VERCEL_BRANCH_URL, VERCEL_URL, NEXTAUTH_URL, SIWE_URL }: Props) {
  return (
    <div>
      <h1>Env Test</h1>
      <p>VERCEL_URL: {VERCEL_URL}</p>
      <p>VERCEL_BRANCH_URL: {VERCEL_BRANCH_URL}</p>
      <p>NEXTAUTH_URL: {NEXTAUTH_URL}</p>
      <p>SIWE_URL: {SIWE_URL}</p>
    </div>
  )
}
