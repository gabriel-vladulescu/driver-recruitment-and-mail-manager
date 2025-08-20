/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_DOMAIN: string
  readonly APP_PORT: string
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
