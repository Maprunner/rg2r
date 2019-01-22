import React from 'react'
import Tab from 'react-bootstrap/lib/Tab'
import Nav from 'react-bootstrap/lib/Nav'
import VisibleEventList from '../containers/VisibleEventList.js'
import CourseList from '../containers/CourseList'
import ResultDisplay from './ResultDisplay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RG2 from '../rg2Constants'
import { t } from '../utils/rg2utils.js'

function Sidebar(props) {
  const { activeTabIndex, onTabChange, dict } = props
  const width = { width: RG2.INFO_BAR_WIDTH + 'px' }
  let info
  if (props.infoOpen) {
    info =
      <div id="rg2-info-panel" style={width}>
        < Tab.Container
          id="info"
          activeKey={activeTabIndex}
          onSelect={key => onTabChange({ key })}
        >
          <Nav>
            <Nav.Item>
              <Nav.Link eventKey="events">{t(dict, "Events")}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="courses" disabled={!props.courses.length > 0}>{t(dict, "Courses")}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="results" disabled={!props.hasResults}>{t(dict, "Results")}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="draw" disabled>{t(dict, "Draw")}</Nav.Link>
            </Nav.Item>
          </Nav>
          <div id="rg2-info">
            <Tab.Content>
              <Tab.Pane eventKey="events">
                <VisibleEventList />
              </Tab.Pane>
              <Tab.Pane eventKey="courses">
                <CourseList />
              </Tab.Pane>
              <Tab.Pane eventKey="results">
                <ResultDisplay courses={props.courses} />
              </Tab.Pane>
              <Tab.Pane eventKey="draw">
                Text
    </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container >
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
      <div id="rg2-info-hider" onClick={props.onToggleInfo} style={style}>
        <FontAwesomeIcon fixedWidth icon={props.infoOpen ? 'caret-left' : 'caret-right'} size={"sm"} />
      </div>
      {info}
    </>
  )
}
export default Sidebar
