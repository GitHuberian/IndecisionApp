//JSX - Javascript XML

// var template = <p>Indecision APP</p>;
// var appRoot = document.getElementById('app');

// ReactDOM.render(template, appRoot);

var template = React.createElement("p", null, "Indecision APP");
var appRoot = document.getElementById('app');
ReactDOM.render(template, appRoot);