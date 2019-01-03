import React from 'react'
import { Stage, Layer, Image } from 'react-konva'
import Portal from './Portal.js'
import MapButtons from './MapButtons.js'
import ReplayPanel from './ReplayPanel.js'
import AllCoursesOverprint from './AllCoursesOverprint.js'
import AllRoutes from './AllRoutes.js'
import AllRunners from './AllRunners.js'

class Map extends React.Component {
  constructor(props) {
    super(props)
    // ref handling as described in https://reactjs.org/docs/refs-and-the-dom.html
    this.stage = React.createRef()
    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll(e) {
    e.evt.stopPropagation()
    e.evt.preventDefault()
    const delta = e.evt.wheelDelta ? e.evt.wheelDelta / 40 : e.evt.deltaY ? -e.evt.deltaY : 0
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
          rotation={this.props.angle}
        >
          <Layer listening={false}>
            <Image image={this.props.map} />
            {<Portal>
              <MapButtons
                onZoom={this.props.onZoom}
                onRotate={this.props.onRotate}
                onResetMap={this.props.onResetMap}
                mapLoaded={this.props.map === null ? "" : "disabled"}
              />
            </Portal>}
          </Layer>
          <Layer listening={false}>
            <AllCoursesOverprint courses={this.props.courses} display={this.props.courseDisplay} controls={this.props.controls} opt={this.props.opt} />
          </Layer>
          <Layer listening={false}>
            <AllRoutes routes={this.props.routes} opt={this.props.opt} />
          </Layer>
          <Layer listening={false}>
            {<Portal>
              <ReplayPanel
                animation={this.props.animation}
                onStartStop={this.props.onStartStop}
                onSetSpeed={this.props.onSetSpeed}
                onSetTime={this.props.onSetTime}
                onSetReplayMode={this.props.onSetReplayMode}
                runnerCount={this.props.runners.length} />
            </Portal>}
            <AllRunners runners={this.props.runners} animation={this.props.animation} />
          </Layer>
        </Stage>
      </div >
    )
  }
}
export default Map
