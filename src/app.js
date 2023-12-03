import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ModalLayout from './components/modal-layout';
import ModalHeader from './components/modal-header';
import ModalTotal from './components/modal-total';


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [modalOpened, setModalOpened] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalPrice = store.getState().cartTotalPrice;

  const callbacks = {
    onOpenCart: useCallback(() => {
      setModalOpened(modalOpened => modalOpened === true ? false : true)
    }, [modalOpened]),
    addCartList: useCallback((code) => {
      store.addItemCart(code);
    }, [store]),
    deleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store])
  }

  return (
    <>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls setModalOpened={callbacks.onOpenCart} cart={cart} totalPrice={totalPrice} />
        <List list={list} callback={callbacks.addCartList} nameBtn={'Добавить'}/>
      </PageLayout>
      <ModalLayout modalOpened={modalOpened}>
        <ModalHeader setModalOpened={callbacks.onOpenCart} />
        <List list={cart} callback={callbacks.deleteItem} nameBtn={'Удалить'}/>
        <ModalTotal totalPrice={totalPrice} cart={cart}/>
      </ModalLayout>
    </>

  );
}

export default App;
