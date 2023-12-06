import {memo} from 'react';
import { createPages } from '../../utils';
import './style.css';


function Pagination({store, callback}) {
    const currentPage = store.state.catalog.currentPage
    const totalCountPages = Math.ceil(store.state.catalog.totalCount / store.state.catalog.limit);

    const pages = createPages(totalCountPages, currentPage);
  
    return (
        <div className="Pages">
            {pages.map((page, index)=>{
              if (page < 0) {
                return <span key={index}>...</span>;
              } else {
                return (
                  <button key={index} className={`Btn-pagination${page === currentPage + 1 ? ' active' : ''}`}   onClick={()=>callback(page - 1)}>{page}</button>
                );
              }
          })}
        </div>
    )
} 

export default memo(Pagination);
