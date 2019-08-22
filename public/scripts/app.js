'use strict';

var templateInfo = {
    name: 'Indecision APP',
    description: 'Put your life in the hands of a computer',
    options: []
};

var onFormSubmit = function onFormSubmit(e) {
    e.preventDefault();

    var option = e.target.elements.option.value;
    if (option) {
        templateInfo.options.push(option);
        e.target.elements.option.value = '';
        templateRender();
    }
};

var removeAll = function removeAll() {
    templateInfo.options = [];
    templateRender();
};

var makeDecision = function makeDecision() {
    var randomNumber = Math.floor(Math.random() * templateInfo.options.length);
    console.log(randomNumber);
};

var appRoot = document.getElementById('app');
var templateRender = function templateRender() {
    var template = React.createElement(
        'div',
        null,
        React.createElement(
            'h2',
            null,
            templateInfo.name
        ),
        templateInfo.description && React.createElement(
            'p',
            null,
            templateInfo.description
        ),
        React.createElement(
            'p',
            null,
            templateInfo.options.length > 0 ? 'Here are your options' : 'No options'
        ),
        React.createElement(
            'button',
            { disabled: templateInfo.options.length === 0, onClick: makeDecision },
            'What should I do?'
        ),
        React.createElement(
            'ol',
            null,
            templateInfo.options.map(function (current) {
                return React.createElement(
                    'li',
                    { key: current },
                    current
                );
            })
        ),
        React.createElement(
            'form',
            { onSubmit: onFormSubmit },
            React.createElement('input', { type: 'text', name: 'option' }),
            React.createElement(
                'button',
                null,
                'Add Option'
            )
        ),
        React.createElement(
            'button',
            { disabled: templateInfo.options.length === 0, onClick: removeAll },
            'Remove All'
        )
    );
    ReactDOM.render(template, appRoot);
};

templateRender();
