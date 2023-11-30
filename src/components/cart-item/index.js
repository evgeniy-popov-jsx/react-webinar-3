import React from "react";
import PropTypes from "prop-types";
import Button from "../button";

import { formatNumber } from "../../utils";

import './style.css';


function CartItem(props) {
  const callbacks = {
    deleteItem: () => {
      props.deleteItem(props.item.code);
    }
  }

  return (
    <div className="Cart__item">
      <div className='Cart__item-code'>{props.item.code}</div>
      <div className='Cart__item-title'>{props.item.title}</div>
      <div className='Cart__item-price'>{formatNumber(props.item.price)} ₽</div>
      <div className='Cart__item-count'>{props.item.count} шт</div>
      <div className='Cart__item-actions'>
        <Button name={'Удалить'} callback={callbacks.deleteItem} />
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  deleteItem: PropTypes.func,
};

CartItem.defaultProps = {
  deleteItem: () => {
  },
}
export default React.memo(CartItem);
