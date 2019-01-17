import React, { useEffect, memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Form from 'react-bootstrap/lib/Form'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import RG2 from '../rg2Constants'

function ConfigDialog(props) {
  const { configOpen, height, onToggleConfig, onToggleSnap, onToggleGPSColor, onToggleGPSThreeSecs, opt } = props

  useEffect(() => {
    console.log("Config effect")
    try {
      if ((window.hasOwnProperty('localStorage')) && (window.localStorage !== null)) {
        localStorage.setItem('rg2-options', JSON.stringify(opt))
      }
    } catch (e) {
      // storage not supported so just return
      return
    }
  }, [opt])

  const width = { width: RG2.INFO_BAR_WIDTH + 'px' }
  let info
  if (configOpen) {
    info =
      <div id="rg2-config-panel" style={width}>
        <Form className="p-2">
          <Form.Group as={Row} controlId="formSnap">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check label="Snap to control when drawing" onChange={onToggleSnap} checked={opt.snap} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formGPSColor">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check label="Show GPS speed colours" onChange={onToggleGPSColor} checked={opt.showGPSSpeed} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formGPSPlusThree">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check label="Show +3 time loss for GPS routes" onChange={onToggleGPSThreeSecs} checked={opt.showThreeSeconds} />
            </Col>
          </Form.Group>
        </Form>
      </div >
  } else {
    info = null
  }

  // place arrow half way down side bar
  const style = {
    paddingTop: parseInt(height / 2, 10) + 'px'
  }

  return (
    <>
      <div id="rg2-config-hider" onClick={onToggleConfig} style={style}>
        <FontAwesomeIcon fixedWidth icon={configOpen ? 'caret-right' : 'caret-left'} size={"sm"} />
      </div>
      {info}
    </>
  )
}
export default memo(ConfigDialog)

