/* Imports */
import React, {useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonCss from "../components/Button";
import { getUser } from "../hooks/user.actions";
import { useUserActions } from "../hooks/user.actions";
import "../colors.css";
import "./buttonBar.css"
import { onClickBtnMainMenu } from "./navBar";



/* Buttons bar */
function ButtonsBar({click}) {
    /* Constants */    
    const userActions = useUserActions();     
    const user = getUser()    
    const style = {height:'2rem', backgroundColor: 'var(--brown_100)', 
                    fontSize: '1.0rem', borderWidth: '0', textAlign:'center'};
    const navigate = useNavigate();
    const location = useLocation();
            
    
    /* Use Effect */
    useEffect(() => {        
        onClickBtnMainMenu(location.pathname);
    })
        
    

    /* Return */
    return (
        <>
            <div id="div-main" style={{top:'4rem'}}>
                <div className="navbar" style={{padding:0}}>
                    <ButtonCss
                        onClick={() => navigate('/evaluations')}
                        children="Evaluations"
                        style={style}
                        value="Evaluations"                        
                    />
                    
                    <ButtonCss                        
                        children="Companies"
                        style={style}
                        value="Companies"
                        className='btnMainMenu'
                    />
                                            
                    {parseInt(user.user_type) < 3 
                        ?   
                            <>
                                <ButtonCss
                                    onClick={() => navigate('/relation-page')}
                                    children="Relations"
                                    style={style}                                    
                                    value="Relations"
                                    dataPage="/relation-page"
                                    className='btnMainMenu'
                                />                         

                                <ButtonCss
                                    onClick={() => navigate('/element')}
                                    children="Elements"
                                    style={style}
                                    value="Elements"
                                    dataPage='/element'
                                    className='btnMainMenu'
                                />
                            </>                            
                        : null
                    }

                    {parseInt(user.user_type) === 1
                        ?
                            <>
                                <ButtonCss                                    
                                    children="Users"
                                    style={style}
                                    value="Users"
                                    className='btnMainMenu'
                                />
                                
                                <ButtonCss                                     
                                    children="Administration"                                    
                                    style={style}
                                    value="Administration"
                                    className='btnMainMenu'
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







