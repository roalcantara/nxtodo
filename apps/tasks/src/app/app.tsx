import styled from '@emotion/styled'
import { collection, serverTimestamp, addDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Form } from './components/form.component'
import { Header } from './components/header.component'
import { Todos } from './components/todos.component'
import { db, auth, signInWithGoogle } from './db/fire.service'
import { User } from './domain/user.model'

const StyledApp = styled.div`
  // Your style here
`

export function App() {
  const [user, setUser] = useState<User>()
  const [title, setTitle] = useState('')

  useEffect(() => {
    auth.onAuthStateChanged(curr => {
      if (curr) {
        setUser({
          uid: curr.uid,
          displayName: curr.displayName,
          photoURL: curr.photoURL
        })
      }
    })
  }, [])

  const addTodo = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    addDoc(collection(db, 'tasks'), {
      title,
      done: false,
      blocked: false,
      createdBy: user,
      createdByName: user?.displayName,
      timestamp: serverTimestamp()
    })
    setTitle('')
  }

  return (
    <StyledApp>
      <h1>Welcome tasks</h1>
      <div className="App">
        <Header
          user={user}
          signIn={signInWithGoogle}
          signOut={async () => auth.signOut()}
        />
        <h2> TODO List </h2>
        <Form input={title} setInput={setTitle} addTodo={addTodo} />
        <Todos input={title} />
      </div>
    </StyledApp>
  )
}

export default App
