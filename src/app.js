//

const templateInfo ={
    name : 'Indecision APP',
    description: 'Put your life in the hands of a computer',
    options: ['Option One', 'Option Two']
};

let template = (
    <div>
        <h2>{templateInfo.name}</h2> 
        {templateInfo.description && <p>{templateInfo.description}</p>}
        <p>{templateInfo.options.length > 0 ? 'Here are your options' : 'No options'}</p>
        <ol>
            <li>One</li>
            <li>Two</li>
        </ol>
    </div>);

let appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);