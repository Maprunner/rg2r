import React, { memo } from 'react'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import VisibleEventList from '../containers/VisibleEventList.js'
import CourseList from '../containers/CourseList'
import ResultDisplay from './ResultDisplay'
import DrawPanel from '../containers/DrawPanel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RG2 from '../rg2Constants'
import { t } from '../utils/rg2utils.js'

function Sidebar(props) {
  const { activeTabIndex, canDraw, courses, hasResults, height, infoOpen, onTabChange, onToggleInfo, dict } = props
  const width = { width: RG2.INFO_BAR_WIDTH + 'px' }
  let info
  if (infoOpen) {
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
              <Nav.Link eventKey="courses" disabled={!courses.length > 0}>{t(dict, "Courses")}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="results" disabled={!hasResults}>{t(dict, "Results")}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="draw" disabled={!canDraw}>{t(dict, "Draw")}</Nav.Link>
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
                <ResultDisplay courses={courses} />
              </Tab.Pane>
              <Tab.Pane eventKey="draw">
                <DrawPanel />
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
    paddingTop: parseInt(height / 2, 10) + 'px'
  }

  return (
    <>
      <div id="rg2-info-hider" onClick={onToggleInfo} style={style}>
        <FontAwesomeIcon fixedWidth icon={infoOpen ? 'caret-left' : 'caret-right'} size={"sm"} />
      </div>
      {info}
    </>
  )
}
export default memo(Sidebar)
