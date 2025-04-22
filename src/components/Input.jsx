import React from 'react'
import "./../styles/input.css"

<<<<<<< HEAD
function Input({ placeholder, label, id, value, onChange }) {
=======
function Input({ placeholder, label, id, register}) {
>>>>>>> a4f70a9 (todas as mudanças)
  return (
    <div className='inputs'>
      <label htmlFor={id}>
        {label}
<<<<<<< HEAD
=======
        <input type="text" placeholder={placeholder} id={id} {...register} />
>>>>>>> a4f70a9 (todas as mudanças)
      </label>
      <input type="text" placeholder={placeholder} id={id} value={value} onChange={onChange}/>
    </div>
  )
}

export default Input
