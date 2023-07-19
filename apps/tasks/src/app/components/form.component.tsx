import { TextField, Button } from '@mui/material'

export const Form = ({
  input,
  addTodo,
  setInput
}: {
  input: string
  addTodo: (e: { preventDefault: () => void }) => void
  setInput: (value: string) => void
}) => (
  <form onSubmit={addTodo}>
    <TextField
      id="outlined-basic"
      label="Save Martha"
      variant="outlined"
      style={{ margin: '0px 5px' }}
      size="small"
      value={input}
      onChange={e => setInput(e.target.value)}
    />
    <Button variant="contained" color="primary" onClick={addTodo}>
      Add Todo
    </Button>
  </form>
)
