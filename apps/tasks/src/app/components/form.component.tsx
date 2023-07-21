import { Box, Button, Input } from 'dracula-ui'
import { useState } from 'react'
import { Task } from '../domain'

export const Form = ({
  enabled,
  onSave
}: {
  enabled: boolean
  onSave: (task: Partial<Task>) => void
}) => {
  const [value, setValue] = useState('')
  const submitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!enabled || !value) return
    onSave({ title: value })
    setValue('')
  }

  return (
    <Box display="flex" mb="md" as="article">
      <form
        style={{ display: 'flex', flexDirection: 'row', width: '100%' }}
        onSubmit={submitForm}
      >
        <Input
          size="lg"
          borderSize="sm"
          color={enabled ? 'cyan' : undefined}
          type="text"
          placeholder="Add task"
          required={true}
          value={enabled ? value : 'SignIn to add tasks...'}
          onChange={e => {
            setValue(e.target.value)
          }}
          disabled={!enabled}
        />
        <Button disabled={!enabled} ml="xs" size="lg">
          +
        </Button>
      </form>
    </Box>
  )
}
