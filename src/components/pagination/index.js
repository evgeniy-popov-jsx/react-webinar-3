import {memo} from 'react';
import PropTypes from 'prop-types';

import { createPages } from '../../utils';

import './style.css';


function Pagination(props) {
    const currentPage = props.currentPage
    const totalCountPages = Math.ceil(props.totalPages / props.limit);

    const pages = createPages(totalCountPages, currentPage);
    console.log(props)
    return (
        <div className="Pages">
            {pages.map((page, index)=>{
              if (page < 0) {
                return <span key={index}>...</span>;
              } else {
                return (
                  <button key={index} className={`Btn-pagination${page === currentPage + 1 ? ' active' : ''}`}   onClick={()=>props.callback(page - 1)}>{page}</button>
                );
              }
          })}
        </div>
    )
} 

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  limit: PropTypes.number,
  callback: PropTypes.func
};

export default memo(Pagination);
