/* Imports */
import React, { useState } from "react";
import axiosService from "../helpers/axios";
import "./css/DeleteModal.css";



/* Delete modal */
const DeleteModal = ({showModal, setShowModal, elementToDelete, setElementDeleted}) => {
    /* States */
    const [deleted, setDeleted] = useState(false);


    /* Handle click to hide modal */
    const HandleClick = () => {        
        setShowModal(() => 'none');
        setDeleted(() => false);
    }


    /* Handle delete */
    const HandleDelete = () => {
        /* Axios */
        axiosService
            .delete(`/element/${elementToDelete.public_id}/`)

            .then((res) => {                                
                setElementDeleted(() => {
                    return {
                        edited:true,
                        name:res.data.name
                    }
                })

                setDeleted(() => true);
            })

            .catch((error) => {
                console.log("Error: " + error);
            });
    };
    
    

    /* Return */
    return (
        <div id="myModalDelete" class="modal-element-delete" style={{display:showModal}}>
            <div class="modal-content-delete">
                {deleted 
                ?
                    <label>The following element was succesfully deleted: </label>
                :
                    <label>The following element will be deleted: </label>
                }
                
                
                <div id="modal-content-title-delete">
                    <label>
                        {elementToDelete.element_type} - {elementToDelete.letter} - {elementToDelete.name}
                    </label>
                </div>

                {deleted
                ?
                    <div id="div-btn-delete-modal">
                        <button 
                            class="close-delete-modal" 
                            id="btn-close-delete-modal" 
                            onClick={HandleClick}>Close</button>                    
                    </div>
                :

                    <div id="div-btn-delete-modal">
                        <button 
                            class="close-delete-modal" 
                            id="btn-close-delete-modal" 
                            onClick={HandleClick}>Close</button>

                        <button
                            class="btn-delete-modal"
                            id="btn-close-delete-modal"
                            onClick={HandleDelete} style={{color:'red'}}>Delete</button>
                    </div>
                }                                
            </div>            
        </div>
    )
}



/* Exports */
export default DeleteModal;



