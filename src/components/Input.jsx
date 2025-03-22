import React from 'react'

function Input({ placeholder, label, id }) {
  return (
    <div>
      <label htmlFor={id}>
        {label}
      </label>
      <input type="text" placeholder={placeholder} id={id} />
    </div>
  )
}

export default Input
