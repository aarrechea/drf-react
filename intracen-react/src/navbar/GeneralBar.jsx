/* Imports */
import React from "react";
import { getUser } from "../hooks/user.actions";
import "../colors.css"
import "./generalBar.css"



/* General bar */
function GeneralBar({menu}) {
    return (
        <div id="background_menu">
            <div id="bar_menu">
                <h3>SME-AS</h3>

                <div id="user_identification">
                    { getUser()
                        ?
                            <>
                                <h6 style={{color:'grey'}}>User</h6>
                                <h4>{getUser().email}</h4>
                            </>
                        :
                            <>
                                <h6 style={{color:'gray'}}>User</h6>
                                <h4>Anonymous</h4>
                            </>
                    }
                </div>
                
                <div>
                    <h6 style={{color:'grey'}}>Menu</h6>
                    <h4 id="title">{menu}</h4>
                </div>
            </div>
      </div>
    )
}



/* Export */
export default GeneralBar;