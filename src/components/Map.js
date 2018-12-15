import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Portal from './portal.js';
import MapImage from './mapimage.js';
import MapButtons from './mapbuttons.js';
import AllCoursesOverprint from './allcoursesoverprint.js';
import AllRoutes from './allroutes.js';
import AllRunners from './allrunners.js';

class Map extends Component {
  render() {
    return (
      <div>
        <Stage
          ref="stage"
          width={this.props.width}
          height={this.props.height}
          draggable={true}
          x={this.props.x}
          y={this.props.y}
        //   onWheel={this.props.handleScroll}
          scale={this.props.zoom}
        >
          <Layer>
            <MapImage map={this.props.map} />
            {/* <Portal>
              <MapButtons
                onZoomOut={this.zoomOut}
                onZoomIn={this.zoomIn}
                mapLoaded={this.props.map === null ? "" : "disabled"}
                replay={this.props.replay}
                runnerCount={this.props.runners.length}
                onStartStop={this.props.onStartStop}
                onSetSpeed={this.props.onSetSpeed}
                onChangeReplayMode={this.props.onChangeReplayMode}
                onChangeTime={this.props.onChangeTime} />
            </Portal> */}
          </Layer>
          {/* <Layer>
            <AllCoursesOverprint courses={this.props.courses} controls={this.state.controls} map={this.props.map} />
          </Layer>
          <Layer>
            <AllRoutes results={this.props.results} map={this.props.map} />
          </Layer>
          <Layer>
            <AllRunners runners={this.props.runners} map={this.props.map} replay={this.props.replay} />
          </Layer> */}
        </Stage>
      </div >
    );
  }
}
export default Map;
