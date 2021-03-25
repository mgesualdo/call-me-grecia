import { useState } from 'react'

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState)

  const reset = () => {
    setValues(initialState)
  }

  const handleInputChange = (e) => {
    const { target } = e

    if (!target) {
      setValues({
        ...values,
        dob: e,
      })
    } else {
      setValues({
        ...values,
        [target.name]: target.value,
      })
    }
  }

  return [values, handleInputChange, reset]
}
