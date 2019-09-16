'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
  _inherits(IndecisionApp, _React$Component);

  function IndecisionApp(props) {
    _classCallCheck(this, IndecisionApp);

    var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

    _this.removeAll = _this.removeAll.bind(_this);
    _this.handlePick = _this.handlePick.bind(_this);
    _this.addOption = _this.addOption.bind(_this);
    _this.removeOption = _this.removeOption.bind(_this);
    _this.state = {
      options: []
    };
    return _this;
  }

  _createClass(IndecisionApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      try {
        var json = localStorage.getItem('options');
        var options = JSON.parse(json);

        if (options) {
          this.setState(function () {
            return { options: options };
          });
        }
      } catch (error) {
        console.log('Not valid data');
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
        var json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
      }
    }
  }, {
    key: 'removeAll',
    value: function removeAll() {
      this.setState(function () {
        return { options: [] };
      });
    }
  }, {
    key: 'handlePick',
    value: function handlePick() {
      var randomNumber = Math.floor(Math.random() * this.state.options.length);
      var arr = document.querySelector(".options-list").getElementsByTagName("LI");
      for (var i = 0; i < arr.length; i++) {
        arr[i].style.background = "transparent";
      }
      arr[randomNumber].style.background = "#feca57";
    }
  }, {
    key: 'addOption',
    value: function addOption(option) {
      if (!option) {
        document.getElementById('option').focus();
        return 'Enter valid value to add item';
      } else if (this.state.options.indexOf(option) > -1) {
        document.getElementById('option').focus();
        return 'This option already exists';
      }
      this.setState(function (prevState) {
        return { options: prevState.options.concat([option]) };
      });
      document.getElementById('option').value = '';
      document.getElementById('option').focus();
    }
  }, {
    key: 'removeOption',
    value: function removeOption(optionToRemove) {
      this.setState(function (prevState) {
        return {
          options: prevState.options.filter(function (option) {
            return optionToRemove !== option;
          })
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var title = "Indecision App";
      var subtitle = "Put your life in the hands of a computer";
      return React.createElement(
        'div',
        { className: 'main' },
        React.createElement(Header, { title: title, subtitle: subtitle }),
        React.createElement(Action, {
          hasOptions: this.state.options.length > 0,
          handlePick: this.handlePick
        }),
        React.createElement(Options, {
          options_number: this.state.options,
          removeOption: this.removeOption
        }),
        React.createElement(AddOption, {
          hasOptions: this.state.options.length > 0,
          addOption: this.addOption,
          removeAll: this.removeAll })
      );
    }
  }]);

  return IndecisionApp;
}(React.Component);

var Header = function Header(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      props.title
    ),
    React.createElement(
      'h2',
      null,
      props.subtitle
    )
  );
};

var Action = function Action(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { id: 'btn-decision',
        onClick: props.handlePick,
        disabled: !props.hasOptions
      },
      'What should I do?...'
    )
  );
};

var Options = function Options(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'ol',
      { className: 'options-list' },
      props.options_number.map(function (current) {
        return React.createElement(Option, {
          key: current,
          optionText: current,
          removeOption: props.removeOption
        });
      })
    )
  );
};

var Option = function Option(props) {
  return React.createElement(
    'li',
    null,
    'Option: ',
    props.optionText,
    React.createElement(
      'a',
      {
        onClick: function onClick(e) {
          props.removeOption(props.optionText);
        } },
      React.createElement(
        'i',
        { className: 'material-icons' },
        'cancel'
      )
    )
  );
};

var AddOption = function (_React$Component2) {
  _inherits(AddOption, _React$Component2);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this2.addOption = _this2.addOption.bind(_this2);
    _this2.state = {
      error: undefined
    };
    return _this2;
  }

  _createClass(AddOption, [{
    key: 'addOption',
    value: function addOption(e) {
      e.preventDefault();

      var option = e.target.elements.option.value.trim();
      var error = this.props.addOption(option);
      this.setState(function () {
        return { error: error };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'form',
          { onSubmit: this.addOption },
          React.createElement('input', { id: 'option', type: 'text', name: 'option' }),
          React.createElement(
            'button',
            { id: 'btn-add' },
            'Add Option'
          )
        ),
        React.createElement(
          'button',
          { id: 'btn-remove',
            onClick: this.props.removeAll,
            disabled: !this.props.hasOptions
          },
          'Clear list'
        ),
        this.state.error && React.createElement(
          'p',
          { className: 'error' },
          this.state.error
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
