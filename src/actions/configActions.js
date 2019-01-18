//import RG2 from '../rg2Constants'
export const SAVE_CONFIG = 'SAVE_CONFIG'
export const SET_CIRCLE_SIZE = 'SET_CIRCLE_SIZE'
export const SET_COURSE_WIDTH = 'SET_COURSE_WIDTH'
export const SET_MAP_INTENSITY = 'SET_MAP_INTENSITY'
export const SET_ROUTE_INTENSITY = 'SET_ROUTE_INTENSITY'
export const TOGGLE_CONFIG = 'TOGGLE_CONFIG'
export const TOGGLE_GPSCOLOR = 'TOGGLE_GPSCOLOR'
export const TOGGLE_GPSTHREESECS = 'TOGGLE_GPSTHREESECS'
export const TOGGLE_SNAP = 'TOGGLE_SNAP'

export function saveConfig(config) {
  return {
    type: SAVE_CONFIG,
    config
  }
}

export function setCircleSize(size) {
  return {
    type: SET_CIRCLE_SIZE,
    size
  }
}

export function setCourseWidth(width) {
  return {
    type: SET_COURSE_WIDTH,
    width
  }
}

export function setMapIntensity(intensity) {
  return {
    type: SET_MAP_INTENSITY,
    intensity
  }
}

export function setRouteIntensity(intensity) {
  return {
    type: SET_ROUTE_INTENSITY,
    intensity
  }
}

export function toggleConfig() {
  return {
    type: TOGGLE_CONFIG
  }
}

export function toggleGPSColor() {
  return {
    type: TOGGLE_GPSCOLOR
  }
}

export function toggleGPSThreeSecs() {
  return {
    type: TOGGLE_GPSTHREESECS
  }
}

export function toggleSnap() {
  return {
    type: TOGGLE_SNAP
  }
}
