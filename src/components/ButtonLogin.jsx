import "./../styles/buttonForm.css"

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
