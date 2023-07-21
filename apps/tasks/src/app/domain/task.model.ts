export type Task = {
  id?: string
  title: string
  status: 'open' | 'blocked' | 'done'
  user?: string
  userId?: string
  timestamp?: string
  date?: Date | string
}
