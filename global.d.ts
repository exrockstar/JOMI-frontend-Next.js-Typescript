interface Window {
  bootstrap: {
    user?: {
      _id: string
    }
  }
  _wq: Array<any>
  Wistia: any
  analytics: {
    track(event: string, value: string): void
  }
  dataLayer?: any | null
}

/**
 * Used to convert T[] to T
 */
type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T
