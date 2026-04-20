/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_BASE?: string
  readonly VITE_SANITY_PROJECT_ID?: string
  readonly VITE_SANITY_DATASET?: string
  readonly VITE_SANITY_API_VERSION?: string
  readonly VITE_SANITY_WRITE_TOKEN?: string
  /** Optional; defaults to VITE_SANITY_DATASET. Use if `admin_user` lives in another dataset. */
  readonly VITE_SANITY_AUTH_DATASET?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
