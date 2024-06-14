/* Imports */
import React from "react";
import { fetcher } from "../helpers/axios";
import useSWR from "swr";
import "./css/relationsList.css";
import { useNavigate } from "react-router-dom";



/* Relation list */
function RelationList() {
    /* Hooks */
    const navigate = useNavigate();

    /* Constants */
    const {relationList, error} = useSWR("/relations/", fetcher);

    if (error) {
        console.log("Error in RelationList fetcher: " + error);
        navigate("/");
    }
    
    //console.log("Relation list: " + JSON.stringify(relationList));


    /* Return */
    return (
        <div id="divRelationList">
            <h3>List of relationship</h3>

            {!relationList || relationList.data.length === 0
                ? 
                    <h6 style={{marginTop:'3rem'}}>The list is empty</h6>
                :
                    null
            }
        </div>
    )
}



/* Exports */
export default RelationList;



