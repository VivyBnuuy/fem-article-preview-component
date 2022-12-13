"use strict";

// Get the classes to manipulate
let shareBtnElement = document.getElementsByClassName("card-bottom__share-container");
let shareNavBtnElement = document.getElementsByClassName("card-share__share-container");
let bottomElement = document.getElementsByClassName("card-bottom");
let shareElement = document.getElementsByClassName("card-share");

// Function to calculate rem values automatically for css modifications
function rem($value) {
    return ($value / 16) + "rem";
}

// Keep track of whether the share nav is toggled
let toggled = false;

// Add event listener to the share buttons
function shareBtnListener() {
    shareBtnElement[0].addEventListener("click", shareNavToggle);
    shareNavBtnElement[0].addEventListener("click", shareNavToggle);
}

// Adjust display of the article author depending on the screen width when the share nav is open
function checkResize() {
    let screenWidth = screen.width;

    if (screenWidth >= 740 && toggled == true) {
        bottomElement[0].style.display = "grid";
        
        newShareLeft = originalShareLeft - ((fullDesktopWidth - screenWidth) / 2);

        if (newShareLeft >= 81) {
            shareElement[0].style.left = 81 + "px";

        } else {
            removeShareStyle()
            shareElement[0].style.display = "grid";
            shareElement[0].style.left = newShareLeft + "px";

            adjustNavArrow();
        }

    } else if (screenWidth < 740 && toggled == false){
        bottomElement[0].style.display = "grid";

    } else if (screenWidth < 740 && toggled == true){
        bottomElement[0].style.display = "none";
        removeShareStyle();
    }
}

// Add event listener to window
function updateOnResize() {
    window.addEventListener("resize", checkResize);
}

// Run event listener functions on load
document.onload = shareBtnListener(), updateOnResize();


// Toggle the share navigation 
let screenWidth;
let newShareLeft;
const fullDesktopWidth = 900; // This is how wide a screen needs to be for the share nav to display without overflow
const originalShareLeft = 81; // This is the default left value for the share nav position in desktop

function shareNavToggle() {
    screenWidth = screen.width;

    // Remove added style element so that the tooltip's arrow shows up in the right place
    removeShareStyle();

    // Toggle for mobile layout
    if (toggled == false & screenWidth < 740) {
        toggled = true;

        bottomElement[0].style.display = "none";
        shareElement[0].style.display = "grid";
        
    } else if (toggled == true & screenWidth < 740) {
        toggled = false;

        bottomElement[0].style.display = "grid";
        shareElement[0].style.display = "none";
    }

    // Toggle for desktop layout, when there is enough room for overflowing tooltip
    if (toggled == false & screenWidth >= 900) {
        toggled = true;

        shareElement[0].style.left = "81px";
        shareElement[0].style.display = "grid";

    } else if (toggled == true & screenWidth >= 900){
        toggled = false;

        shareElement[0].style.display = "none";
    }

    // Toggle for desktop layout, when width is between 740 and 900px
    newShareLeft = originalShareLeft - ((fullDesktopWidth - screenWidth) / 2);

    if (toggled == false & screenWidth < 900 & screenWidth > 740) {
        toggled = true;

        shareElement[0].style.display = "grid";
        shareElement[0].style.left = newShareLeft + "px";

        adjustNavArrow();

    } else if (toggled == true & screenWidth < 900 & screenWidth > 740){
        toggled = false;

        shareElement[0].style.display = "none";
    }
}

// Adjusts the position of the arrow under the element so it stays centered with the share button
function adjustNavArrow() {
    const arrowOriginalLeft = shareElement[0].clientWidth / 2;
    let leftDifference = originalShareLeft - newShareLeft;
    let arrowNewLeft = arrowOriginalLeft  + leftDifference + "px";

    // Add a style element to the head to adjust the arrow position for the share nav depending on screen width
    let shareStyle = document.createElement("style");
    shareStyle.innerHTML = 
    '.card-share::after {content: ""; width: 0px; height: 0px; position: absolute; left: ' 
    + arrowNewLeft + '; top: ' + rem(52) + '; border-left: ' + rem(12) + ' solid transparent; border-right: '
    + rem(12) + ' solid transparent; border-top: ' + rem(12) + ' solid var(--dark-blue); border-bottom: ' 
    + rem(12) + ' solid transparent; transform: translateX(-50%);}';

    document.head.appendChild(shareStyle);
}

// Removes the added style element from head when it isn't needed 
function removeShareStyle() {
    while (document.head.children[9]) {
        document.head.children[9].remove();
    }
}