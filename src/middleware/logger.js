const logger = store => next => action => {

  if ((process.env.NODE_ENV !== 'production') && (action.type !== undefined) && (action.type !== 'TIMER_EXPIRED')) {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
  }
  let result = next(action)
  return result
}
export default logger