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
        document.getElementById('option').focus();
        return 'Enter valid value to add item';
      } else if(this.state.options.indexOf(option)>-1){
        document.getElementById('option').focus();
        return 'This option already exists';
      } 
      this.setState((prevState)=> ({ options: prevState.options.concat([option]) }));
      document.getElementById('option').value = '';
      document.getElementById('option').focus();
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

class AddOption extends React.Component {
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

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
