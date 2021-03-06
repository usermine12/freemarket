// Renders a button meant to represent a category
// onClick pushes a new category querystring

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box , Typography} from '@material-ui/core'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { removeCategoryFilter } from '../../utils'

const CategoryButton = ({ children, category }) => {
  const [hover, setHover] = useState(false)
  const history = useHistory()
  const search = queryString.parse(history.location.search)

  let newSearch = {
    ...search,
    page: 1,
    ordering: 'created'
  }
  switch (category) {
  case 'Browse All':
    newSearch = removeCategoryFilter(newSearch)
    break
  case 'Electronics':
    newSearch = {
      ...newSearch,
      category: 'COMPUTERS,SMARTPHONES,SMARTDEVICES,PERIPHERALS,TELEVISIONS'
    }
    break
  case 'Vehicles':
    newSearch = {
      ...newSearch,
      category: 'CARS,MOTORCYCLES,BICYCLES'
    }
    break
  case 'Clothes':
    newSearch = {
      ...newSearch,
      category: 'SHOES,PANTS,SHIRTS,JACKETS,HATS'
    }
    break
  case 'Home':
    newSearch = {
      ...newSearch,
      category: 'KITCHEN,APPLIANCES,FURNITURE'
    }
    break
  case 'Other':
    newSearch = {
      ...newSearch,
      category: 'OTHER'
    }
    break
  default:
    break
  }

  return (
    <Box
      padding={1}
      margin={1}
      bgcolor={hover ? 'secondary.light' : 'secondary.main'}
      borderRadius={2}
      boxShadow={3}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Typography
        style={{ cursor: 'pointer' }}
        color='textSecondary'
        onClick={() => history.push({
          search: queryString.stringify(newSearch),
          pathname: '/listings'
        })}
      >
        {category}
      </Typography>
      {hover && children
        ? <Box
          position='fixed'
          bgcolor='white'
          borderRadius={3}
          border='1px solid lightgrey'
          boxShadow={3}
          padding={1}
          marginLeft={10}
          marginTop={-3}
        >
          {children}
        </Box>
        : null
      }
    </Box>
  )
}

CategoryButton.propTypes = {
  category: PropTypes.oneOf([
    'Browse All',
    'Electronics',
    'Vehicles',
    'Clothes',
    'Home',
    'Other'
  ]),
  children: PropTypes.arrayOf(PropTypes.element)
}

export default CategoryButton