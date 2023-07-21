import { Task } from './task.model'

export const canDone = (task: Task): boolean => task.status === 'open'
