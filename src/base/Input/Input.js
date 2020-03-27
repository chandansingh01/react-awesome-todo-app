import React from 'react';
import '../../scss/todo_input.scss';


//Custom made input for out app.
export default function Input(props) {
      return (
            <div className="input-wrapper">
                  <form action="" onSubmit={props.onSubmit}>
                        <input className="todo-input"
                              type="text" placeholder="what are your plans?"
                              onChange={props.setInput}
                              value={props.value}
                        />
                        <button type='button' style={{display:'none'}}></button>
                  </form>
            </div>
      )
}
