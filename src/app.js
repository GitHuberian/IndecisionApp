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

const makeDecision = () =>{
    const randomNumber = Math.floor(Math.random() * templateInfo.options.length);
    let arr = document.querySelector(".options-list").getElementsByTagName("LI");
    for(let i = 0; i<arr.length; i++){
        arr[i].style.background = "transparent";
    } 
    arr[randomNumber].style.background = "#feca57";
    
};

const appRoot = document.getElementById('app');
const templateRender = () => {
    const template =(
        <div>
            <h2>{templateInfo.name}</h2> 
            {templateInfo.description && <p>{templateInfo.description}</p>}
            <p>{templateInfo.options.length > 0 ? 'Here are your options' : 'No options'}</p>
            <button id="btn-decision" disabled={templateInfo.options.length === 0} onClick={makeDecision}>What should I do?</button>
            <ol className="options-list">
                {
                 templateInfo.options.map((current) => {
                    return <li key={current}>{current}</li>
                })
                }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button id="btn-add">Add Option</button>
            </form>
            <button id="btn-remove" disabled={templateInfo.options.length === 0} onClick={removeAll}>Remove All</button>
        </div>);
        ReactDOM.render(template, appRoot);
};

templateRender();