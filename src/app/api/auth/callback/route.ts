// src/app/api/auth/callback/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import axios from 'axios'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  if (!code) return NextResponse.json({ error: 'Código ausente' }, { status: 400 })

  const res = await axios.post('https://www.bling.com.br/erp/oauth/token', {
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.BLING_REDIRECT_URI,
    client_id: process.env.BLING_CLIENT_ID,
    client_secret: process.env.BLING_CLIENT_SECRET,
  })

  const { access_token, refresh_token, expires_in } = res.data

  await prisma.blingAccount.create({
    data: {
      userEmail: `conta-${state}@dominio.com`,
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresAt: Math.floor(Date.now() / 1000) + expires_in,
    },
  })

  return NextResponse.redirect('/')
}
