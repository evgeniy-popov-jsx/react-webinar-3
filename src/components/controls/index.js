import React from "react";
import PropTypes from 'prop-types';
import Button from "../button";

import { plural, transformCartList, getTotalPrice, formatNumber } from "../../utils";

import './style.css';

function Controls({setCartOpened, cart}) {
  const cartList = transformCartList(cart);
  const numberGoods = cartList.length;
  const total = getTotalPrice(cartList);
  const formatTotal = formatNumber(total);
  
  return (
    <div className='Controls'>
      <div className='Controls__info'>
        В корзине: <span>{numberGoods} {plural(numberGoods,{one: 'товар', few: 'товара', many: 'товаров'})} / {formatTotal} ₽</span>
      </div>
      <Button name={'Перейти'} callback={setCartOpened} />
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  cart: PropTypes.array
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);
