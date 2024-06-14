/* Imports */
import React, { useEffect, useState, useMemo, useRef } from "react";
import "./css/createRelation.css";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import axiosService from "../helpers/axios";
import {useTable} from "react-table";
import { fcnReorderLetterTable } from "./js/various";
import DataContext from "./store/DataContext";
import { useContext } from "react";



/* Fixed bar */
const FixedBar = () => {
    /* Hooks */
    const navigate = useNavigate();


    /* Return */
    return (
        <div id="createRelationFixedBar">
            <div id="createRelationInnerBar">
                <button>Create</button> 
                <button onClick={() => navigate(-1)}>Previous<br/>Page</button>
            </div>            
        </div>
    )
}


/* Option bar */
const OptionBar = (valueSelected, setValueSelected, setActualValue) => {
    // Data context
    const { table } = useContext(DataContext);
     

    /* Variables */        
    let arr = [0];
    let tableLength = 0;

    
    /* Constants */
    if(table) {
        tableLength = Object.keys(table);
    }
    
    
    /* Refs */
    const selectRef = useRef();


    /* Fetching the data */    
    const {data: choices} = useSWR("/element/get_choices/", fetcher, {
        refreshInterval: 10000,
    });    

            
    // loop over the number of elements of the table to define the options
    // in the select index plus the zero value.        
    for (let i = 1; i <= tableLength.length; i++) {            
        arr.push(i);
    }        
    
    
    function HandleSelectChange() {
        setValueSelected(selectRef.current.value);
        setActualValue(selectRef.current.value);
    }

    

    /* Early returns */
    //if (error) return <h1>Something went wrong!</h1>
    if (!choices) return <h1>Loading...</h1>


    /* Return */
    return (
        <div id="optionBarFixed">
            <div id="optionBarFixedInner">
                <select name="" id="select-type">
                    <option value="0">All elements</option>

                    {Object.entries(choices.type).map(([key, value], index) => (
                        <option key={index} value={key}>{value}</option>
                    ))}
                </select>

                <select name="" id="select-letter">
                    <option value="0">All</option>

                    {Object.entries(choices.letters).map(([key, value], index) => (
                        <option key={index} value={key}>{value}</option>
                    ))}
                </select>
                
                <div id="divSelectIndex">
                    <p>Insert after row</p>
                    <select onChange={HandleSelectChange} ref={selectRef} value={valueSelected}>
                        {Object.entries(arr).map(([key, value], index) => (
                            <option                            
                                key={index} value={key}>{value}
                            </option>
                        ))}
                    </select>
                </div>
                
                <p id="paraText" style={{textAlign:"center"}}>(Click on the row to insert)</p>                
            </div>
        </div>
    )
}


/* Elements table to create a relation */
const ElementTable = (props) => {
    // Data context
    const {table} = useContext(DataContext);


    // Props
    const {setValueSelected, setOriginalRow} = props;


    /* States */
    const [data, setData] = useState([]);
    const [hideRows, setHideRows] = useState([]);
        

    /* Get the data */
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        try {
            axiosService
                .get(`/element`)                
                .then((res) => {                     
                    setData(res.data);
                }) 

        } catch (error) {
            console.error("Error fetching data: ", error);
        }        
    }
        

    /* Construct the table */
    const columns = useMemo(() => [
        { Header: 'Letter', accessor: 'letter_display' }, // This is a column object
        { Header: 'Type', accessor: 'element_type_display' },
        { Header: 'Name', accessor: 'name' },
    ], []);

    const tableInstance = useTable({ columns, data });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
        
    
    const HandleRowClicked = (row) => {
        setOriginalRow(row.original)
        setHideRows([...hideRows, row.id])
        setValueSelected(Object.keys(table).length + 1);
    }



    /* Return */
    return (
        <>
            <div id="divTableElements">
                <table {...getTableProps()}>
                    <thead id="tableElementsHeader">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody id="tableElementsBody" {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr style={{display: hideRows.includes(row.id) ? "none" : "table-row"}}
                                    onClick={() => HandleRowClicked(row)} 
                                    {...row.getRowProps()}>
                                        {row.cells.map(cell => (                                        
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>                                        
                                        ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>                
            </div>
        </>        
    )
}


/* New relation table */
const NewTable = (props) => {
    // Data context
    const newTable = useContext(DataContext);


    // Props
    const {ordered, setOrdered, actualValue, choices, row,
        setActualValue, valueSelected} = props;


    // Variables
    let data = [];

    
    // I am not put ordered in true because I need a false flag later on
    if(!ordered && newTable.length > 0) {
        newTable.sort((a, b) => a.order - b.order);
        setOrdered(true);           
    }    
    
    console.log("row inside new table: " + JSON.stringify(row));
    console.log("table outside reorder letter: " + JSON.stringify(newTable));
    
    if(row){
        fcnReorderLetterTable(
            newTable,
            row.element_type,
            choices?.letters,
            actualValue,
            valueSelected,
        );
        
        setActualValue(valueSelected);
    }

    console.log("new table before ...data: " + JSON.stringify(newTable));

    //Constructing the table
    if(Object.keys(newTable).length > 0){
        data = [...newTable];    
    }
    
        
    //console.log("Data: " + JSON.stringify(data));

    const columns = useMemo(() => [
        { Header: 'Order', accessor: 'order' }, // This is a column object
        { Header: 'Letter', accessor: 'letter_display' },
        { Header: 'Capability number', accessor: 'capability_number' },
        { Header: 'Process number', accessor: 'process_number' },
        { Header: 'Name', accessor: 'name' },
        { Header: '%', accessor: 'percentage' },
        { Header: 'Action', accessor: 'action' }
    ], []);

    const tableInstance = useTable({ columns, data });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
        
    
    
    // Return 
    return (
        <>
            <div id="divNewTableTitle">
                <h3>New relationship</h3>

                <div id="divNewTableName">
                    <label htmlFor="">Relationship Name</label>
                    <textarea name="" rows={2} maxLength={100} id=""></textarea>
                </div>

                <button>Remove all<br/>elements</button>
            </div>

            <div id="divNewTable">
                <table>
                    <thead id="newTableHeader">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>                    

                    <tbody id="newTableBody">
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}>
                                    {row.cells.map(cell => (                                        
                                        <td                                             
                                            {...cell.getCellProps()}>{cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )   
}



/* Exports */
export {
    FixedBar,
    OptionBar,
    ElementTable,
    NewTable    
}

