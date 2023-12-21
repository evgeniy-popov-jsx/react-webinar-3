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
        dispatch({ type: 'comment/create' });

        try {
          const body = {
            text,
            parent: { 
              _id: commentId ?? articleId,
              _type: commentId ? 'comment' : 'article' 
            }
          };
          const bodyStr = JSON.stringify(body);
  
          await services.api.request({
            url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${articleId}`,
            method: 'POST',
            body: bodyStr,
          });

        } catch (e) {
          dispatch({ type: 'comments/load-error' });
        }
      };
    }
  }