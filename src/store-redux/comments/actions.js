export default {
    /**
     * Загрузка комментариев
     * @param id
     * @return {Function}
     */
     loadComments: (id) => {
      return async (dispatch, getState, services) => {
        dispatch({ type: 'comments/load-start' });
  
        try {
          const res = await services.api.request({
            url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
          });
          dispatch({ type: 'comments/load-success', payload: { data: res.data.result.items } });
        } catch (e) {
          dispatch({ type: 'comments/load-error' });
        }
      };
    },
  
    createComment: (text, commentId, articleId) => {
      return async (dispatch, getState, services) => {
        dispatch({ type: 'comment/create-start' });
    
        try {
          const body = {
            text,
            parent: { 
              _id: commentId ?? articleId,
              _type: commentId ? 'comment' : 'article' 
            }
          };
    
          const bodyStr = JSON.stringify(body);
    
          const res = await services.api.request({
            url: `/api/v1/comments`,
            method: 'POST',
            body: bodyStr,
          });
    
          const createdComment = res.data.result;
          dispatch({ type: 'comment/create-success', payload: { createdComment } });
    
        } catch (e) {
          dispatch({ type: 'comment/create-error' });
        }
      };
    }
  }