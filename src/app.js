class IndecisionApp extends React.Component{
    constructor(props){
      super(props);
      this.removeAll = this.removeAll.bind(this);
      this.handlePick = this.handlePick.bind(this);
      this.addOption = this.addOption.bind(this);
      this.state = {
        options : []
      };
    }
    removeAll(){
      this.setState(()=>{
        return{
          options: [] 
        };
      });
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
      this.setState((prevState)=>{
        return{
          options: prevState.options.concat([option])
        };
      });
      document.getElementById('option').value = '';
      document.getElementById('option').focus();
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
                  
                />
                <AddOption 
                  hasOptions={this.state.options.length > 0}
                  addOption={this.addOption}
                  removeAll={this.removeAll}/>
            </div>
        );
    }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

class Action extends React.Component{
  render() {
    return (
      <div>
        <button id="btn-decision"
          onClick={this.props.handlePick}
          disabled={!this.props.hasOptions}
        >
          What should I do?...
        </button>
      </div>
    );
  }
}

class Options extends React.Component {
  render() {
    return (
      <div>
        <ol className="options-list">
         {this.props.options_number.map((current) => <Option key={current} optionText = {current} />)} 
        </ol>
      </div>
    );
  }
}

class Option extends React.Component{
    render(){
        return(
          <li>Option: {this.props.optionText}</li>
        );
    }
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
    this.setState(()=>{
      return{ error };
    });
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
