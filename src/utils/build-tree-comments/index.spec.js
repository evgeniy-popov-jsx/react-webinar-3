import buildTree from './index.js'; // Укажите правильный путь к файлу

describe('utils/buildTree', () => {

  const comments = [
    { _id: '1', parent: { _type: 'article' } },
    { _id: '2', parent: { _type: 'comment', _id: '1' } },
    { _id: '3', parent: { _type: 'comment', _id: '1' } },
    { _id: '4', parent: { _type: 'article' } },
    { _id: '5', parent: { _type: 'comment', _id: '4' } },
    { _id: '6', parent: { _type: 'comment', _id: '5' } },
  ];

  test('should build tree with root comments', () => {
    const result = buildTree(comments);
    expect(result).toHaveLength(2); // Проверяем, что у нас есть два корневых комментария
    expect(result[0]._id).toBe('1'); // Проверяем, что первый корневой комментарий имеет _id = '1'
    expect(result[0].children).toHaveLength(2); // Проверяем, что у первого корневого комментария есть два дочерних комментария
  });

  test('should correctly set parent-child relationships', () => {
    const result = buildTree(comments);
    const rootComment = result.find(comment => comment._id === '1');
    expect(rootComment.children).toHaveLength(2); // Проверяем, что у корневого комментария есть два дочерних комментария

    const childComment = rootComment.children[0];
    expect(childComment._id).toBe('2'); // Проверяем, что первый дочерний комментарий имеет _id = '2'
    expect(childComment.children).toHaveLength(0); // Проверяем, что у первого дочернего комментария нет дочерних комментариев
  });
});
