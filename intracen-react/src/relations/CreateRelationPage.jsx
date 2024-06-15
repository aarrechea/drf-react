/* Imports */
import React, { useState, useEffect, useRef } from "react";
import { ElementTable, FixedBar, NewTable, OptionBar } from "./CreateRelation";
import { fcnChangePercentage, fcnElementCount, fcnPercentage } from "./js/various";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import DataContext from "./store/DataContext";



/* Create relation page */
const CreateRelationPage = () => {
    //Datasets 
    const {data: choices} = useSWR("/element/get_choices/", fetcher, {
        refreshInterval: 10000,
    });


    // Variables
    let extendedRow = useRef({});
    let row = useRef({});


    /* States */
    const [originalRow, setOriginalRow] = useState({});
    const [newTable, setNewTable] = useState([]);    
    const [valueSelected, setValueSelected] = useState(0);
    const [actualValue, setActualValue] = useState(0);
    const [ordered, setOrdered] = useState(true);
    


    // Extended row takes the original row, and adds some additional data
    function createExtendedRow() {
        /* Variables */
        let percentageRow = 0;
        let order = 1
        let capability_number = 1;
        let process_number = 1;
        let tableLength = 0;
        let elementCount = 0;            
    
    
        // Constants
        const type = parseInt(originalRow.element_type);
    
    
        if(Object.keys(newTable).length > 0) {
            tableLength = Object.keys(newTable).length;
        }

        
        // Count competences in the new table
        elementCount = fcnElementCount(newTable, type);
    
        // Assign percentages to each competence depending on the counting
        percentageRow = fcnPercentage(elementCount);
        fcnChangePercentage(newTable, 1, percentageRow);
    
        // if the row needs to be inserted in the middle, I move the next elements
        // one position. If not (else), just assign valueSelected to order field.
        if (tableLength > 0 && actualValue < tableLength) {            
            for (let x = actualValue; x < tableLength; x++) {
                newTable[x].order = newTable[x].order + 1;
            }
    
            order = parseInt(actualValue) + 1;
            setOrdered(false); // to send the signal to be ordered
    
        } else {
            order = valueSelected;
        }    
    
        if (type === 1) {
            capability_number = "-";
            process_number = "-";
        } else if (type === 2) {
            process_number = "-"
        }

        return({
            percentage:percentageRow,
            order:order,
            capability_number:capability_number,
            process_number:process_number
        })
    }    

        
    if(Object.keys(originalRow).length > 0) {        
        extendedRow.current = createExtendedRow();
        row.current = {...originalRow, ...extendedRow.current};

        setNewTable(prevState => {
            return [{
                ...prevState,
                ...row.current
            }]
        });
    }
    
    
            
    console.log("row in relation page: " + JSON.stringify(row.current));
    console.log("new table in relation page: " + JSON.stringify(newTable));
    
    
    if (!choices) return <h2>Loading...</h2>

    /* Return */
    return (
        <DataContext.Provider value={newTable}>
            <FixedBar/>
            
            <OptionBar                 
                valueSelected={valueSelected} 
                setValueSelected={setValueSelected}
                setActualValue={setActualValue}
                //table={newTable}                
            />

            <ElementTable                
                setValueSelected={setValueSelected}
                setOriginalRow={setOriginalRow}
                //table={newTable}
            />
            
            <NewTable                
                valueSelected={valueSelected}
                actualValue={actualValue}
                setActualValue={setActualValue}
                ordered={ordered}
                setOrdered={setOrdered}
                //table={newTable}                
                row={row}
                choices={choices}
            />
        </DataContext.Provider>
    )
}



/* Exports */
export default CreateRelationPage;



