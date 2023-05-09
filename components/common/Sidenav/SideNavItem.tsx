import { ReactNode } from 'react'

export type SidenavItem = Readonly<{
  name: string
  icon: ReactNode
  url: string
  disabled?: boolean
}>
