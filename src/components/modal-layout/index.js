import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';

import './style.css';

function ModalLayout({children, modalOpened}) {

    const cn = bem('Modal');

    return (
        <div className={modalOpened ? cn() + ' open' : cn()}>
            <div className={cn('inner')}>
                {children}
            </div>
        </div>
    )
}

ModalLayout.propTypes = {
    modalOpened: PropTypes.bool.isRequired,
    children: PropTypes.node,
  };

export default React.memo(ModalLayout);
