import React from "react";
import PropTypes from 'prop-types';

function Button({name, callback}) {
    return (
        <button onClick={()=>{callback()}}>{name}</button>
    )
}

Button.propTypes = {
    name: PropTypes.string,
    callback: PropTypes.func
};

Button.defaultProps = {
    callback: () => {}
}

export default Button;
