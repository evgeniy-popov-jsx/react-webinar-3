import { memo, useCallback} from "react";
import { useLocation, useNavigate} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';

import './style.css';

function NoAuth() {

    const cn = bem('Auth');

    const navigate = useNavigate();
    const location = useLocation();

    const callbacks = {
      // Переход к авторизации
      onSignIn: useCallback(() => {
        navigate('/login', {state: {back: location.pathname}});
      }, [location.pathname]),
    }

    return <div className={cn('no')}><button onClick={callbacks.onSignIn}>Войдите</button>, чтобы иметь возможность комментировать</div>
    
}

export default memo(NoAuth);
