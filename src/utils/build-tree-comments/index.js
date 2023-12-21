const buildTree = (comments) => {
  // Создаем объект, где ключ - это _id комментария, значение - это сам комментарий
  const commentMap = {};
  comments.forEach(comment => {
    commentMap[comment._id] = comment;
    comment.children = [];  // Инициализируем массив для дочерних комментариев
  });

  // Собираем структуру дерева
  const tree = [];
  comments.forEach(comment => {
    if (comment.parent._type === 'article') {
      tree.push(comment);  // Добавляем корневые комментарии в основной массив дерева
    } else {
      const parentComment = commentMap[comment.parent._id];
      if (parentComment) {
        parentComment.children.push(comment);  // Добавляем комментарий в дочерние элементы родительского комментария
      }
    }
  });

  return tree;
};

export default buildTree;
