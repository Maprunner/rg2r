import React, { useEffect, memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Help from './Help.js'
import logo from '../rg2-logo.png'

function TopPanel(props) {
  const { hash, title, onToggleInfo, onToggleControls, onToggleConfig } = props

  // this is as good a place as any to set up title and navigation
  useEffect(() => {
    if (hash !== "") {
      let currentId = extractHashId(window.location.hash)
      if (extractHashId(hash) !== currentId) {
        window.history.pushState({ hash: hash }, '', hash);
      } else {
        window.history.replaceState({ hash: hash }, '', hash);
      }
    }
  }, [hash])

  useEffect(() => {
    document.title = title
  }, [title])


  function extractHashId(hash) {
    // we already know hash is not empty
    let fields = hash.split('&')
    return fields[0].replace("#", "")
  }

  return (
    <div className="d-flex">
      <div className="flex-grow-1">
        <img onClick={onToggleInfo} className="pr-2" src={logo} alt="logo" />
        <span className="rg2-title align-middle px-2">{title}</span>
      </div>
      <div>
        <span className="px-1 align-middle"><FontAwesomeIcon
          icon={['far', 'circle']}
          color='white'
          size="lg"
          onClick={() => onToggleControls()} />
        </span>
        <span className="px-1 align-middle"><FontAwesomeIcon
          icon={'cog'}
          color='white'
          size="lg"
          onClick={() => onToggleConfig()} />
        </span>
        <Help />
      </div>
    </div >
  )
}

export default memo(TopPanel)
