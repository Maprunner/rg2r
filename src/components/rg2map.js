import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Portal from './portal.js';
import MapImage from './mapimage.js';
import MapButtons from './mapbuttons.js';
import AllCoursesOverprint from './allcoursesoverprint.js';
import AllRoutes from './allroutes.js';

class RG2Map extends Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight - 36,
    zoom: { x: 1, y: 1 },
    x: 360,
    y: 0
  };

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


  render() {
    return (
      <div>
        <Stage
          ref="stage"
          width={this.state.width}
          height={this.state.height}
          draggable={true}
          x={this.state.x}
          y={this.state.y}
          onWheel={this.handleScroll}
          scale={this.state.zoom}
        >
          <Layer>
            <MapImage map={this.props.map} />
            <Portal><MapButtons onZoomOut={this.zoomOut} onZoomIn={this.zoomIn} mapLoaded={this.props.map === null} /></Portal>
          </Layer>
          <Layer>
            <AllCoursesOverprint courses={this.props.courses} controls={this.state.controls} map={this.props.map} />
          </Layer>
          <Layer>
            <AllRoutes results={this.props.results} map={this.props.map} />
          </Layer>
        </Stage>
      </div >
    );
  }
}
export default RG2Map;
