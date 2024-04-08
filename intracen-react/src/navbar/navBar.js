/* imports */
import "./GeneralBar"
import "../element/Element"



/* Hide general bar on scroll */
var prevScrollpos = window.scrollY;

window.onscroll = function() {
    var currentScrollPos = window.scrollY;

    if (prevScrollpos > currentScrollPos) {        
        if (document.getElementById("background_menu")) {
            document.getElementById("background_menu").style.top = '0';    
        }
        
        if (document.getElementById("div-main")) {
            document.getElementById("div-main").style.top = '5rem'    
        }        

        if (document.getElementById("div-element-bar")) {
            document.getElementById("div-element-bar").style.top = '8.5rem'    
        }        

    } else {      
        if (document.getElementById("background_menu")) {
            document.getElementById("background_menu").style.top = '-5rem';
        }

        if (document.getElementById("div-main")) {
            document.getElementById("div-main").style.top = '0rem'
        }
                
        if (document.getElementById("div-element-bar")) {
            document.getElementById("div-element-bar").style.top = '3.5rem'    
        }        
    }

    prevScrollpos = currentScrollPos;
}



