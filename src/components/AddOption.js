import React from 'react';

export default class AddOption extends React.Component {
    constructor(props){
      super(props);
      this.addOption = this.addOption.bind(this);
      this.state = {
        error: undefined
      };
    }
    addOption(e){
      e.preventDefault();
  
      const option = e.target.elements.option.value.trim();
      const error = this.props.addOption(option);
      this.setState(()=>({ error }));
      if(!error){
        e.target.elements.option.value = '';
      }
      e.target.elements.option.focus();
    }
    render() {
      return (
        <div>
          <form onSubmit={this.addOption}>
              <input id="option" type="text" name="option"/>
              <button id="btn-add">Add Option</button>
          </form>
          <button id="btn-remove"
            onClick={this.props.removeAll}
            disabled={!this.props.hasOptions}
          >Clear list</button>
          {this.state.error && <p className="error">{this.state.error}</p>}
        </div>
      );
    }
  }