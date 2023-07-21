import 'dracula-ui/styles/dracula-ui.css'
import { Grid, Stack, Container } from '@mui/material'
import { onAuthStateChanged } from 'firebase/auth'
import { useCallback, useEffect, useState } from 'react'
import { Form, Header, Member, Nav, Todo } from './components'
import {
  auth,
  signOut,
  signInWithGoogle,
  stream,
  addTask,
  saveTask,
  removeTask
} from './db/fire.service'
import { Task, User } from './domain'

export const App = () => {
  const states = ['all', 'open', 'blocked', 'done'] as const
  const [filter, setFilter] = useState('open')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setUser] = useState<Omit<User, 'online'>>()
  const [users, setUsers] = useState<User[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [items, setItems] = useState<Task[]>([])
  const [counts, setCounts] = useState({
    all: 0,
    open: 0,
    blocked: 0,
    done: 0
  })
  const handleAuthentication = useCallback(() => {
    if (currentUser?.id) {
      return signOut(currentUser?.id)
    }
    return signInWithGoogle()
  }, [currentUser])

  useEffect(() => {
    setCounts(
      tasks.reduce(
        (acc, task) => {
          acc[task.status]++
          if (task.status === 'blocked') {
            acc.open++
          }
          acc.all++
          return acc
        },
        {
          all: 0,
          open: 0,
          blocked: 0,
          done: 0
        }
      )
    )
    setItems(
      tasks.filter(
        value =>
          filter === 'all' ||
          value.status === filter ||
          (filter === 'open' && value.status === 'blocked')
      )
    )
  }, [tasks, filter])

  useEffect(() => {
    stream('tasks', setTasks)
  }, [setTasks])

  useEffect(() => {
    stream('users', setUsers)
  }, [setUsers])

  useEffect(() => {
    onAuthStateChanged(auth, curr => {
      if (curr) {
        setUser({
          ...curr,
          id: curr.uid
        })
      } else {
        setUser(undefined)
      }
      setIsAuthenticated(!!curr)
    })
  }, [setUser])

  return (
    <Container fixed>
      <Header
        label={isAuthenticated ? 'SignOut' : 'SignIn'}
        handleLogin={handleAuthentication}
      />
      <Nav
        tabs={Object.values(states)}
        getCount={(state: string) =>
          counts[state as (typeof states)[number]] ?? 0
        }
        setFilter={setFilter}
      />
      <Grid container spacing={2} my={2}>
        <Grid item xs={11} md={11}>
          {items.map((value, i) => (
            <Todo
              key={`tasks_${i}`}
              task={value}
              enabled={isAuthenticated}
              currentUser={auth.currentUser}
              onDelete={removeTask}
              onSave={saveTask}
            />
          ))}
        </Grid>
        <Grid item xs={1} md={1}>
          <Stack spacing={2}>
            {users?.map((user, i) => (
              <Member key={`users_${i}`} user={user} />
            ))}
          </Stack>
        </Grid>
        <Grid item xs={11} md={11}>
          <Form enabled={isAuthenticated} onSave={addTask} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
