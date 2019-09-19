import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {

  state = {
    options: [],
    selectedOption: undefined,
    openModal: false
  };

  removeAll = () => {
    this.setState(() => ({
      options: []
    }));
  }

  handlePick = () => {
    const randomNumber = Math.floor(Math.random() * this.state.options.length);
    let arr = document.querySelector(".options-list").getElementsByTagName("LI");
    for (let i = 0; i < arr.length; i++) {
      arr[i].style.background = "transparent";
    }
    arr[randomNumber].style.background = "#feca57";
    this.setState((prevState) => ({
      selectedOption : prevState.options[randomNumber],
      openModal: true
    }));
  }

  addOption = (option) => {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }
    this.setState((prevState) => ({
      options: prevState.options.concat([option])
    }));
  }

  removeOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => {
        return optionToRemove !== option;
      })
    }));
  }

  closeModal = () => {
    this.setState(() => ({
      openModal: false
    }));
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({
          options
        }));
      }
    } catch (error) {
      console.log('Not valid data');
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  render() {
    const title = "Indecision App";
    const subtitle = "Put your life in the hands of a computer";
    return ( <div className = "main" >
        <Header 
          title = {title}
          subtitle = {subtitle}
        /> 
        <Action 
          hasOptions = {this.state.options.length > 0}
          handlePick = {this.handlePick}
        /> 
        <Options 
          options_number = {this.state.options}
          removeOption = {this.removeOption}
        /> 
        <AddOption 
          hasOptions = {this.state.options.length > 0}
          addOption = {this.addOption}
          removeAll = {this.removeAll}
        />
        <OptionModal 
          openModal = {this.state.openModal}
          selectedOption = {this.state.selectedOption}
          closeModal = {this.closeModal}
          />
      </div>
    );
  }
}

export default IndecisionApp;