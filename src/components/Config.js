import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Form from 'react-bootstrap/lib/Form'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import RG2 from '../rg2Constants'

function Config(props) {
  const width = { width: RG2.INFO_BAR_WIDTH + 'px' }
  let info
  if (props.configOpen) {
    info =
      <div id="rg2-config-panel" style={width}>
<Form className="p-2">
<Form.Group as={Row} controlId="formSnap">
    <Col sm={{ span: 10, offset: 2 }}>
      <Form.Check label="Snap to control when drawing" />
    </Col>
  </Form.Group>

<Form.Group as={Row} controlId="formGPSColor">
    <Col sm={{ span: 10, offset: 2 }}>
      <Form.Check label="Show GPS speed colours" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formGPSPlusThree">
    <Col sm={{ span: 10, offset: 2 }}>
      <Form.Check label="Show +3 time loss for GPS routes" />
    </Col>
  </Form.Group>
</Form>
      </div >
  } else {
    info = null
  }

  // place arrow half way down side bar
  const style = {
    paddingTop: parseInt(props.height / 2, 10) + 'px'
  }

  return (
    <>
      <div id="rg2-config-hider" onClick={props.onToggleConfig} style={style}>
        <FontAwesomeIcon fixedWidth icon={props.configOpen ? 'caret-right' : 'caret-left'} size={"sm"} />
      </div>
      {info}
    </>
  )
}
export default Config

