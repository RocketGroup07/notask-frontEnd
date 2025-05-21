import React from 'react'
import "./../styles/input.css"

function Input({ placeholder, label, id, register, type}) {
  return (
    <div className='inputs'>
      <label htmlFor={id}>
        {label}
        <input type={type} placeholder={placeholder} id={id} {...register} />
      </label>
    </div>
  )
}

export default Input
