const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

export function getId(list) {
  let exception = [];

  list.forEach(el => {
    exception.push(el.code);
  });

  let id = Math.floor(Math.random() * (100 - 10 + 1)) + 10;

  return (
    exception.some(el => el === id) 
      ? getId(list) 
      : id
  )
};

export function plural (value) {
  let config = { one: "раз", few: "раза", many: "раз"};

  const key = new Intl.PluralRules('ru-RU').select(value);

  return config[key]
}