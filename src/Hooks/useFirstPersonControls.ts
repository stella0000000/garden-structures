import { produce } from 'immer'
import { useEffect, useState } from 'react'

type KeyStates = {
  forward: boolean,
  left: boolean,
  down: boolean,
  right: boolean,
}

const useFirstPersonControls = () => {
  const [keyStates, setKeyStates] = useState<KeyStates>({
    forward: false,
    left: false,
    down: false,
    right: false
  })
  
  // useEffect(() => {
  //   console.log({ keyStates })
  // }, [keyStates])
  
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key){
      case 'w':
        return setKeyStates(produce(keyStates, draft => {
          draft.forward = true
        }))
      case 'a':
        // sans immer
        return setKeyStates((prevState) => {
          const clone = { ...prevState }
          clone.left = true
          return clone
        })
      case 's':
        return setKeyStates(produce(keyStates, draft => {
          draft.left = true
        }))
      case 'd':
        return setKeyStates(produce(keyStates, draft => {
          draft.right = true
        }))
      default:
        return
    }
  }
  
  const handleKeyUp = (e: KeyboardEvent) => {
    // console.log({ keyStates })
    switch (e.key){
      case 'w':
        return setKeyStates(produce(keyStates, draft => {
          draft.forward = false
        }))
      case 'a':
        // sans immer
        return setKeyStates((prevState) => {
          const clone = { ...prevState }
          clone.left = false
          return clone
        })
      case 's':
        return setKeyStates(produce(keyStates, draft => {
          draft.left = false
        }))
      case 'd':
        return setKeyStates(produce(keyStates, draft => {
          draft.right = false
        }))
      default:
        return
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