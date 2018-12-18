import React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import Portal from './portal.js';
import MapButtons from './mapbuttons.js';
import AllCoursesOverprint from './allcoursesoverprint.js';
import AllRoutes from './allroutes.js';
import AllRunners from './allrunners.js';

class Map extends React.Component {
  constructor(props) {
    super(props);
    // ref handling as described in https://reactjs.org/docs/refs-and-the-dom.html
    this.stage = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(e) {
    e.evt.stopPropagation();
    e.evt.preventDefault();
    const delta = e.evt.wheelDelta ? e.evt.wheelDelta / 40 : e.evt.detail ? -e.evt.detail : 0;
    if (delta) {
      let mousePos = this.stage.current.pointerPos
      let xy = { x: this.stage.current.attrs.x, y: this.stage.current.attrs.y }
      let zoom = { x: this.stage.current.attrs.scaleX, y: this.stage.current.attrs.scaleY }
      this.props.onScroll(delta, mousePos, zoom, xy)
    }
  }

  render() {
    return (
      <div>
        <Stage
          ref={this.stage}
          width={this.props.width}
          height={this.props.height}
          draggable={true}
          x={this.props.x}
          y={this.props.y}
          onWheel={this.handleScroll}
          scale={this.props.zoom}
        >
          <Layer>
            <Image image={this.props.map} />
            {<Portal>
              <MapButtons
                onZoom={this.props.onZoom}
                mapLoaded={this.props.map === null ? "" : "disabled"}
                replay={this.props.replay}
                runnerCount={this.props.runners.length}
                onStartStop={this.props.onStartStop}
                onSetSpeed={this.props.onSetSpeed}
                onSetReplayMode={this.props.onSetReplayMode}
                onSetTime={this.props.onSetTime}
              />
            </Portal>}
          </Layer>
          <Layer>
            <AllCoursesOverprint courses={this.props.courses} display={this.props.courseDisplay} controls={this.props.controls} map={this.props.map} />
          </Layer>
          <Layer>
            <AllRoutes routes={this.props.routes} map={this.props.map} />
          </Layer>
          <Layer>
            <AllRunners runners={this.props.runners} map={this.props.map} replay={this.props.replay} />
          </Layer>
        </Stage>
      </div >
    )
  }
}
export default Map;
