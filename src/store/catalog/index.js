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
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
