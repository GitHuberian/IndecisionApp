const templateInfo ={
    name : 'Indecision APP',
    description: 'Put your life in the hands of a computer',
    options: ['Option One', 'Option Two']
};

let count = 0;
const addOne = () =>{
    count++;
    renderCounterApp();
};

const minusOne = () =>{
    count--;
    renderCounterApp();
};

const reset = () =>{
    count=0;
    renderCounterApp();
};

const appRoot = document.getElementById('app');



const renderCounterApp = () => {
    const template = (
        <div>
            <h2>{templateInfo.name}</h2> 
            {templateInfo.description && <p>{templateInfo.description}</p>}
            <p>{templateInfo.options.length > 0 ? 'Here are your options' : 'No options'}</p>
            <ol>
                <li>One</li>
                <li>Two</li>
            </ol>
            <div>
                <h3>
                    Count: {count}
                </h3>
                <button onClick={addOne} className="button">
                    +1
                </button>
                <button onClick={minusOne} className="button">
                    -1
                </button>
                <button onClick={reset} className="button">
                    RESET
                </button>
            </div>
        </div>);
        ReactDOM.render(template, appRoot);
};

renderCounterApp();