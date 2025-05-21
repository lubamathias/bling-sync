// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const state = 'usuario-001' // ou pegue dinamicamente
  const url = new URL('https://www.bling.com.br/erp/oauth/authorize')
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('client_id', process.env.BLING_CLIENT_ID!)
  url.searchParams.set('redirect_uri', process.env.BLING_REDIRECT_URI!)
  url.searchParams.set('state', state)
  url.searchParams.set(
    'scope',
    [
      'produtos',
      'produtos.excluir',
      'produtos.imagens.salvar',
      'produtos.variacoes.salvar',
      'estoque',
      'estoque.inserir',
      'estoque.editar',
      'estoque.excluir',
      'pedidosvenda',
      'pedidosvenda.excluir',
      'pedidosvenda.situacoes',
      'pedidosvenda.contas',
      'pedidosvenda.estoque',
      'pedidoscompra',
      'pedidoscompra.situacoes',
      'pedidoscompra.estoque',
    ].join('+')
  )

  return NextResponse.redirect(url.toString())
}
