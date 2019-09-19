import React from 'react';
import Option from './Option';

export default (props) =>{
  return (
    <div>
      {props.options_number.length === 0 && <p>Please add an option to get started!</p>}
      <ol className="options-list">
       {props.options_number.map((current) => (
         <Option 
            key={current} 
            optionText = {current} 
            removeOption={props.removeOption}
          />
       ))} 
      </ol>
    </div>
  );
}