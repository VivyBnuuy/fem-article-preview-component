"use strict";

// Get the classes to manipulate
let shareBtnElement = document.getElementsByClassName("card-bottom__share-container");
let shareNavBtnElement = document.getElementsByClassName("card-share__share-container");
let bottomElement = document.getElementsByClassName("card-bottom");
let shareElement = document.getElementsByClassName("card-share");

// Keep track of whether the share nav is toggled
let toggled = false;

// Add event listener to the share buttons on page load
function shareBtnListener() {
    shareBtnElement[0].addEventListener("click", shareNavToggle);
    shareNavBtnElement[0].addEventListener("click", shareNavToggle);
}

// Function to calculate rem values automatically
function rem($value) {
    return ($value / 16) + "rem";
}

// Adjust display of parts of the page if the screen changes from one layout to the other with share nav open
function checkResize() {
    let screenWidth = screen.width;

    if (screenWidth >= 740 && toggled == true) {
        bottomElement[0].style.display = "grid";
    } else {
        bottomElement[0].style.display = "none";
    }
}

function updateOnResize() {
    window.addEventListener("resize", checkResize);
}

document.onload = shareBtnListener(), updateOnResize();


// Toggle the share navigation 
function shareNavToggle() {
    let screenWidth = screen.width;
    const fullDesktopWidth = 900;
    const originalShareLeft = 81;

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
    let newShareLeft = originalShareLeft - ((fullDesktopWidth - screenWidth) / 2);

    if (toggled == false & screenWidth < 900 & screenWidth > 740) {
        toggled = true;

        shareElement[0].style.display = "grid";
        shareElement[0].style.left = newShareLeft + "px";

        // Adjust the position of the arrow under the element so it stays centered with the share button
        const shareWidth = shareElement[0].clientWidth;
        const arrowOriginalLeft = shareWidth / 2;
        let leftDifference = originalShareLeft - newShareLeft;
        let arrowNewLeft = arrowOriginalLeft  + leftDifference + "px";

        let shareStyle = document.createElement("style");
        shareStyle.innerHTML = '.card-share::after {content: ""; width: 0px; height: 0px; position: absolute; left: ' + arrowNewLeft + '; top: ' + rem(52) + '; border-left: ' + rem(12) + ' solid transparent; border-right: ' + rem(12) + ' solid transparent; border-top: ' + rem(12) + ' solid var(--dark-blue); border-bottom: ' + rem(12) + ' solid transparent; transform: translateX(-50%);}';
        document.head.appendChild(shareStyle);

    } else if (toggled == true & screenWidth < 900 & screenWidth > 740){
        toggled = false;

        shareElement[0].style.display = "none";
    }
}

// Removes the added style element 
function removeShareStyle() {
    while (document.head.children[9]) {
        document.head.children[9].remove();
    }
}