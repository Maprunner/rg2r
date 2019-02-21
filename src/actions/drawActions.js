//import RG2 from '../rg2Constants'
export const SET_COURSE_TO_DRAW = 'SET_COURSE_TO_DRAW'

export function setCourseToDraw(course) {
  return {
    type: SET_COURSE_TO_DRAW,
    course
  }
}
