import { memo } from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";

import './style.css';

function AuthHeading({text}) {

  const cn = bem('AuthHeading');

  return (
    <h2 className={cn()}>{text}</h2>
  )
}

AuthHeading.propTypes = {
  text: PropTypes.string,
};

export default memo(AuthHeading);
