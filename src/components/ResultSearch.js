import React, { memo } from 'react'
import { InputText } from 'primereact/inputtext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ResultSearch({ filter, onFilterChange }) {
  return (
    <>
      <FontAwesomeIcon icon={'search'} fixedWidth />
      <InputText value={filter} onChange={(e) => onFilterChange(e.target.value)} />
    </>
  )
}

export default memo(ResultSearch)