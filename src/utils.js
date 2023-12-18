/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

// Трансформация данных
export function transformData(data) {
  // Хэш-таблица для быстрого поиска узлов по идентификаторам
  const idToNodeMap = new Map();

  // Первый проход: создание объектов-узлов и заполнение хэш-таблицы
  data.forEach(item => {
    const node = {
      value: item._id,
      title: item.title,
      depth: 0,
      parent: null,
      children: [],
    };
    idToNodeMap.set(item._id, node);
  });

  // Второй проход: построение дерева и формирование результата
  const transformedData = [];
  data.forEach(item => {
    const currentNode = idToNodeMap.get(item._id);

    if (item.parent) {
      const parentNode = idToNodeMap.get(item.parent._id);
      currentNode.parent = parentNode.value;
      parentNode.children.push(currentNode);
    } else {
      // Узел верхнего уровня добавляется напрямую в результат
      transformedData.push(currentNode);
    }
  });

  // Обновляем глубину для корневых узлов, учитывая глубину родителя
  transformedData.forEach(node => {
    updateDepth(node);
  });

  // Функция для рекурсивного обновления глубины
  function updateDepth(node) {
    node.children.forEach(child => {
      child.depth = node.depth + 1;
      updateDepth(child);
    });
  }

  // Функция для рекурсивного формирования результата
  function flattenTree(node) {
    const result = [{ value: node.value, title: `${"- ".repeat(node.depth)} ${node.title}`, depth: node.depth, parent: node.parent }];

    // Рекурсивно обрабатываем дочерние узлы
    node.children.forEach(child => {
      result.push(...flattenTree(child));
    });

    return result;
  }

  // Собираем итоговый результат
  const finalResult = [];
  transformedData.forEach(node => {
    finalResult.push(...flattenTree(node));
  });

  return finalResult;
}
