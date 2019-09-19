import React from 'react';

export default (props) =>{
    return(
      <li>Option: {props.optionText} 
        <a 
          onClick={(e) => {
            props.removeOption(props.optionText);
              }
            }>
               <i className="material-icons">
               cancel
               </i>
        </a>
      </li>
    );
  }