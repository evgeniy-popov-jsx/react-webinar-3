import item from "./components/item";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }
  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }
  /**
   * Добавление товара по коду
   */
  addItemCart(code) {
    const { list, cart, cartTotalPrice } = this.state;
    const item = cart.find(item => item.code === code);

    if (item) {
      const updatedCart = cart.map(item =>
        item.code === code 
          ? { ...item, count: (item.count || 1) + 1 } 
          : item
        );

        const updatedPrice = cartTotalPrice + item.price;

        this.setState({
          ...this.state,
          cart: updatedCart,
          cartTotalPrice: updatedPrice
        });
    } else {
      const selectedItem = list.find(item => item.code === code);

      if (selectedItem) {
        const updatedCart = [...cart, { ...selectedItem, count: 1 }];
        const updatedPrice = cartTotalPrice + selectedItem.price;

        this.setState({
          ...this.state,
          cart: updatedCart,
          cartTotalPrice: updatedPrice
        });
      }
    }
  };
  /**
   * Удаление товара по коду
   */
   deleteItem(code) {
    const { cart, cartTotalPrice } = this.state;
    const item = cart.find(item => item.code === code)

    this.setState({
      ...this.state,
      cart: cart.filter(item => item.code !== code),
      cartTotalPrice: cartTotalPrice - item.price * item.count
    })
  };
}

export default Store;
