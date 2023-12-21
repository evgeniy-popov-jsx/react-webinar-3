import {memo} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';

import './style.css';

function CommentsCount({count}) {

    const cn = bem('Comments');

    return (
        <div className={cn('count')}>Комментарии ({count})</div>
      );
}
CommentsCount.propTypes = {
  count: propTypes.number,
}
export default memo(CommentsCount);
