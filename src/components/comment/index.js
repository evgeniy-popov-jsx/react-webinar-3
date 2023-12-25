import { memo, useCallback, useState, useRef, useEffect} from "react";
import { useLocation, useNavigate} from 'react-router-dom';
import formatDate from '../../utils/format-date';
import CommentForm from '../comment-form';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Comment({ 
  comment, 
  exists, 
  onSubmit, 
  onShowForm, 
  onCloseForm, 
  stateShow, 
  depth, 
  profile
}) {
    const cn = bem('Comment');
    const [profileName, setProfileName] = useState(profile);
    const nameComment = comment.author?.profile?.name || profileName;
    const maxDepth = 10;

    const navigate = useNavigate();
    const location = useLocation();
    const formRef = useRef(null);
  
    useEffect(() => {
      if (stateShow === comment._id && formRef.current) {
        const element = formRef.current;
        
        const elementRect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  
        const scrollToY = elementRect.top + elementRect.height / 2 - viewportHeight / 2;
  
        window.scrollTo({ top: window.scrollY + scrollToY, behavior: 'smooth' });
      }
    }, [stateShow, comment._id]);

    const callbacks = {
      // Переход к авторизации
      onSignIn: useCallback(() => {
        navigate('/login', {state: {back: location.pathname}});
      }, [location.pathname]),
    }
  
    return (
      <div className={depth > maxDepth ? cn("nopad") : cn()}>
        <div className={profile === nameComment ? cn('title auth') : cn('title')}>
            <span>{nameComment}</span>
            <p>{formatDate(new Date(comment.dateCreate))}</p>
        </div>
        <div className={cn('content')}>
            {comment.text}
        </div>
        <div className={cn('button')}>
            <button onClick={()=>{onShowForm(comment._id)}}>Ответить</button>
        </div>
      
        {comment.children && comment.children.length > 0 && (
          <div className={cn('children')}>
            {comment.children.map(child => {
              return <Comment 
                        key={child._id} 
                        comment={child} 
                        exists={exists} 
                        onSubmit={onSubmit}  
                        onShowForm={onShowForm} 
                        onCloseForm={onCloseForm} 
                        stateShow={stateShow} 
                        depth={depth + 1} 
                        profile={profile}/>
            }
            )}
          </div>
        )}
        {exists === true
          ? (stateShow === comment._id && (
            <div ref={formRef}>
              <CommentForm 
                                            onSubmit={onSubmit} 
                                            title={'ответ'} 
                                            nameComment={nameComment} 
                                            commentId={comment._id} 
                                            exists={exists} 
                                            handleShow={onCloseForm}
                                          />
            </div>
          ))
          : (stateShow === comment._id && (
            <div ref={formRef}>
              <div className={cn('login')}>
                <button onClick={callbacks.onSignIn}>Войдите</button>, чтобы иметь возможность ответить. <span onClick={onCloseForm}>Отмена</span>
              </div>
            </div>
          )
          )}
      </div>
    );
  }
  
  export default memo(Comment);
