// renders a dialog which contains a form for posting a new listing

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addListing } from '../../store/authReducer'
import { useHistory } from 'react-router-dom'
import {
  Dialog,
  Box,
  Typography,
  Container,
  Button,
  MenuItem,
  Divider
} from '@material-ui/core'
import { Form } from 'informed'
import Alert from '../Alert'
import queryString from 'query-string'
import { removeDialogFilter } from '../../utils'
import TextInput from '../TextInput'
import SelectInput from '../SelectInput'
import PictureDrop from '../PictureDrop'

const AddListingDialog = () => {
  const [error, setError] = useState(null)
  const history = useHistory()
  const dispatch = useDispatch()
  const search = queryString.parse(history.location.search)

  const titleValidate = value => {
    if (!value || value.length < 10) {
      return 'Title should contain atleast 10 characters'
    }
  }

  const priceValidate = value => {
    if (!value || value < 0.1 || value > 9999999.99) {
      return 'Price should be in range of 0.1-9999999.99'
    }
  }

  const postalCodeValidate = value => {
    if (!value) {
      return 'Invalid postal code'
    }
  }

  const descriptionValidate = value => {
    if (!value || value.length < 10 || value.length > 1000) {
      return 'Description should contain atleast 10 characters and max 1000'
    }
  }

  const handleSubmit = async values => {
    try {
      console.log(values)
      await addListing(values)(dispatch)

      // if above expression not caught, it means a successfull post
      // so we close the AddListingDialog
      history.push({ search: queryString.stringify(removeDialogFilter(search)) })
    } catch (e) {
      setError(JSON.stringify(e.response.data))
    }
  }

  return (
    <Dialog open={true} onClose={() => history.push({ search: queryString.stringify(
      removeDialogFilter(search)
    )})}>
      <Box padding={2} bgcolor='primary.main'>
        <Typography color='textSecondary'>
          Add Listing
        </Typography>
      </Box>
      <Alert severity='error' alert={error}/>
      <Form onSubmit={handleSubmit}>
        <Box padding={2}>
          <Container>
            <Box display='flex' flexWrap='wrap'>
              <Box padding={2} marginRight={2}>
                <label>
                  <Typography>
                    Title:
                  </Typography>
                  <TextInput
                    field='title'
                    validate={titleValidate}
                    validateOnBlur
                  />
                </label>
              </Box>
              <Box padding={2} marginRight={2}>
                <label>
                  <Typography>
                    Price:
                  </Typography>
                  <TextInput
                    field='price'
                    type='number'
                    validate={priceValidate}
                    validateOnBlur
                  />
                </label>
              </Box>
            </Box>
            <Box display='flex' flexWrap='wrap'>
              <Box padding={2} marginRight={2}>
                <label>
                  <Typography>
                  Postal code:
                  </Typography>
                  <TextInput
                    field='postal_code'
                    validate={postalCodeValidate}
                    validateOnBlur
                  />
                </label>
              </Box>
              <Box padding={2} marginRight={2}>
                <label>
                  <Typography>
                    Category:
                  </Typography>
                  <SelectInput
                    field='category'
                  >
                    <MenuItem value='COMPUTERS'>computers</MenuItem>
                    <MenuItem value='SMARTPHONES'>smartphones</MenuItem>
                    <MenuItem value='SMARTDEVICES'>smartdevices</MenuItem>
                    <MenuItem value='PERIPHERALS'>peripherals</MenuItem>
                    <MenuItem value='TELEVISIONS'>televisions</MenuItem>
                    <Divider/>
                    <MenuItem value='CARS'>cars</MenuItem>
                    <MenuItem value='MOTORCYCLES'>motorcycles</MenuItem>
                    <MenuItem value='BICYCLES'>bicycles</MenuItem>
                    <Divider/>
                    <MenuItem value='SHOES'>shoes</MenuItem>
                    <MenuItem value='PANTS'>pants</MenuItem>
                    <MenuItem value='SHIRTS'>shirts</MenuItem>
                    <MenuItem value='JACKETS'>jackets</MenuItem>
                    <MenuItem value='HATS'>hats</MenuItem>
                    <Divider/>
                    <MenuItem value='KITCHEN'>kitchen</MenuItem>
                    <MenuItem value='APPLIANCES'>appliances</MenuItem>
                    <MenuItem value='FURNITURE'>furniture</MenuItem>
                    <Divider/>
                    <MenuItem value='OTHER'>Other</MenuItem>
                  </SelectInput>
                </label>
              </Box>
            </Box>
            <Box display='flex' flexWrap='wrap'>
              <Box padding={2} marginRight={2}>
                <label>
                  <Typography>
                    Description:
                  </Typography>
                  <TextInput
                    field='description'
                    rows={3}
                    cols={25}
                    validate={descriptionValidate}
                    validateOnBlur
                    multiline
                  />
                </label>
              </Box>
              <Box padding={2} maxWidth={200}>
                <label>
                  <Typography>
                    Picture:
                  </Typography>
                  <PictureDrop field='picture'/>
                </label>
              </Box>
            </Box>
            <Box
              display='flex'
              flexDirection='row-reverse'
              padding={2}
              flexGrow={1}
              alignItems='center'
            >
              <Button variant='contained' type='submit'>Post</Button>
            </Box>
          </Container>
        </Box>
      </Form>
    </Dialog>
  )
}

export default AddListingDialog