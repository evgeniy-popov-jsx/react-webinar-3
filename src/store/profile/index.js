import StoreModule from "../module";

/**
 * Детальная информация о товаре для страницы товара
 */
class ProfileState extends StoreModule {

  initState() {
    return {
      data: {},
      waiting: false, // признак ожидания загрузки
      auth: false,
    };
  }

  /**
   * @return {Promise<void>}
   */
  async load() {
    // Проверка авторизации
    const token = localStorage.getItem('X-Token');
    const userId = localStorage.getItem('User-Id');

    if (!token || !userId) {
      window.location.href = '/login';
      this.setState({
        data: {},
        waiting: false,
        auth: false,
      });
      return;
    }

    // Установка признака ожидания загрузки
    this.setState({
      data: {},
      waiting: true,
      auth: false,
    });

    try {
      const response = await fetch(`/api/v1/users/${userId}`, {
        headers: {
          "X-Token": token,
        },
      });
      const json = await response.json();

      // Профиль успешно загружен
      this.setState({
        data: json.result,
        waiting: false,
        auth: true,
      }, 'Загружены данные профиля');

    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        data: {},
        waiting: false,
        auth: false,
      });
    }
  }
}

export default ProfileState;
