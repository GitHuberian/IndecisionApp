'use strict';

//

var templateInfo = {
    name: 'Indecision APP',
    description: 'Put your life in the hands of a computer',
    options: ['Option One', 'Option Two']
};

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
    )
);

var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
