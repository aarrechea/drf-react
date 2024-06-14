/* Go backwards in the list of objects to find a type of element defined in 
    the variable 'type'.
*/
function fcnGoBackward(actualValue, table, type) {
    let letterArray = [];
    let x, letter, letter_display;

    for (x = actualValue - 1; x >= 0; x--) {
        if (parseInt(table[x].element_type) === type) {
            letter = table[x].letter;
            letter_display = table[x].letter_display;
            break;
        }
    }

    letterArray.push(x);
    letterArray.push(letter);
    letterArray.push(letter_display);

    return letterArray;
}

function fcnGoForward(tableLength, dataArray, table, type) {
    let counter = 1;    

    for (let j = dataArray[0]+1; j < tableLength; j++) {
        if (parseInt(table[j].element_type) === type) {
            table[j].capability_number = counter;
            table[j].letter = dataArray[1];
            table[j].letter_display = dataArray[2];
            counter += 1;
        } else {
            break;
        }
    }
}

/* Count competences in the table */
function fcnElementCount(table, type) {
    let count = 1


    console.log("new table in element count: " + JSON.stringify(table));

    if(Object.keys(table).length > 0){
        table.forEach(element => {
            if (parseInt(element['element_type']) === parseInt(type)) {
                count += 1;
            }
        });
    }

    return count;
}

/* Calculate percentages */
function fcnPercentage(count) {
    return Math.round(100 / count, 2)
}

/* Change percentage */
function fcnChangePercentage(table, type, percentage){
    if(Object.keys(table).length > 0){
        table.forEach(element => {
            if (parseInt(element['element_type']) === parseInt(type)) {
                element['percentage'] = percentage;
            }
        })    
    }    
}


/* Reorder the table if an element was inserted in between other elements */
function fcnReorderLetterTable(table, type, letters, actualValue, valueSelected) {        
    let counter = 1;
    let dataArray = [];

    console.log("Table lentgh inside reorder letter: " + JSON.stringify(table));

    const TABLE_LENGTH = Object.keys(table).length;
    

    // if it is competence, I reorder letters
    if (TABLE_LENGTH > 0) {
        table.forEach((row) => {

            console.log("Enter for each - row: " + JSON.stringify(row));
            console.log("type: " + type + " - counter: " + counter);
            console.log("letter in counter: " + letters);
            

            if (parseInt(type) === 1) {
                row['letter'] = counter;
                row['letter_display'] = letters[counter];
                counter += 1;
            } 
        })        
        

        //console.log("type: " + type + " - actual value: " + actualValue + " - length: " + TABLE_LENGTH);

        // If it is capability
        if (parseInt(type) === 2 && actualValue <= TABLE_LENGTH) {
            // Move backward to find the competence        
            dataArray = fcnGoBackward(actualValue, table, 1);

            // Move forward to assign letter and numbers to a type defined y the parameter
            fcnGoForward(TABLE_LENGTH, dataArray, table, 2);        

        } else if (actualValue === TABLE_LENGTH) {
            /* console.log("Enter actual value = tableLength");
            console.log("value selected: " + valueSelected + " - Actual value: " + actualValue);
            console.log("Table length: " + TABLE_LENGTH);
            console.log("table: " + JSON.stringify(table)); */
        }
    }
}



/* Exports */
export {
    fcnElementCount,
    fcnPercentage,
    fcnChangePercentage,
    fcnReorderLetterTable
}



