import { useState, useEffect } from 'react'

export const useDebounce = <T>(value: T, delay = 500) => {
    const [deBouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {const timeout = setTimeout(() => {setDebouncedValue(value)}, delay)
    return () => clearTimeout(timeout)}, [value, delay])
}