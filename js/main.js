/*jslint browser:true */
"use strict";

// addMonths Function
function addMonths (elem) {
    var annualUseKw = 0, dailyUseKw = 0, i = 0, x = 0; // four variables
    var months = document.getElementById(elem).getElementsByTagName ('input');


        for (i = 0; i < months.length; i ++) {
            x = Number(months[i].value); // [array], convert to Number
            annualUseKw += x;
        }
        dailyUseKw = annualUseKw / 365;
        return dailyUseKw; // returns total value and will assign it to the var dailyUseKw
} 

// SunHours Function
function sunHours() {

    var hrs;
    var theZone = document.forms.solarForm.zone.selectedIndex; 
    theZone += 1;
    
    switch(theZone) {
        case 1:
            hrs = 6;
            break;
        case 2:
            hrs = 5.5;
            break;
        case 3:
            hrs = 5;
            break;
        case 4:
            hrs = 4.5;
            break;
        case 5:
            hrs = 4.2;
            break;
        case 6:
            hrs = 3.5;
            break;
        default:
            hrs = 0;
    }
    return hrs;
} 

// Calculate Panel Function
function calculatePanel() {
    var userChoice = document.forms.solarForm.panel.selectedIndex; // gets input from user ?? watts
    var panelOptions = document.forms.solarForm.panel.options; // panel
    var power = panelOptions[userChoice].value; // array
    var name = panelOptions[userChoice].text; // text inside of select
    var x = [power, name];
    // console.log(x);
    return x; // returns in calculatesolar function
}

// Calculate Solar function
function calculateSolar() { 
    var dailyUseKw = addMonths('mpc'); // will call this argument
    // console.log(dailyUseKw); // shows variable  on console

    var sunHoursPerDay = sunHours(); // assigning variable to function sunHours
    // console.log(sunHoursPerDay); // calling it on console log

    var minKwNeeds = dailyUseKw / sunHoursPerDay;
    // console.log(minKwNeeds);

    var realKwNeeds = minKwNeeds * 1.25; // increase of 25%
    // console.log(realKwNeeds);

    var realWattNeeds = realKwNeeds * 1000;
    // console.log(realWattNeeds);

    var panelInfo = calculatePanel();
    var panelOutput = panelInfo[0];
    var panelName = panelInfo[1];
    // console.log(panelOutput);
    // console.log(panelName);

    var panelsNeeded = Math.ceil(realWattNeeds / panelOutput); // Math.ceil rounds up
    // console.log(panelsNeeded);

    var feedback = "";
    feedback += `<p>Based on your average daily use of ${Math.round(dailyUseKw)} kWh, you will need to purchase ${panelsNeeded} ${panelName} solar panels to offset 100% of your electrical bill.</p>`;
    feedback += `<h2>Additional Details </h2>`;
    feedback += `<p>Your average daily electricity consumption: ${Math.round(dailyUseKw)} Kwh per day.</p>`;
    feedback += `<p>Average sunshine hours per day: ${sunHoursPerDay} hours</p>`;
    feedback += `<p>Realistic watts needed per hour: ${Math.round(realWattNeeds)} watts/hour</p>`; // "+Math.round(realWattNededs)+"
    feedback += `<p>The ${panelName} panel you selected generates about ${panelOutput} watts per hour.</p>`;

    document.getElementById('feedback').innerHTML=feedback;

} 