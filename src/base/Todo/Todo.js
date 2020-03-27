import React from 'react';
import HashButton from '../../base/Input/HashButton';
import '../../scss/todo.scss';
import '../../scss/utils.scss';

//regular expression used to get the words with #hashtags pattern
let regHash = /(?=#)\S[^ ][a-zA-Z0-9!@$%^&*()<>\-+=?~,./':;}{[\]]*/g;

export default function Todo(props) {

      return (            
            <div className={props.todo.completed ? 'todo completed' : 'todo'} onClick={props.onClick}>
                  <div className="priority-border" style={{ background: props.todo.color }}>
                  </div>
                  <div className='content' >
                        <h2>{props.todo.heading}</h2>
                        {
                              props.todo.heading.match(regHash)&&props.todo.heading.match(regHash).map((hash, index) => {
                                    return <HashButton key={index} onClick={(e) => props.addFilters(e, hash)}>{hash}</HashButton>
                              })
                        }
                  </div>
            </div>
      )
}
