/**
 * Wistia types based on https://wistia.com/support/developers/player-api
 * Add functions as necessary!
 */
export type WistiaEventType =
  | 'play'
  | 'pause'
  | 'timechange'
  | 'end'
  | 'secondchange'
  | 'cancelfullscreen'
export type VideoState = 'playing' | 'paused'
export type HandlerFn = (arg: any) => void

export interface WistiaVideo {
  time(seconds?: number): number
  bind(event: WistiaEventType, handler: HandlerFn): void
  unbind(event: WistiaEventType, handler?: HandlerFn): void
  pause(): void
  play(): void
  ready(): boolean
  playbackRate(rate?: number): number
  setControlEnabled(control: string, value: boolean)
  state(): VideoState
  exitInputContext(control: string): void
  getInputContext(): string
  secondsWatched(): number
  width(width?: number, options?: any): void
  videoWidth(width?: number, options?: any): void
  inFullScreen(): boolean
  remove(): void
  volume(volume?: number): number
  duration(): number
  //
}

export interface Wistia {
  api(wistiaId: string): WistiaVideo | null
}

export interface WistiaHandle {
  id: string
  onReady(video: WistiaVideo): void
}
