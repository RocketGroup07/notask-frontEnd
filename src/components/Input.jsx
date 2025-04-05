import React from 'react'
import "./../styles/input.css"

function Input({ placeholder, label, id, value, onChange }) {
  return (
    <div className='inputs'>
      <label htmlFor={id}>
        {label}
      </label>
      <input type="text" placeholder={placeholder} id={id} value={value} onChange={onChange}/>
    </div>
  )
}

export default Input
