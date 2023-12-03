import React from "react";
import { formatNumber } from "../../utils";
import PropTypes from "prop-types";

import './style.css';

function ModalTotal({totalPrice}) {
    
    return totalPrice === 0 ? (
        <div className="Total-empty">В корзине пусто...</div>
    ) : (
        <div className="Total">
            <div className="Total-inner">Итого</div>
            <div className="Total-price">{formatNumber(totalPrice)} ₽</div>
        </div>
    );
}

ModalTotal.propTypes = {
    totalPrice: PropTypes.number
  };

export default React.memo(ModalTotal);
