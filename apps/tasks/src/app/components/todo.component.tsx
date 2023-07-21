import { User } from '@firebase/auth'
import { Icon, Tooltip, IconButton } from '@mui/material'
import { Box, Text } from 'dracula-ui'
import { useState } from 'react'
import { canDone } from '../domain'
import { Task } from '../domain/task.model'

export const Todo = ({
  task,
  enabled,
  onSave,
  onDelete,
  currentUser
}: {
  task: Task
  enabled: boolean
  onSave: (id: string, task: Partial<Task>) => void
  onDelete: (id: string) => void
  currentUser: User | null
}) => {
  const [isBlockHover, setIsBlockHover] = useState(false)
  const [isDoneHover, setIsDoneHover] = useState(false)
  const [isDeleteHover, setIsDeleteHover] = useState(false)
  const [isDetail, setIsDetail] = useState(false)

  return (
    <Box
      onDoubleClick={() => {
        if (enabled) setIsDetail(value => !value)
      }}
      color="black"
      display="flex"
      p="sm"
      mb="xs"
      rounded="lg"
      as="article"
    >
      <Box
        display="flex"
        pr="sm"
        style={{ flexDirection: 'column', stroke: 'context-stroke' }}
      >
        <Text
          color={task.status === 'done' ? 'blackSecondary' : 'purpleCyan'}
          style={{ wordBreak: 'break-all' }}
        >
          {task.title}
        </Text>
        {isDetail && (
          <Text mt="xs" color="blackSecondary">
            {task.status} ∙ {task.id}
          </Text>
        )}
      </Box>
      <Box display="flex" pr="sm">
        <Tooltip title={task.status === 'blocked' ? 'Unblock' : 'Block'}>
          <span>
            <IconButton
              onMouseEnter={() => setIsBlockHover(true)}
              onMouseLeave={() => setIsBlockHover(false)}
              onClick={() => {
                if (
                  enabled &&
                  currentUser?.uid === task.userId &&
                  task.status !== 'done'
                ) {
                  onSave(String(task.id), {
                    status: task.status === 'open' ? 'blocked' : 'open'
                  })
                } else {
                  alert('You are not authorized to perform this action')
                }
              }}
            >
              <Icon
                color={
                  enabled &&
                  currentUser?.uid === task.userId &&
                  task.status !== 'done'
                    ? isBlockHover
                      ? 'warning'
                      : 'action'
                    : 'disabled'
                }
                sx={{ fontSize: 40 }}
              >
                {task.status === 'blocked'
                  ? 'play_circle_outline'
                  : 'pause_circle_outline'}
              </Icon>
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Complete">
          <IconButton
            onMouseEnter={() => setIsDoneHover(true)}
            onMouseLeave={() => setIsDoneHover(false)}
            onClick={() => {
              if (enabled && canDone(task)) {
                onSave(String(task.id), {
                  status: 'done'
                })
              } else {
                alert('You are not authorized to perform this action')
              }
            }}
          >
            <Icon
              color={
                task.status !== 'done' && task.status !== 'blocked'
                  ? isDoneHover
                    ? 'success'
                    : 'action'
                  : 'disabled'
              }
              sx={{ fontSize: 40 }}
            >
              check_circle_outline
            </Icon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton
            onMouseEnter={() => setIsDeleteHover(true)}
            onMouseLeave={() => setIsDeleteHover(false)}
            onClick={() => {
              if (enabled) {
                onDelete(String(task.id))
              } else {
                alert('You are not authorized to perform this action')
              }
            }}
          >
            <Icon
              color={isDeleteHover ? 'error' : 'action'}
              sx={{ fontSize: 40 }}
            >
              remove_circle_outline
            </Icon>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}
