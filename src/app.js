import React from 'react';
import ReactDOM from 'react-dom';
import AddOption from './components/AddOption'

class IndecisionApp extends React.Component{
    constructor(props){
      super(props);
      this.removeAll = this.removeAll.bind(this);
      this.handlePick = this.handlePick.bind(this);
      this.addOption = this.addOption.bind(this);
      this.removeOption = this.removeOption.bind(this);
      this.state = {
        options : []
      };
    }
    componentDidMount(){
      try {
        const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if(options){
        this.setState(()=> ({ options }));
      }
      } catch (error) {
        console.log('Not valid data');
      }
    }
    componentDidUpdate(prevProps, prevState){
      if(prevState.options.length!==this.state.options.length)
      {
        const json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
      }
    }
    removeAll(){
      this.setState(()=> ({ options: [] }));
    }

    handlePick(){
      const randomNumber = Math.floor(Math.random() * this.state.options.length);
      let arr = document.querySelector(".options-list").getElementsByTagName("LI");
      for(let i = 0; i<arr.length; i++){
          arr[i].style.background = "transparent";
      } 
      arr[randomNumber].style.background = "#feca57";
    }

    addOption(option){
      if(!option){
        return 'Enter valid value to add item';
      } else if(this.state.options.indexOf(option)>-1){
        return 'This option already exists';
      } 
      this.setState((prevState)=> ({ options: prevState.options.concat([option]) })); 
    }

    removeOption(optionToRemove){
      this.setState((prevState)=>({
        options: prevState.options.filter((option)=>{
          return optionToRemove !== option;
        })
      }));
    }

    render(){
        const title= "Indecision App";
        const subtitle = "Put your life in the hands of a computer";
        return(
            <div className="main">
                <Header title={title} subtitle={subtitle}/>
                <Action 
                  hasOptions={this.state.options.length > 0}
                  handlePick={this.handlePick}
                  />
                <Options 
                  options_number={this.state.options} 
                  removeOption={this.removeOption}
                />
                <AddOption 
                  hasOptions={this.state.options.length > 0}
                  addOption={this.addOption}
                  removeAll={this.removeAll}/>
            </div>
        );
    }
}

const Header = (props) => {
    return (
      <div>
        <h1>{props.title}</h1>
        <h2>{props.subtitle}</h2>
      </div>
    );
};

const Action = (props) =>{
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

const Options = (props) =>{
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

const Option = (props) =>{
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

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
