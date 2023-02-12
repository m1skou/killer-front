interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_MERCURE_URL: string;
  readonly VITE_FRONT_URL: string;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
