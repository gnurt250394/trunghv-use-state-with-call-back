import { useState, useRef, useEffect } from 'react';
function useStateWithCallback(initState) {
    const callbackRef = useRef(null)

    const [state, setState] = useState(initState)

    useEffect(() => {
        if (callbackRef.current) {
            callbackRef.current(state)
            callbackRef.current = null
        }
    }, [state])

    const setCallbackState = (value, callback) => {
        callbackRef.current = typeof callback === 'function' ? callback : null
        setState(value)
    }

    return [state, setCallbackState]
}

export default useStateWithCallback