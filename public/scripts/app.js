'use strict';

var templateInfo = {
    name: 'Indecision APP',
    description: 'Put your life in the hands of a computer',
    options: ['Option One', 'Option Two']
};

var count = 0;
var addOne = function addOne() {
    count++;
    renderCounterApp();
};

var minusOne = function minusOne() {
    count--;
    renderCounterApp();
};

var reset = function reset() {
    count = 0;
    renderCounterApp();
};

var appRoot = document.getElementById('app');

var renderCounterApp = function renderCounterApp() {
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
            'ol',
            null,
            React.createElement(
                'li',
                null,
                'One'
            ),
            React.createElement(
                'li',
                null,
                'Two'
            )
        ),
        React.createElement(
            'div',
            null,
            React.createElement(
                'h3',
                null,
                'Count: ',
                count
            ),
            React.createElement(
                'button',
                { onClick: addOne, className: 'button' },
                '+1'
            ),
            React.createElement(
                'button',
                { onClick: minusOne, className: 'button' },
                '-1'
            ),
            React.createElement(
                'button',
                { onClick: reset, className: 'button' },
                'RESET'
            )
        )
    );
    ReactDOM.render(template, appRoot);
};

renderCounterApp();
