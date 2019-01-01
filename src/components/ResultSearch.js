import React, { memo } from 'react'
import Form from 'react-bootstrap/lib/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ResultSearch({ filter, onFilterChange }) {
  return (
    <Form inline>
      <Form.Group controlId="formBasicEmail">
        <Form.Label><FontAwesomeIcon icon={'search'} fixedWidth /></Form.Label>
        <Form.Control type="search" />
        <Form.Text value={filter} onChange={(e) => onFilterChange(e.target.value)} />
      </Form.Group>
    </Form>
  )
}

export default memo(ResultSearch)