import { useState} from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { memo } from 'react';

import './style.css'; 

function CommentForm({ onSubmit, title, placeholder, commentId, exists, handleShow }) {
    const [commentText, setCommentText] = useState('');

    const cn = bem('CommentForm');

    const handleInputChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim() !== '') {
            onSubmit(commentText, commentId);
            setCommentText('');
        }
    };

    return (
        <form className={cn('')} onSubmit={handleSubmit}>
            <div className={cn('title')}>Новый {title}</div>
            <div className={cn('Textarea')}>
                <textarea
                    value={commentText}
                    onChange={handleInputChange}
                    placeholder={placeholder ? `Мой ответ для ${placeholder}`: 'Текст'}
                    rows={5}    
                ></textarea>
            </div>
            <div className={cn('SubmitButton')}>
                <button type="submit">Отправить</button>
                {exists && <button type="button" onClick={handleShow}>Отмена</button>}
            </div>
        </form>
    );
}

CommentForm.propTypes = {
    onSubmit: propTypes.func,
    title: propTypes.string,
    placeholder: propTypes.string,
    commentId: propTypes.string,
    exists: propTypes.bool,
    handleShow: propTypes.func,
  }

export default memo(CommentForm);
