/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {*|string}
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
 * Вариант с замыканием на начальное значение в самовызываемой функции.
 * @returns {Number}
 */
export const generateCode = (function (start = 0) {
  return () => ++start;
}());

/**
 * Генератор чисел с шагом 1
 * Вариант с генератором.
 * Сразу создаётся генератор и возвращается функция для получения следующего значения генератора
 * @returns {Number}
 */
export const generateCode1 = (function (start = 0) {
  function* realGenerator(start) {
    while (true) {
      yield ++start;
    }
  }

  const gen = realGenerator(start);
  return () => gen.next().value;
}());

/**
 * Генератор чисел с шагом 1
 * Вариант с использованием функции как объекта для хранения значения value
 * @returns {Number}
 */
export function generateCode2() {
  return generateCode2.value ? ++generateCode2.value : generateCode2.value = 1;
}

/**
 * Преобразование массива с уникальными значениями и отдельным ключем со значением повторений
*/
export function transformCartList(list) {
  const idCountMap = {};

  list.forEach(item => {
    const id = item.code;
    if (idCountMap[id]) {
      idCountMap[id].count++;
    } else {
      idCountMap[id] = { ...item, count: 1 };
    }
  });

  const result = Object.values(idCountMap);

  return result;
}
/**
 * Преобразование числа в красивый вид
*/
export function formatNumber(number) {
  let numberString = number.toString();
  let numberArray = numberString.split('');

  const formattedArray = numberArray.map((digit, index) =>
    (index > 0 && (numberArray.length - index) % 3 === 0) ? ' ' + digit : digit
  );

  return formattedArray.join('');
}
/**
 * Считает общую стоимость
*/
export function getTotalPrice(items) {
  return items.reduce((total, item)=>{
    return total + item.price * item.count;
  }, 0)
}
