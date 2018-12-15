import { connect } from 'react-redux'
import Map from '../components/Map'

import { Component } from 'react';

class Canvas extends Component {
  constructor() {
    super();
    window.addEventListener('resize', this.resizeBody, false);
  }

  resizeBody = e => {
    let body = document.querySelector('#rg2-body-container');
    body.style.height = (window.innerHeight - 56) + 'px';
    this.setState({
      zoom: { x: 1, y: 1 },
      width: window.innerWidth,
      // allow for header
      height: window.innerHeight - 56
    });
  }

  zoomIn = e => {
    this.setState({
      zoom: { x: this.state.zoom.x * 1.2, y: this.state.zoom.y * 1.2 }
    });
  }

  zoomOut = e => {
    this.setState({
      zoom: { x: this.state.zoom.x / 1.2, y: this.state.zoom.y / 1.2 }
    });
  }

  handleScroll = e => {
    e.evt.stopPropagation();
    e.evt.preventDefault();
    const stage = this.refs.stage;
    const delta = e.evt.wheelDelta ? e.evt.wheelDelta / 40 : e.evt.detail ? -e.evt.detail : 0;
    if (delta) {
      const factor = Math.pow(1.1, delta);
      // assuming same zoom factor for x and y
      const newZoom = this.state.zoom.x * factor;
      // limit zoom to avoid things disappearing
      // chosen values seem reasonable after some quick tests
      if ((newZoom < 50) && (newZoom > 0.05)) {
        const mousePointTo = {
          x: stage.getPointerPosition().x / stage.attrs.scaleX - stage.attrs.x / stage.attrs.scaleX,
          y: stage.getPointerPosition().y / stage.attrs.scaleY - stage.attrs.y / stage.attrs.scaleY,
        };

        this.setState({
          zoom: { x: newZoom, y: newZoom },
          x: -(mousePointTo.x - stage.getPointerPosition().x / newZoom) * newZoom,
          y: -(mousePointTo.y - stage.getPointerPosition().y / newZoom) * newZoom
        });
      }
    }
  }
}

  const mapStateToProps = state => ({
    width: 800,
    height: 500,
    x: 340,
    y: 0,
    map: state.mapImage,
    scale: 1
  })

  const mapDispatchToProps = dispatch => ({

  })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)