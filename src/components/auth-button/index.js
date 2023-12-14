import { memo } from "react";
import {cn as bem} from '@bem-react/classname';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import './style.css';


function AuthButton({auth, onLogOut}) {

  const cn = bem('AuthButton');

  return (
    auth 
      ? <button className={cn()} onClick={() => onLogOut()}>Выход</button>
      : <Link to='/login' className={cn('link')}>Вход</Link>
  )
}

AuthButton.propTypes = {
  auth: PropTypes.bool,
  onLogOut: PropTypes.func
};

export default memo(AuthButton);
