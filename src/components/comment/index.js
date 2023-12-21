import { memo } from "react";
import {Link} from 'react-router-dom';
import formatDate from '../../utils/format-date';
import CommentForm from '../comment-form';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Comment({ comment, exists, onSubmit, onShowForm, onCloseForm, stateShow}) {
    const cn = bem('Comment');

    return (
      <div className={cn()}>
        <div className={cn('title')}>
            <span>{comment.author?.profile?.name}</span>
            <p>{formatDate(new Date(comment.dateCreate))}</p>
        </div>
        <div className={cn('content')}>
            {comment.text}
        </div>
        <div className={cn('button')}>
            <button onClick={()=>{onShowForm(comment._id)}}>Ответить</button>
        </div>
        
        {exists === true
          ? (stateShow === comment._id && <CommentForm 
                                  onSubmit={onSubmit} 
                                  title={'ответ'} 
                                  placeholder={comment.author.profile.name} 
                                  commentId={comment._id} 
                                  exists={exists} 
                                  handleShow={onCloseForm}
                              />)

          : (stateShow === comment._id && <div className={cn('login')}><Link to={"/login"}>Войдите</Link>, чтобы иметь возможность ответить. <span onClick={onCloseForm}>Отмена</span></div>)
        }
        {comment.children && comment.children.length > 0 && (
          <div className={cn('children')}>
            {comment.children.map(child => {
              return <Comment key={child._id} comment={child} exists={exists} onSubmit={onSubmit}  onShowForm={onShowForm} onCloseForm={onCloseForm} stateShow={stateShow}/>
            }
            )}
          </div>
        )}
      </div>
    );
  }
  
  export default memo(Comment);
