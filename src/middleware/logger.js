const logger = store => next => action => {
  if ((action.type === undefined) || (action.type === 'TIMER_EXPIRED')) {
    let result = next(action)
    return result
  }
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

export default logger