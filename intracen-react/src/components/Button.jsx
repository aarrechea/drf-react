/* Imports */
import "./button.css"



/* Button */
const ButtonCss = ({children, style, onClick, value}) => {
    return (
        <button 
            onClick={onClick} 
            className="buttonCss" 
            style={style}
            value={value}
        >
            {children}
        </button>
    );
}


/* Exports */
export default ButtonCss;



