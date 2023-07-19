export type Task = {
  id?: string
  title: string
  status: 'pending' | 'blocked' | 'done'
  createdBy?: string
  createdByName?: string
}
