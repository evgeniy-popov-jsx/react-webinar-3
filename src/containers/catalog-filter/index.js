import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
  }));

  const callbacks = {
    // Фильтрация
    onCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store]),
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), []),
    category: useMemo(() => ([
      {value: "", title: 'Все'},
      { value: "65782dc9cbf638685992a338", title: "Электроника" },
      { value: "65782dc9cbf638685992a339", title: "- Телефоны" },
      { value: "65782dc9cbf638685992a340", title: "-- Смартфоны" },
      { value: "65782dc9cbf638685992a341", title: "-- Аксессуары" },
      { value: "65782dc9cbf638685992a33a", title: "- Ноутбуки" },
      { value: "65782dc9cbf638685992a33b", title: "- Телевизоры" },
      { value: "65782dc9cbf638685992a33c", title: "Книги" },
      { value: "65782dc9cbf638685992a33d", title: "- Учебники" },
      { value: "65782dc9cbf638685992a33e", title: "- Художественная" },
      { value: "65782dc9cbf638685992a33f", title: "- Комиксы" },
    ]), []),
  };

  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select options={options.category} value={select.category} onChange={callbacks.onCategory}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
