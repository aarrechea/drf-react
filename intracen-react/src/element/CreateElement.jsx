/* Imports */
import React, {useRef} from "react";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { useNavigate } from "react-router-dom";



/* Fixed bar */
const FixedBar = ({click, submit, children}) => {
    /* Constants */
    const navigate = useNavigate();


    /* Handle click */
    function HandleClick(e) {
        let radioValue = 1;

        if(e.target.title === 'Competence') {
            radioValue = 1;
        } else if (e.target.title === 'Capability') {
            radioValue = 2;
        } else {
            radioValue = 3;
        }

        click(e, radioValue);
    }
    

    /* Return */
    return (
        <div id="fixed-bar">
            <div id="div-inner-bar">
                <button id="btn-create" className="btn-fixed-bar" onClick={submit}>{children}</button>

                <div>                        
                    <div id="div-radio">
                        <button
                            className= "btn-type btn-fixed-bar"
                            htmlFor="competence" 
                            title="Competence" 
                            onClick={HandleClick}
                        >
                            Competence
                        </button>

                        <button
                            className="btn-type btn-fixed-bar"
                            htmlFor="capability" 
                            title="Capability" 
                            onClick={HandleClick}
                        >
                            Capability
                        </button>

                        <button 
                            className="btn-type btn-fixed-bar"
                            htmlFor="process" 
                            title="Process" 
                            onClick={HandleClick}
                        >
                            Process
                        </button>

                        <input value="1" type="radio" name="type" id="competence"/>
                        <input value="2" type="radio" name="type" id="capability" />
                        <input value="3" type="radio" name="type" id="process" />
                    </div>                        
                </div>

                <button className="btn-fixed-bar">Clean<br/>fields</button>
                <button className="btn-fixed-bar">Reset<br/>fields</button>
                <button className="btn-fixed-bar" onClick={() => navigate(-1)}>Previous<br/>page</button>
            </div>
        </div>
    )
}


/* Element name */
const ElementName = ({focus, blur, input, name}) => {
    /* Return */
    return (
        <input             
            type="text" 
            name="elementName" 
            id="elementName"
            className="elementToSend txtToClean" // to create an element
            maxLength={39}
            onFocus={focus}
            onBlur={blur}            
            onInput={input}
            data-name='name'
            value={name}
        />
    )
}


/* Element comment */
const ElementComment = ({focus, blur, input, comments}) => {
    return (
        <textarea 
            className="elementToSend txtToClean" 
            id="txt-create-comments-element"
            maxLength={255}
            onFocus={focus}
            onBlur={blur}            
            onInput={input}
            data-name='comments'
            value={comments}
        ></textarea>
    )
}


/* Select letter */
const SelectLetter = ({letter}) => {
    /* Fetching letter and element type choices */
    const {data, error, isLoading} = useSWR("/element/get_choices/", fetcher);
            

    /* Early returns */
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    

    /* Return */
    return (                       
        <select 
            className="elementToSend" 
            id="select-letter-create-element"
            value={letter}
        >
            {Object.entries(data.letters).map(([key, value], index) => (
                <option 
                    key={index} 
                    value={key}
                >
                    {value}
                </option>
            ))}
        </select>
    )
}    


/* Definitions, symptoms and questions */
const Definitions = ({defSymQue, focus, blur, input, lblDefinitions, txtDefinitions, setTxtDefinitions}) => {
    /* Use ref */    
    const radioDef = useRef();    
    const textArea = useRef(null);
                    
        
    /* Handle focus */    
    const HandleFocus = (e) => {
        const target = e.target.id;
                            
        defSymQue[defSymQue['radioChecked']] = textArea.current.value;
        defSymQue['radioChecked'] = target;
        
        setTxtDefinitions(() => defSymQue[target]);
        textArea.current.focus();
    }        
    
    
    /* Return */
    return (
        <div id="div-definitions">
            <div>
                <label 
                    id="lblDefinitions" 
                    htmlFor="definitions" 
                    data-id='definitions'
                    data-blur='def'
                    onFocus={lblDefinitions}
                >Definitions</label>

                <label 
                    id="lblSymptoms" 
                    htmlFor="symptoms" 
                    data-id='symptoms'
                    data-blur='def'
                    onFocus={lblDefinitions}
                >Symptoms</label>
                
                <label 
                    id="lblQuestions" 
                    htmlFor="questions" 
                    data-id='questions'
                    data-blur='def'
                    onFocus={lblDefinitions}
                >Questions</label>
                
                <input
                    type="radio"
                    name="definitions"
                    id="definitions"
                    data-id='definitions'
                    data-blur='def'
                    className="radio-def"
                    defaultChecked                    
                    ref={radioDef}
                    value={1}
                    onFocus={HandleFocus}/>

                <input 
                    type="radio" 
                    name="definitions" 
                    id="symptoms" 
                    data-id='symptoms' 
                    data-blur='def'
                    className="radio-def" 
                    onFocus={HandleFocus}/>

                <input 
                    type="radio" 
                    name="definitions" 
                    id="questions" 
                    data-id='questions' 
                    data-blur='def'
                    className="radio-def" 
                    onFocus={HandleFocus}/>
            </div>

            <div>
                <textarea 
                    ref={textArea}
                    className="txtDef txtToClean" 
                    id="txtDef"
                    data-id="definitions" 
                    data-blur='def'
                    data-name='definitions'
                    maxLength={2000}
                    onFocus={focus}
                    onBlur={blur}
                    onInput={input}
                    value={txtDefinitions}
                ></textarea>
            </div>
        </div>
    )    
}


/* Assess */
const Assess = ({assess, setAssess, assessInput, setAssessInput, blur, focus, input, textAssess, setTextAssess}) => {
    /* Refs */
    const radioOne = useRef();    
    const txtAssess = useRef();    

        
    /* Handle focus */
    function HandleFocus(e) {
        const target = e.target.id;        
        
        setAssess({...assess, [assessInput]:txtAssess.current.value});
        setAssessInput(target);

        setTextAssess(() => assess[target])
        txtAssess.current.focus();        
    }


    /* Return */
    return (
        <div id="div-assess">
            <div>
                <label id="lblAssessOne" htmlFor="assessOne">Assess one</label>
                <label id="lblAssessTwo" htmlFor="assessTwo">Assess two</label>
                <label id="lblAssessThree" htmlFor="assessThree">Assess three</label>
                <label id="lblAssessFour" htmlFor="assessFour">Assess four</label>
                <label id="lblAssessFive" htmlFor="assessFive">Assess five</label>

                <input 
                    type="radio" 
                    name="assess" 
                    id="assessOne" 
                    defaultChecked 
                    ref={radioOne} 
                    onFocus={HandleFocus}
                    value={1} 
                />
                <input type="radio" name="assess" id="assessTwo" onFocus={HandleFocus} />
                <input type="radio" name="assess" id="assessThree" onFocus={HandleFocus} />
                <input type="radio" name="assess" id="assessFour" onFocus={HandleFocus} />
                <input type="radio" name="assess" id="assessFive" onFocus={HandleFocus} />
            </div>

            <div>
                <textarea 
                    ref={txtAssess} 
                    id="txtAssess"
                    className="txtAssess txtToClean"
                    data-blur='assess'
                    assess={assess}
                    onBlur={blur}
                    onInput={input}
                    onFocus={focus}
                    maxLength={1000}
                    value={textAssess}
                ></textarea>
            </div>
        </div>
    )    
}



/* Exports */
export {
    SelectLetter,
    FixedBar,
    ElementName,
    ElementComment,
    Definitions,
    Assess
}

