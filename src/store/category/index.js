import StoreModule from '../module';

/**
 * Состояние категорий - параметры фильтра
 */

class CategoryState extends StoreModule {
      /**
   * Начальное состояние
   * @return {Object}
   */
    initState() {
        return {
            categoryList: [],
        }
    }

    async getCategory() {
        const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
        const json = await response.json();
        this.setState({
            ...this.getState(),
            categoryList: json.result.items,
        })
    }
}

export default CategoryState;