import {memo} from 'react';
import {Link} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';

import './style.css';

function NoAuth() {

    const cn = bem('Auth');

    return <div className={cn('no')}><Link to='/login'>Войдите</Link>, чтобы иметь возможность комментировать</div>
    
}

export default memo(NoAuth);
