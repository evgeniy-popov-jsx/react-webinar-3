import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import Cart from './components/cart';
import PageLayout from "./components/page-layout";


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [cartOpened, setCartOpened] = useState(true);

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onOpenCart: useCallback(() => {
      setCartOpened(cartOpened => cartOpened === true ? false : true)
    }, [cartOpened]),
    addCartList: useCallback((item) => {
      store.addItemCart(item);
    }, [store]),
    deleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls setCartOpened={callbacks.onOpenCart} 
                cart={cart}/>
      <List list={list}
            addItem={callbacks.addCartList}/>
      <Cart cartOpened={cartOpened} 
            setCartOpened={callbacks.onOpenCart}
            deleteItem={callbacks.deleteItem}
            cart={cart} />
    </PageLayout>
  );
}

export default App;
