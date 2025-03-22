import React from 'react'

function ButtonLogin({ type, value, onClick, className }) {
  return (
    <div>
      <button className={className} onClick={onClick} type={type}>
        {value}
      </button>
    </div>
  )
}

export default ButtonLogin
