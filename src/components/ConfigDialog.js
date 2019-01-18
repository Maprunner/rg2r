import React, { useEffect, memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Form from 'react-bootstrap/lib/Form'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import RG2 from '../rg2Constants'

function ConfigDialog(props) {
  const { configOpen, height, onSetCircleSize, onSetCourseWidth, onSetMapIntensity, onSetRouteIntensity, onToggleConfig, onToggleSnap,
    onToggleGPSColor, onToggleGPSThreeSecs, opt } = props

  useEffect(() => {
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
  const labelCol = 8
  const inputCol = 3
  const radioLabelCol = 10
  const radioCol = 1
  let info
  if (configOpen) {
    info =
      <div id="rg2-config-panel" style={width}>
        <Form className="p-1">
          <Form.Row className="font-weight-bold pl-4">Configuration Options</Form.Row>
          <Form.Group className="mb-2" as={Row} controlId="formCircleSize">
            <Form.Label className="text-right" column sm={labelCol}>Control circle size</Form.Label>
            <Col sm={inputCol}>
              <Form.Control as="input" type="number" defaultValue={opt.circleSize} onChange={onSetCircleSize} />
            </Col>
          </Form.Group>
          <Form.Group className="mb-2" as={Row} controlId="formOverprintWidth">
            <Form.Label className="text-right" column sm={labelCol}>Course overprint width</Form.Label>
            <Col sm={inputCol}>
              <Form.Control as="input" type="number" defaultValue={opt.courseWidth} onChange={onSetCourseWidth} />
            </Col>
          </Form.Group>
          <Form.Group className="mb-2" as={Row} controlId="formMapIntensity">
            <Form.Label className="text-right" column sm={labelCol}>Map intensity %</Form.Label>
            <Col sm={inputCol}>
              <Form.Control as="input" type="number" defaultValue={opt.mapIntensity} onChange={onSetMapIntensity} />
            </Col>
          </Form.Group>
          <Form.Group className="mb-2" as={Row} controlId="formRouteIntensity">
            <Form.Label className="text-right" column sm={labelCol}>Route intensity %</Form.Label>
            <Col sm={inputCol}>
              <Form.Control as="input" type="number" defaultValue={opt.routeIntensity} onChange={onSetRouteIntensity} />
            </Col>
          </Form.Group>
          <Form.Group className="mb-2" as={Row} controlId="formSnap">
            <Form.Label className="text-right" column sm={radioLabelCol}>Snap to control when drawing</Form.Label>
            <Col sm={radioCol}>
              <Form.Check onChange={onToggleSnap} checked={opt.snap} />
            </Col>
          </Form.Group>
          <Form.Group className="mb-2" as={Row} controlId="formGPSColor">
            <Form.Label className="text-right" column sm={radioLabelCol}>Show GPS speed colours</Form.Label>
            <Col sm={radioCol}>
              <Form.Check onChange={onToggleGPSColor} checked={opt.showGPSSpeed} />
            </Col>
          </Form.Group>
          <Form.Group className="mb-2" as={Row} controlId="formGPSPlusThree">
            <Form.Label className="text-right" column sm={radioLabelCol}>Show +3 time loss for GPS routes</Form.Label>
            <Col sm={radioCol}>
              <Form.Check onChange={onToggleGPSThreeSecs} checked={opt.showThreeSeconds} />
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

