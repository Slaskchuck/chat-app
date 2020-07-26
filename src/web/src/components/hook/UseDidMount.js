import { useRef, useEffect } from 'react'

export default (func, deps) => {
  const didMount = useRef(false)

  useEffect(() => {
    if (didMount.current)
      func()
    else
      didMount.current = true
    //eslint-disable-next-line
  }, deps)
}