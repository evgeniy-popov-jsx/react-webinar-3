import React from "react";
import PropTypes from "prop-types";
import Button from "../button";

import  { formatNumber }  from "../../utils";
import './style.css';

function Item(props) {
  const callbacks = {
    callback: () => {
      props.callback(props.item.code);
    }
  }

  return (
    <div className="Item">
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className="Item-price">{formatNumber(props.item.price)} ₽</div>
      {props.item.count >= 1
        ? <div className="Item-count">{props.item.count} шт</div>
        : ''
      }
      <div className='Item-actions'>
        <Button name={props.nameBtn} callback={callbacks.callback} />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  callback: PropTypes.func,
};

Item.defaultProps = {
  callback: () => {
  },
}

export default React.memo(Item);
