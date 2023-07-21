import { Tooltip, Badge, styled, Avatar } from '@mui/material'
import { User } from '../domain/user.model'

export const Member = ({ user }: { user: User }) => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""'
      }
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0
      }
    }
  }))

  return (
    <Tooltip title={user.displayName}>
      {user.online ? (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar alt={user.displayName ?? ''} src={user.photoURL ?? ''} />
        </StyledBadge>
      ) : (
        <Avatar alt={user.displayName ?? ''} src={user.photoURL ?? ''} />
      )}
    </Tooltip>
  )
}
