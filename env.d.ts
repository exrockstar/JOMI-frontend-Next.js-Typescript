declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * A custom env variable  to cater staging or other values since NODE_ENV doesn't have that
       */
      APP_ENV: 'production' | 'development' | 'staging'
    }
  }
}

export {}
