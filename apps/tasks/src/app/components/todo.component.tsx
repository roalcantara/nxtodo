import styled from '@emotion/styled'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  FormControlLabel,
  FormGroup,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Switch
} from '@mui/material'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../db/fire.service'
import { Task } from '../domain/task.model'

const StyledList = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
`

const Todo = ({ todo }: { todo: Required<Task> }) => (
  <StyledList>
    <ListItem>
      <ListItemAvatar />
      <ListItemText primary={todo.title} secondary={todo.createdByName} />
      {todo.createdBy === auth?.currentUser?.uid && (
        <DeleteIcon
          fontSize="large"
          style={{ opacity: todo.status === 'pending' ? 1 : 0.3 }}
          onClick={() => {
            if (
              todo.status === 'pending' &&
              todo.createdBy === auth?.currentUser?.uid
            ) {
              deleteDoc(doc(db, 'tasks', todo.id))
            }
          }}
        />
      )}

      <FormGroup>
        <FormControlLabel
          label="Blocked"
          control={
            <Switch
              disabled={
                todo.status === 'done' ||
                todo.createdBy !== auth?.currentUser?.uid
              }
              defaultChecked={todo.status === 'blocked'}
              onChange={e => {
                if (
                  todo.status === 'pending' &&
                  todo.createdBy === auth?.currentUser?.uid
                ) {
                  updateDoc(doc(db, 'tasks', todo.id), {
                    status: e.target.checked ? 'blocked' : 'active'
                  })
                }
              }}
            />
          }
        />
      </FormGroup>
    </ListItem>
  </StyledList>
)

export default Todo
