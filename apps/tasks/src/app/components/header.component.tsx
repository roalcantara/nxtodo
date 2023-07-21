import { Box } from '@mui/material'
import { Heading, Button } from 'dracula-ui'

export const Header = ({
  label,
  handleLogin
}: {
  label?: string
  handleLogin: () => void
}) => (
  <Box
    component="span"
    mt={1}
    display="flex"
    justifyContent="space-between"
    alignItems="center"
  >
    <Heading color="purpleCyan">Tasks</Heading>
    <Button m="sm" onClick={handleLogin}>
      {label}
    </Button>
  </Box>
)
