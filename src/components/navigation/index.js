import { memo } from "react";
import {Link} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';

import './style.css';

function Navigation() {

    const cn = bem('Nav');
    
    return (
          <div className={cn('container')}>
            <Link to="/" className={cn('link')}>Главная</Link>
          </div>
    );
  }

  export default memo(Navigation);
