import React from "react";
import PropTypes from 'prop-types';
import Button from "../button";

import { plural, formatNumber } from "../../utils";

import './style.css';

function Controls(props) {
  const {setModalOpened, cart, totalPrice} = props;

  const numberGoods = cart.length;
  const formatTotal = formatNumber(totalPrice);

  return (
    <div className='Controls'>
      <div className='Controls__info'>
        В корзине: { numberGoods === 0 
                      ? <span>пусто</span>
                      : <span>{numberGoods} {plural(numberGoods,{one: 'товар', few: 'товара', many: 'товаров'})} / {formatTotal} ₽</span>
                    }
      </div> 
      <Button name={'Перейти'} callback={setModalOpened} />
    </div>
  )
}

Controls.propTypes = {
  setModalOpened: PropTypes.func,
  cart: PropTypes.array,
  totalPrice: PropTypes.number
};

Controls.defaultProps = {
  setModalOpened: () => {}
}

export default React.memo(Controls);
