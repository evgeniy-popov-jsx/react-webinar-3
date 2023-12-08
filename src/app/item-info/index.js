import {memo, useCallback, useEffect} from 'react';
import {useParams} from "react-router-dom";
import ItemDetails from "../../components/item-details";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function ItemInfo() {
  const store = useStore();
  const params = useParams();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.itemDetails.item,
  }));

  const itemId = select.item?._id || params.id;

  useEffect(() => {
    if (select.list.length === 0) {
      store.actions.catalog.loadCatalogId(itemId);
    }
    store.actions.itemDetails.loadItemById(itemId);
}, [itemId]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.item.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <ItemDetails item={select.item} onAdd={callbacks.addToBasket}/>
    </PageLayout>

  );
}

export default memo(ItemInfo);
