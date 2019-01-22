import React, { memo } from 'react'
import Dropdown from 'react-bootstrap/lib/Dropdown'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import RG2 from '../rg2Constants'

function LanguageSelect(props) {
  const { language, onSelectLanguage } = props
  const languages = []
  for (let i = 0; i < RG2.LANGUAGES.length; i += 1) {
    if (RG2.LANGUAGES[i].language === language) {
      languages.push(< Dropdown.Item key={i} eventKey={RG2.LANGUAGES[i].code} active onSelect={onSelectLanguage}> {language}</Dropdown.Item >)
    } else {
      languages.push(< Dropdown.Item key={i} eventKey={RG2.LANGUAGES[i].code} onSelect={onSelectLanguage}> {RG2.LANGUAGES[i].language}</Dropdown.Item >)
    }
  }
  return (
    <>
      <DropdownButton id="dropdownLanguage" variant="info" title={language}>
        {languages}
      </DropdownButton>
    </>
  )
}
export default memo(LanguageSelect)

