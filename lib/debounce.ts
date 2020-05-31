// inspiration:
// https://codeburst.io/throttling-and-debouncing-in-javascript-646d076d0a44
const debounceFn = (fn: any, delay: number) => {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }
}

// from https://github.com/ryanseddon/redux-debounced
// originally released under MIT license
// code copied to prevent Babel errors (unmaintained package)
const redux = () => {
  const timers = {}

  /* eslint-disable consistent-return */
  /* eslint-disable sonarjs/cognitive-complexity */
  const middleware = () => (dispatch) => (action) => {
    const { meta: { debounce = {} } = {}, type } = action

    const {
      time,
      key = type,
      cancel = false,
      leading = false,
      trailing = true,
    } = debounce

    const shouldDebounce = (
      (time && key) || (cancel && key)
    ) && (trailing || leading)
    const dispatchNow = leading && !timers[key]

    const later = (resolve) => () => {
      if (trailing && !dispatchNow) {
        resolve(dispatch(action))
      }
      timers[key] = null
    }

    if (!shouldDebounce) {
      return dispatch(action)
    }

    if (timers[key]) {
      clearTimeout(timers[key])
      timers[key] = null
    }

    if (!cancel) {
      return new Promise((resolve) => {
        if (dispatchNow) {
          resolve(dispatch(action))
        }
        timers[key] = setTimeout(later(resolve), time)
      })
    }
  }
  /* eslint-enable consistent-return */

  /* eslint-disable no-underscore-dangle */
  middleware._timers = timers
  /* eslint-enable no-underscore-dangle */

  return middleware
}

export default { debounce: debounceFn, middleware: redux }
