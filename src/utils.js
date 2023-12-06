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

/**
 * Функция создания массива с числами для пагинации
 * @param totalPages {number}
 * @param currentPage {number}
 * @returns {number[]}
 */
export function createPages(totalPages, currentPage) {
  const pages = [];
  const SIDE_CURRENT_DISPLAY_PAGES = 1;
  const MIN_CORNER_DISPLAY_PAGES = 2;
  const ELLIPSIS = -1;

  const isCornerPage = i =>
    (currentPage + 1 <= SIDE_CURRENT_DISPLAY_PAGES && i <= MIN_CORNER_DISPLAY_PAGES + 1) ||
    (currentPage + 1 >= totalPages - SIDE_CURRENT_DISPLAY_PAGES && i >= totalPages - MIN_CORNER_DISPLAY_PAGES);

  const isWithinDisplayRange = i =>
    i === 1 || i === totalPages ||
    (i >= currentPage + 1 - SIDE_CURRENT_DISPLAY_PAGES && i < currentPage + 1 + SIDE_CURRENT_DISPLAY_PAGES + 1);

  if (totalPages <= SIDE_CURRENT_DISPLAY_PAGES * 2 + MIN_CORNER_DISPLAY_PAGES + 4) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage + 1 || isCornerPage(i) || isWithinDisplayRange(i)) {
        pages.push(i);
      }
    }

    if (currentPage + 1 > SIDE_CURRENT_DISPLAY_PAGES + 2) {
      pages.splice(1, 0, ELLIPSIS);
    }
    if (currentPage + 1 < totalPages - (SIDE_CURRENT_DISPLAY_PAGES + 1)) {
      pages.splice(pages.length - 1, 0, ELLIPSIS);
    }
  }
  return pages;
}
