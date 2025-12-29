export const ENV = {
  appId: process.env.VITE_APP_ID ?? "athlynx-vip",
  cookieSecret: process.env.JWT_SECRET ?? "athlynx-secret-key-change-in-production",
  databaseUrl: process.env.DATABASE_URL ?? "",
  // OAuth is now optional - we use simple JWT auth
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  // Forge API is optional
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
};
