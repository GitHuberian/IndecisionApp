import React from 'react';

export default (props) =>{
    return (
      <div>
        <button id="btn-decision"
          onClick={props.handlePick}
          disabled={!props.hasOptions}
        >
          What should I do?...
        </button>
      </div>
    );
  }