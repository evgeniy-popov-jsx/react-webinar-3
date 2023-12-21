import { memo } from "react";
import Comment from '../../components/comment';
import NoAuth from '../../components/no-auth';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import CommentForm from "../comment-form";

function CommentsList({tree, exists, onSubmit, onShowForm, onCloseForm, stateShow, articleId}) {

    const cn = bem('Comments');

    return (
        <>
        <div className={cn('container')}>
            {tree.map((item)=>{
                return <Comment key={item._id} comment={item} exists={exists} onSubmit={onSubmit} onShowForm={onShowForm} onCloseForm={onCloseForm} stateShow={stateShow}/>
            })}
        </div>
        <div className={cn('form')}>
            {exists === false 
                ?   ( stateShow === articleId && <NoAuth />)
                :  ( stateShow === articleId && <CommentForm title={'комментарий'} onSubmit={onSubmit} />)
            }
        </div>
        </>
    );
}

export default memo(CommentsList)
