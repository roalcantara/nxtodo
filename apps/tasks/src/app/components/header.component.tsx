import { Button } from '@mui/material'
import { User } from '../domain/user.model'

export const Header = ({
  user,
  signOut,
  signIn
}: {
  user?: User
  signOut: () => void
  signIn: () => void
}) => (
  <header>
    {user?.uid ? (
      <Button variant="contained" color="primary" onClick={signOut}>
        Sign Out
      </Button>
    ) : (
      <Button variant="contained" color="primary" onClick={signIn}>
        Sign In
      </Button>
    )}
    {user?.displayName && <h1>{user.displayName}</h1>}
  </header>
)
