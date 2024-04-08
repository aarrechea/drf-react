/* Imports */
import React, { useState } from "react";
import GeneralBar from "./GeneralBar";
import ButtonsBar from "./ButtonsBar"
import "./navBar"



/* Navigation bar */
function Navigationbar() {
    /* States */
    const [menu, setMenu] = useState("Elements");


    /* handle click */
    function handleClick(e) {        
        setMenu(e.target.value);
    }


    /* Return */
    return (
        <>
            <GeneralBar menu={menu}/>
            <ButtonsBar click={handleClick}/>
        </>    
    );
}



/* Exports */
export default Navigationbar;





