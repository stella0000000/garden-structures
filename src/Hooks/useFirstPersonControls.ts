import { produce } from 'immer'
import { useEffect, useState } from 'react'

type KeyStates = {
  forward: boolean,
  left: boolean,
  back: boolean,
  right: boolean,
}

const useFirstPersonControls = () => {
  const [keyStates, setKeyStates] = useState<KeyStates>({
    forward: false,
    left: false,
    back: false,
    right: false
  })
  
  // useEffect(() => {
  //   console.log({ keyStates })
  // }, [keyStates])
  
  const handleKeyDown = (e: KeyboardEvent) => {
    let key = e.key
    if (key === 'w') {
      setKeyStates(produce(keyStates, draft => {
        draft.forward = true
      }))
    }
    if (key === 'a') {
      // sans immer
      setKeyStates((prevState) => {
        const clone = { ...prevState }
        clone.left = true
        return clone
      })
    }
    if (key === 's') {
      setKeyStates(produce(keyStates, draft => {
        draft.back = true
      }))
    }

    if (key === 'd') {
      setKeyStates(produce(keyStates, draft => {
        draft.right = true
      }))
    }
  }
  
  const handleKeyUp = (e: KeyboardEvent) => {
    // console.log({ keyStates })
    let key = e.key
    if (key === 'w') {
      setKeyStates(produce(keyStates, draft => {
        draft.forward = false
      }))
    }
    if (key === 'a') {
      // sans immer
      setKeyStates((prevState) => {
        const clone = { ...prevState }
        clone.left = false
        return clone
      })
    }
    if (key === 's') {
      setKeyStates(produce(keyStates, draft => {
        draft.back = false
      }))
    }

    if (key === 'd') {
      setKeyStates(produce(keyStates, draft => {
        draft.right = false
      }))
    }
  }
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return keyStates
}

export default useFirstPersonControls