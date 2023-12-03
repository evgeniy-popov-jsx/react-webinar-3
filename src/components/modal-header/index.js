import React from "react";
import Button from "../button";
import PropTypes from "prop-types";

import './style.css';

function ModalHeader({setModalOpened}) {

    return (
        <div className="Header">
        <p>Корзина</p>
        <>
            <Button name={'Закрыть'} callback={setModalOpened} />
        </>
    </div>
    )
}

ModalHeader.propTypes = {
    setModalOpened: PropTypes.func,
  };

export default React.memo(ModalHeader);
