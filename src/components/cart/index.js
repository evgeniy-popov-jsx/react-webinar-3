import React from "react";
import PropTypes from 'prop-types';
import Button from "../button";
import CartItem from "../cart-item";

import { transformCartList, getTotalPrice, formatNumber } from "../../utils";

import './style.css';

function Cart({cartOpened, setCartOpened, cart, deleteItem}) {
    const cartList = transformCartList(cart);
    const total = getTotalPrice(cartList);
    const formatTotal = formatNumber(total);

    return (
        <div className={cartOpened ? "Wrapper" : "Wrapper open"}>
            <div className="Cart" hidden={cartOpened} >
                <div className="Cart__header">
                    <p>Корзина</p>
                    <>
                        <Button name={'Закрыть'} callback={setCartOpened} />
                    </>
                </div>
                {cartList.length === 0 ? ( 
                    <p>В корзине пусто</p>
                ) : (
                    cartList.map((item) =>
                        <div key={item.code} className='Cart-list'>
                            <CartItem item={item} deleteItem={deleteItem}/>
                        </div>
                        )
                    )
                }  
                <div className="Total">
                    <div className="Total__inner">Итого</div>
                    <div className="Total__price">{formatTotal} ₽</div>
                </div>
            </div> 
        </div>
    )
}

Cart.propTypes = {
    cartOpened: PropTypes.bool,
    setCartOpened: PropTypes.func,
    cart: PropTypes.array,
    deletItem: PropTypes.func
}

export default Cart;
