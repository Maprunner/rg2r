import React, { memo } from 'react'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SearchBox({ filter, onFilterChange }) {
  return (
    <Form inline>
      <Form.Group controlId="formSearch">
        <Form.Label><FontAwesomeIcon icon={'search'} fixedWidth /></Form.Label>
        <Form.Control type="search" value={filter} onChange={(e) => onFilterChange(e.target.value)} />
        <Form.Text />
      </Form.Group>
    </Form>
  )
}

export default memo(SearchBox)