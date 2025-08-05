interface ImportMetaEnv {
  readonly NETLIFY_DATABASE_URL: string
  readonly NETLIFY_DATABASE_URL_UNPOOLED: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}