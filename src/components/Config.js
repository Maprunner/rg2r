import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import Form from 'react-bootstrap/lib/Form'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'

class Config extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.props.onSaveConfig('Hello')
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <>
        <span className="px-1 align-middle"><FontAwesomeIcon icon={'cog'} color='white' size="lg" onClick={() => this.handleShow()} /></span>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Configuration options</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} controlId="configSnap">
                <Form.Label column sm={8}>
                  Snap to control when drawing
                </Form.Label>
                <Col sm={4}>
                  <Form.Check />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="configPlus3">
                <Form.Label column sm={8}>
                  Show +3 time loss for GPS routes
                </Form.Label>
                <Col sm={4}>
                  <Form.Check />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="configGPS">
                <Form.Label column sm={8}>
                  Show GPS speed colours
                </Form.Label>
                <Col sm={4}>
                  <Form.Check />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default Config
