import React from 'react';
import HashButton from '../../base/Input/HashButton';
import '../../scss/filter_list.scss';
import '../../scss/clear_button.scss';

export default function FilterList(props) {
      return (
            <div className='filter-wrapper'>
                  <div className='filter-list'>
                  {
                        props.filters.map((item,index)=>{
                              return <HashButton style={{cursor:'text'}} key={index}>{item}</HashButton>
                        })
                  }
                  </div>
                  <div>
                  <button className='clear_button' onClick={props.clearFilters}>Clear</button>
                  </div>
            </div>
      )
}
