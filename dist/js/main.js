"use strict";

// Get the classes to manipulate
let shareBtnElement = document.getElementsByClassName("card-bottom__share-container");
let shareNavBtnElement = document.getElementsByClassName("card-share__share-container");
let bottomElement = document.getElementsByClassName("card-bottom");
let shareElement = document.getElementsByClassName("card-share");

// Add event listener to the share buttons on page load
function shareBtnListener() {
    shareBtnElement[0].addEventListener("click", shareNavToggle);
    shareNavBtnElement[0].addEventListener("click", shareNavToggle);
}

document.onload = shareBtnListener();

// Toggle the share navigation 
let toggled = false;

function shareNavToggle() {
    if (toggled == false) {
        toggled = true;

        bottomElement[0].style.display = "none";
        shareElement[0].style.display = "grid";
        
    } else {
        toggled = false;

        bottomElement[0].style.display = "grid";
        shareElement[0].style.display = "none";
    }
}