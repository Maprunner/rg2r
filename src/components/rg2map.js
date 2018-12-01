import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import MapImage from './mapimage.js';
import AllCoursesOverprint from './allcoursesoverprint.js';

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
    window.addEventListener('resize', this.resizeCanvas, false);
  }

  resizeCanvas = e => {
    let canvas = document.querySelector('#rg2-body-container');
    canvas.style.height = window.innerHeight - 36;
    this.setState({
      zoom: { x: 1, y: 1 },
      width: window.innerWidth,
      // allow for header
      height: window.innerHeight - 36
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
  };

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
          </Layer>
          <Layer>
            <AllCoursesOverprint courses={this.props.courses} controls={this.state.controls} map={this.props.map} />
          </Layer>
        </Stage>
      </div >
    );
  }
}
export default RG2Map;
