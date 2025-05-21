// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import type { OAuthConfig } from "next-auth/providers/oauth";

const BlingProvider = {
  id: "bling",
  name: "Bling",
  type: "oauth",
  clientId: process.env.BLING_CLIENT_ID!,
  clientSecret: process.env.BLING_CLIENT_SECRET!,
  authorization: {
  url: "https://www.bling.com.br/Api/v3/oauth/authorize",
  params: {
    scope: "conectar",
  },
},
  token: "https://www.bling.com.br/Api/v3/oauth/token",
  userinfo: "https://www.bling.com.br/Api/v3/usuarios/me",
  profile(profile: any) {
    return {
      id: profile.id ?? profile.user_id ?? profile.email ?? "no-id",
      name: profile.name ?? profile.razaoSocial ?? "no-name",
      email: profile.email ?? "no-email",
    };
  },
} satisfies OAuthConfig<any>;

const handler = NextAuth({
  providers: [BlingProvider],
});

export { handler as GET, handler as POST };
