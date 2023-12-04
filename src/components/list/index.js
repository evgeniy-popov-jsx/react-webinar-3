import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";

import './style.css';

function List({list, callback, nameBtn}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} callback={callback} nameBtn={nameBtn}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.array,
  callback: PropTypes.func,
  nameBtn: PropTypes.string
};

export default List;
