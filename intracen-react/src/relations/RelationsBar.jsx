/* Imports */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/relationBar.css";



/* Relations bar */
const RelationsBar = () => {
    /* States */
    const navigate = useNavigate();



    /* Return */
    return (
        <div id="divRelationBarFixed">
            <div id="divRelationBar">
                <button onClick={() => navigate('/create-relation')}>Create<br/>relation</button>                
                <h3>Relationship Tree</h3>
            </div>
        </div>
    )
}



/* Exports */
export default RelationsBar;




