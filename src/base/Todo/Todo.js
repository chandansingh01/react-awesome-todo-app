import React from 'react';
import HashButton from '../../base/Input/HashButton';
import '../../scss/todo.scss';
import '../../scss/utils.scss';


export default function Todo(props) {

      return (            
            <div className={props.todo.completed ? 'todo completed' : 'todo'} onClick={props.onClick}>
                  <div className="priority-border" style={{ background: props.todo.color }}>
                  </div>
                  <div className='content' >
                        <h2>{props.todo.heading}</h2>
                        {
                              props.todo.heading.split(' ').filter((item) => item[0] === '#').map((hash, index) => {
                                    return <HashButton key={index} onClick={(e) => props.addFilters(e, hash)}>{hash}</HashButton>
                              })
                        }
                  </div>
            </div>
      )
}
