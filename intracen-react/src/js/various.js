/* Count characters
    x: html element
    cantidad: max length property or the html element
    elementName: html element that count characters and will be modified
    origin: name of the event that triggers the function
*/
function countChar(x, cantidad, elementName, origin) {

    console.log("Enter countChar.js");

    if (origin === 'onChange') {
        document.getElementById(elementName).innerHTML = cantidad - x.value.length;
    } else {
        document.getElementById(elementName).innerHTML = cantidad - x.value.length;
    }
    
}


function countCharFocus(txtId, cantidad, idLabel, cadena)
{        
    var caracteres = cantidad - document.getElementById(txtId).value.length;
    
    document.getElementById(idLabel).innerHTML = cadena + " (" + caracteres  + ")";    
}


/* Count rows and characters
    x: html element
    elementName: label or span containing the characters count
    origin: name of the event that triggers the function
*/
function countCharAndRows(x, maxChar, maxRows, charPerRows, elementName, origin)
{           
    const text = x.value;
    const vector = text.split("\n"); 
    
    if (origin === 'keyUp') {
        let lines = vector.length; // Cantidad de líneas por presión de tecla "Enter"
        let i;                        

        for (i = 0; i < vector.length; i++) {            
            if(vector[i].length > charPerRows) {                                
                lines = lines + Math.floor(vector[i].length / charPerRows);                
            }
        }
                                                                                                                                                                        
        if(lines > maxRows) {

            console.log("Enter if - innerHtml: " + document.getElementById(elementName).innerHTML);

            let caracteres = x.value.length - 1;
            let texto = x.value;

            x.value = texto.substring(0, caracteres);
            document.getElementById(elementName).innerHTML = (maxChar - x.value.length);

        } else {            
            elementName.current = (maxChar - x.value.length);


            console.log("element.current: " + elementName.current);
        }
    }        
}  


function checkMaxRows(x, maxChar, maxRows, charPerRows)
{
    var nombre = x.id;
    var elemento = document.getElementById(nombre);                
    var text = document.getElementById(nombre).value;                
    var vector = text.split("\n");                        
    var lines = vector.length; // Cantidad de líneas por presión de tecla "Enter"
    var i;
            
    for (i = 0; i < vector.length; i++) 
    {            
        if(vector[i].length > charPerRows)
        {                                
            lines = lines + Math.floor(vector[i].length / charPerRows);                
        }
    }
                                
    if(lines > maxRows)
    {
        var caracteres = document.getElementById(nombre).value.length - 1;
        var texto = document.getElementById(nombre).value;                
        document.getElementById(nombre).value = texto.substring(0, caracteres);
        document.getElementById("lblCaracteres").innerHTML = (maxChar - elemento.value.length) + " characters " + 0 + " rows";                                   
    }
}


function countRowsAndCharsOnFocus(x, maxChar, maxRows, charPerRows, lblId)
{                               
    var nombre = x.id;
    var text = document.getElementById(nombre).value;                
    var vector = text.split("\n");                        
    var lines = vector.length; // Cantidad de líneas por presión de tecla "Enter"
    
    var i;
            
    for (i = 0; i < vector.length; i++) 
    {            
        if(vector[i].length > charPerRows)
        {                                
            lines = lines + Math.floor(vector[i].length / charPerRows);                
        }
    }
                                                                                                                                                                    
    if(lines > maxRows)
    {
        var caracteres = document.getElementById(nombre).value.length - 1;
        var texto = document.getElementById(nombre).value;                            
        document.getElementById(nombre).value = texto.substring(0, caracteres);
        document.getElementById(lblId).innerHTML = "Comments (" + (maxChar - document.getElementById(nombre).value.length) + " characters " + 0 + " rows)";
    }
    else
    {                                    
        document.getElementById(lblId).innerHTML = "Comments (" + (maxChar - document.getElementById(nombre).value.length) + " characters " + (maxRows - lines) + " rows)";
    }
}



/* Exports */
export {
    countChar,
    countCharAndRows
}









