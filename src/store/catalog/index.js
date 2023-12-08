import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      currentPage: 0,
      limit: 10,
      totalCount: 0,
    }
  }

  async load(currentPage, limit) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${currentPage}0&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      currentPage: currentPage,
      totalCount: json.result.count,
      list: json.result.items
    }, 'Загружен список товар по странице');
  }

  async loadCatalogId(itemId) {
    const response = await fetch(`/api/v1/articles/${itemId}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: [...this.store.state.catalog.list, json.result],
    }, 'Загружены товар по ID');
  }
}

export default Catalog;
