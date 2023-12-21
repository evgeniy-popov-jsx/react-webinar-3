import {memo, useState} from 'react';
import { useDispatch } from "react-redux";
import commentsActions from "../../store-redux/comments/actions";
import useSelector from '../../hooks/use-selector';
import CommentsList from '../../components/comments-list';
import CommentsCount from '../../components/comments-count';
import buildTree from '../../utils/build-tree-comments';

function Comments({comments, articleId}) {
    const dispatch = useDispatch();
    // Состояние аткивной формы
    const [showReplyForm, setShowReplyForm] = useState(articleId);
    // Построение дерева комментарий и их общее число
    const tree = buildTree(comments)
    const countComments = comments.length;

    const select = useSelector(state => ({
        exists: state.session.exists,
        waiting: state.session.waiting,
        profile: state.session.user.profile?.name
    }));

    // Отправка комментарий на сервер
    const handleSubmitComment = (text, commentId) => {
        dispatch(commentsActions.createComment(text, commentId, articleId))
            .then(() => {
                dispatch(commentsActions.loadComments(articleId));
            })
    }
    // Отображение формы
    const handleShowForm = (id) => {
        setShowReplyForm(id);
    }
    // Закрытие формы
    const handleCloseForm = () => {
        setShowReplyForm(articleId);
      }

    return (
        <>
            <CommentsCount count={countComments}/>
            <CommentsList 
                tree={tree} 
                exists={select.exists}
                onSubmit={handleSubmitComment}
                onShowForm={handleShowForm}
                onCloseForm={handleCloseForm}
                stateShow={showReplyForm}
                articleId={articleId}
            />
        </>
      );
}
 
export default memo(Comments);
