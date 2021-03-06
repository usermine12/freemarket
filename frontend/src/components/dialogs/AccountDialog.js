// Renders an account dialog, here you can edit or patch user resource

import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Dialog,
  Box,
  Typography,
  Container,
  IconButton
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import queryString from 'query-string'
import AccountForm from './AccountForm'
import AvatarImage from '../AvatarImage'
import { removeDialogFilter, removeAFormFilter } from '../../utils'

const AccountDialog = () => {
  const history = useHistory()
  const search = queryString.parse(history.location.search)
  const user = useSelector(state => state.auth.user)

  if (search.accountform) {
    return (
      <Dialog open={true} onClose={() => history.push({ search: queryString.stringify(
        removeDialogFilter(search)
      )})}>
        <Box
          padding={2}
          bgcolor='primary.main'
          flexGrow={1}
          display='flex'
          alignItems='center'
        >
          <Typography color='textSecondary'>
            My Account
          </Typography>
          <Box
            display='flex'
            justifyContent='flex-end'
            flexGrow={1}
          >
            <IconButton
              onClick={() => history.push({ search: queryString.stringify(
                removeAFormFilter(search)
              )})}
            >
              <ArrowBackIcon/>
            </IconButton>
          </Box>
        </Box>
        <AccountForm/>
      </Dialog>
    )
  }

  return (
    <Dialog open={true} onClose={() => history.push({ search: queryString.stringify({
      ...search,
      dialog: null
    }) })}>
      <Box
        padding={2}
        bgcolor='primary.main'
        flexGrow={1}
        display='flex'
        alignItems='center'
      >
        <Typography color='textSecondary'>
          My Account
        </Typography>
        <Box
          display='flex'
          justifyContent='flex-end'
          flexGrow={1}
        >
          <IconButton
            onClick={() => history.push({ search: queryString.stringify({
              ...search,
              accountform: true
            })})}
          >
            <EditIcon/>
          </IconButton>
        </Box>
      </Box>
      <Box flexGrow={1} padding={2}>
        <Box
          display='flex'
          flexGrow={1}
          justifyContent='center'
          marginBottom={2}
        >
          <AvatarImage
            src={user.avatar}
            alt={`${user.display_name} avatar`}
            radius={75}
          />
        </Box>
        <Container>
          <Box display='flex' flexGrow={1}>
            <Box
              padding={2}
              bgcolor='secondary.light'
              marginRight={2}
              borderRadius={3}
              flexGrow={1}
            >
              <Typography>{user.display_name}</Typography>
              <Typography>{user.email}</Typography>
            </Box>
            <Box
              padding={2}
              bgcolor='secondary.light'
              borderRadius={3}
              flexGrow={1}
            >
              <Typography>{user.full_name}</Typography>
              <Typography>{user.website}</Typography>
            </Box>
          </Box>
          <Box
            padding={2}
            maxWidth='45vw'
            bgcolor='secondary.light'
            borderRadius={3}
            marginTop={2}
          >
            <Typography>{user.biography}</Typography>
          </Box>
        </Container>
      </Box>
    </Dialog>
  )
}

export default AccountDialog