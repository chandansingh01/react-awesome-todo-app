import React from 'react';
import '../../scss/radio_button.scss';

//component radio button to select colors for todo item
export default function RadioButton(props){
    return (       
        <div className='radio-container'>
          <label className='checkmate-label'>
          <input type='radio' name='color-select' value={props.color} defaultChecked={props.color===props.selectedColor} onClick={props.onClick}/>
          <span className='checkmark' style={{background:props.color}}></span>
          </label>
        </div>
    )
  }
