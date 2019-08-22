const templateInfo ={
    name : 'Indecision APP',
    description: 'Put your life in the hands of a computer',
    options: []
};

const onFormSubmit = (e) => {
    e.preventDefault();

    const option = e.target.elements.option.value;
    if(option){
        templateInfo.options.push(option);
        e.target.elements.option.value = '';
        templateRender();
    }
    
};

const removeAll = () =>{
    templateInfo.options = [];
    templateRender();
};

const appRoot = document.getElementById('app');
const templateRender = () => {
    const template =(
        <div>
            <h2>{templateInfo.name}</h2> 
            {templateInfo.description && <p>{templateInfo.description}</p>}
            <p>{templateInfo.options.length > 0 ? 'Here are your options' : 'No options'}</p>
            
            <ol>
                {
                 templateInfo.options.map((current) => {
                    return <li key={current}>{current}</li>
                })
                }
            </ol>
            <button onClick={removeAll}>Remove All</button>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        </div>);
        ReactDOM.render(template, appRoot);
};

templateRender();