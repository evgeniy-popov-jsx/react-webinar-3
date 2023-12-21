import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';

import './style.css';

function CommentsCount({count}) {

    const cn = bem('Comments');

    return (
        <div className={cn('count')}>Комментарии ({count})</div>
      );
}

export default memo(CommentsCount);
