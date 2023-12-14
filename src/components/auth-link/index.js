import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';

import './style.css';

function AuthLink({auth, name}) {

  const cn = bem('Auth');

  return (
    <Link to='/profile' className={cn()}>
      {auth ? name : null}
    </Link>
  )
}

AuthLink.propTypes = {
  state: PropTypes.object,
};

export default memo(AuthLink);
