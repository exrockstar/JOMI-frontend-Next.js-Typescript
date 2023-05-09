declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: 'production' | 'development' | 'staging'
    }
  }
}

export {}
