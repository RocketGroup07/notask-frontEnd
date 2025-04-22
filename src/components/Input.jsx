import React from 'react'
import "./../styles/input.css"

function Input({ placeholder, label, id, register}) {
  return (
    <div className='inputs'>
      <label htmlFor={id}>
        {label}
        <input type="text" placeholder={placeholder} id={id} {...register} />
      </label>
    </div>
  )
}

export default Input
