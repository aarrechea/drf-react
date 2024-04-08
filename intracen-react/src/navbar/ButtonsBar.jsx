/* Imports */
import React from "react";
import ButtonCss from "../components/Button";
import { getUser } from "../hooks/user.actions";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../hooks/user.actions";
import "../colors.css";
import "./buttonBar.css"



/* Buttons bar */
function ButtonsBar({click}) {
    /* Constants */
    const navigate = useNavigate();
    const userActions = useUserActions();     
    const user = getUser()    
    const style = {height:'2rem', backgroundColor: 'var(--brown_100)', fontSize: '1.1rem', borderWidth: '0'}
    

    /* Handle click */
    function handleClick(e) {        
        click(e);
    }
    
                

    /* Return */
    return (
        <>
            <div id="div-main">
                <div className="navbar" style={{padding:0}}>
                    <ButtonCss
                        onClick={handleClick}
                        children="Evaluations"
                        style={style}
                        value="Evaluations"
                    />

                    <ButtonCss                        
                        onClick={handleClick}
                        children="Companies"
                        style={style}
                        value="Companies"
                    />
                                            
                    {parseInt(user.user_type) < 3 
                        ?                            
                            <ButtonCss
                                onClick={handleClick}
                                children="Elements"
                                style={style}
                                value="Elements"
                            />
                        : null
                    }

                    {parseInt(user.user_type) === 1
                        ?
                            <>
                                <ButtonCss
                                    onClick={handleClick}
                                    children="Users"
                                    style={style}
                                    value="Users"
                                />
                                
                                <ButtonCss 
                                    onClick={handleClick}
                                    children="Administration"                                    
                                    style={style}
                                    value="Administration"
                                />
                            </>
                        : null
                    }

                    <ButtonCss 
                        onClick={() => userActions.logout()}                         
                        children="Logout"
                        style={style}                        
                    />

                    <ButtonCss
                        onClick={handleClick}
                        children="Reset password"
                        style={style}
                        value="Reset password"
                    />            
                </div>
            </div>        
        </>
    )
}



/* Exports */
export default ButtonsBar;







