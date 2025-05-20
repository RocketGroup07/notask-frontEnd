import { useNavigate } from "react-router-dom";
import NProgress from "nprogress";

function NavButton({ to, className, children, delay = 1000, ...props }) {
  const navigate = useNavigate();

  const handleClick = () => {
    NProgress.start();
    setTimeout(() => {
      navigate(to);
      NProgress.done();
    }, delay);
  };

  return (
    <button className={className} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

export default NavButton;