import { memo } from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";

import './style.css';

function ProfileInfo({name, phone, email}) {

  const cn = bem('Profile');

  return (
    <div className={cn()}>
      <p className={cn('info')}>
        Имя: <span>{name}</span>
      </p>
      <p className={cn('info')}>
        Телефон: <span>{phone}</span>
      </p>
      <p className={cn('info')}>
        email: <span>{email}</span>
      </p>
    </div>
  )
}

ProfileInfo.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
};

export default memo(ProfileInfo);
