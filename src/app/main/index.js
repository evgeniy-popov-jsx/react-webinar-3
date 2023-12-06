import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {
  const store = useStore();
  console.log(store)
  
  useEffect(() => {
    store.actions.catalog.load(store.state.catalog.currentPage);
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Пагинация 
    pagination: useCallback(currentPage => store.actions.catalog.load(currentPage)),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination store={store} callback={callbacks.pagination}/>
    </PageLayout>

  );
}

export default memo(Main);
