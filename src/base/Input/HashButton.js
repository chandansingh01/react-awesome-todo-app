import React from 'react'
import '../../scss/hash_button.scss';
export default function HashButton(props) {
      return (
            <button  onClick={props.onClick}>{props.children}</button>
      )
}
