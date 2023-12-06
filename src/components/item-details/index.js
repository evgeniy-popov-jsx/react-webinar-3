import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from '../../utils';

import './style.css';

function ItemDetails(props) {

    const cn = bem('Item');

    const callbacks = {
        onAdd: (e) => props.onAdd(props.item._id)
      }
    
    return (
        <div className={cn("details")}>
            <div className={cn("description")}>{props.item.description}</div>
            <div className={cn("country")}>Страна производитель: <span>{props.item.madeIn?.title} ({props.item.madeIn?.code})</span></div>
            <div className={cn("category")}>Категория: <span>{props.item.category?.title}</span></div>
            <div className={cn("edition")}>Год выпуска: <span>{props.item.edition}</span></div>
            <div className={cn("sell")}>Цена:   {numberFormat(props.item.price)} ₽</div>
            <button onClick={callbacks.onAdd}>Добавить</button>
        </div>
    )
}

export default memo(ItemDetails);
