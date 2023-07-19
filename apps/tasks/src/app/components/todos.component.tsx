import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Todo from './todo.component'
import { db } from '../db/fire.service'
import { Task } from '../domain/task.model'

export const Todos = ({ input }: { input: string }) => {
  const [todos, setTodos] = useState<Task[]>([])

  useEffect(() => {
    onSnapshot(collection(db, 'tasks'), snapshot => {
      setTodos(snapshot.docs.map(doc => ({ ...doc.data() } as Task)))
    })
  }, [input])

  return (
    <ul>
      {todos.map((todo, i) => (
        <Todo key={i} todo={todo as Required<Task>} />
      ))}
    </ul>
  )
}
