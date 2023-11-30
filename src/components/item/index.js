import React from "react";
import PropTypes from "prop-types";
import Button from "../button";

import  { formatNumber }  from "../../utils";
import './style.css';

function Item(props) {
  const callbacks = {
    addItem: () => {
      props.addItem(props.item);
    }
  }

  return (
    <div className="Item">
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className="Item-price">{formatNumber(props.item.price)} ₽</div>
      <div className='Item-actions'>
        <Button name={'Добавить'} callback={callbacks.addItem} />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  addItem: PropTypes.func,
};

Item.defaultProps = {
  addItem: () => {
  },
}

export default React.memo(Item);
