document.addEventListener('DOMContentLoaded', function() {

    // Get the slider and the display element
    const ageSlider = document.getElementById('ageSlider');
    const ageValue = document.getElementById('ageValue');

    // Update the display element when the slider value changes
    ageSlider.addEventListener('input', function() {
        ageValue.textContent = ageSlider.value;
    });


    //Page 1 Gender & Age, Next goes to Cholesterol 
    document.getElementById('nextCholesterol').addEventListener('click', function() {
        document.getElementById('genderAgeSection').style.display = 'none';
        document.getElementById('cholesterolSection').style.display = 'block';
    });
    
    //page 2 Cholesterol, Back Button goes to Gender & Age
    document.getElementById('backGenderAge').addEventListener('click', function() {
        document.getElementById('cholesterolSection').style.display = 'none';
        document.getElementById('genderAgeSection').style.display = 'block';
    });
    
    //page 2 Cholesterol, Next button goes to Smoker
    document.getElementById('nextSmoker').addEventListener('click', function() {
        document.getElementById('cholesterolSection').style.display = 'none';
        document.getElementById('smokerSection').style.display = 'block';
    });
    
    //page 3 Smoker, back button goes to Cholesterol
    document.getElementById('backCholesterol').addEventListener('click', function() {
        document.getElementById('smokerSection').style.display = 'none';
        document.getElementById('cholesterolSection').style.display = 'block';
    });
    
    //page 3 Smoker, Next button goes to Blood Pressure
    document.getElementById('nextBloodPressure').addEventListener('click', function() {
        document.getElementById('smokerSection').style.display = 'none';
        document.getElementById('bloodPressureSection').style.display = 'block';
    });
    
    //page 4 Blood Pressure, Back button goes to Smoker 
    document.getElementById('backSmoker').addEventListener('click', function() {
        document.getElementById('bloodPressureSection').style.display = 'none';
        document.getElementById('smokerSection').style.display = 'block';
    });
    
    //Page 4 Blood Pressure, Calculate button goes to Results page
    document.getElementById('calculate').addEventListener('click', function() {
        document.getElementById('bloodPressureSection').style.display = 'none';
        document.getElementById('resultSection').style.display = 'block';
    });

    //Page 5 Results, Restart button goes back to Gender and Age, clears all inputs. 
    document.getElementById('restart').addEventListener('click', function() {
        document.getElementById('resultSection').style.display = 'none';
        document.getElementById('genderAgeSection').style.display = 'block';
    });



    //collect and store all the info when the calulate button is pressed. 
    const calculateButton = document.getElementById('calculate');
    
    calculateButton.addEventListener('click', function() {
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const age = parseInt(document.getElementById('ageSlider').value);
        const totalCholesterol = parseInt(document.getElementById('totalCholesterol').value);
        const hdlCholesterol = parseInt(document.getElementById('HDLCholesterol').value);
        const smoker = document.querySelector('input[name="smoking"]:checked').value === 'yes';
        const BloodPressure = parseInt(document.getElementById('bloodPressure').value);
        const onTreatment = document.querySelector('input[name="treatment"]:checked').value === 'yes';

        let score = 0;

        // Age points
        score += calculateAgePoints(gender, age);

        // Cholesterol points
        score += calculateCholesterolPoints(gender, age, totalCholesterol);

        // Smoking points
        score += calculateSmokingPoints(gender, age, smoker);

        // HDL cholesterol points
        score += calculateHDLPoints(hdlCholesterol);

        // Blood pressure points
        score += calculateBloodPressurePoints(gender, BloodPressure, onTreatment);


        
        // Calculate and display the risk percentage
        const riskPercentage = calculateRiskPercentage(gender, score);
        displayRiskScore(riskPercentage);
    });
});

//calculates the points based on age and gender and adds it to score 
//I know I could have made this code a lot smaller, some of the ways would be to take away age and instead only use cholestrol to get both. 
//also could have taken aways the left hand sides of the else if statments. however I find this way alot cleaner and easier to understand for others. 
//It also would make it alot more simple to change it incase they find any better ways to calculate this in the future, as this has a lot more independance. 
function calculateAgePoints(gender, age) {
    let points = 0;

    if (gender === 'Female') {
        if (age >= 20 && age <= 34) {
            points = -7;
        } 
        else if (age >= 35 && age <= 39) {
            points = -3;
        } 
        else if (age >= 40 && age <= 44) {
            points = 0;
        } 
        else if (age >= 45 && age <= 49) {
            points = 3;
        } 
        else if (age >= 50 && age <= 54) {
            points = 6;
        } 
        else if (age >= 55 && age <= 59) {
            points = 8;
        } 
        else if (age >= 60 && age <= 64) {
            points = 10;
        } 
        else if (age >= 65 && age <= 69) {
            points = 12;
        } 
        else if (age >= 70 && age <= 74) {
            points = 14;
        } 
        else if (age >= 75 && age <= 79) {
            points = 16;
        }
        
    } 
    else if (gender === 'Male') {
        if (age >= 20 && age <= 34) {
            points = -9;
        } 
        else if (age >= 35 && age <= 39) {
            points = -4;
        } 
        else if (age >= 40 && age <= 44) {
            points = 0;
        } 
        else if (age >= 45 && age <= 49) {
            points = 3;
        } 
        else if (age >= 50 && age <= 54) {
            points = 6;
        } 
        else if (age >= 55 && age <= 59) {
            points = 8;
        }
        else if (age >= 60 && age <= 64) {
            points = 10;
        } 
        else if (age >= 65 && age <= 69) {
            points = 11;
        } 
        else if (age >= 70 && age <= 74) {
            points = 12;
        } 
        else if (age >= 75 && age <= 79) {
            points = 13;
        }
    }

    console.log(points);
    return points;
}

//calculates the points based on age, gender and colesterol then returns it
function calculateCholesterolPoints(gender, age, cholesterol) {
    let points = 0;

    if (gender === 'Female') {
        if (age >= 20 && age <= 39) {
            if (cholesterol < 160) {
                points = 0;
            }
            else if (cholesterol >= 160 && cholesterol <= 199){
                    points = 4;
            }
            else if (cholesterol >= 200 && cholesterol <= 239){
                points = 8;
            }
            else if (cholesterol >= 240 && cholesterol <= 279) {
                points = 11;
            }
            else if (cholesterol >= 280) {
                points = 13;
            }
        } 
        else if (age >= 40 && age <= 49) {
            if (cholesterol < 160) {
                points = 0;
            }
            else if (cholesterol >= 160 && cholesterol <= 199) {
                points = 3;
            }
            else if (cholesterol >= 200 && cholesterol <= 239) {
                points = 6;
            }
            else if (cholesterol >= 240 && cholesterol <= 279) {
                points = 8;
            }
            else if (cholesterol >= 280) {
                points = 10;
            }
        } 
        else if (age >= 50 && age <= 59) {
            if (cholesterol < 160) {
                points = 0;
            }
            else if (cholesterol >= 160 && cholesterol <= 199) {
                points = 2;
            }
            else if (cholesterol >= 200 && cholesterol <= 239) {
                points = 4;
            }
            else if (cholesterol >= 240 && cholesterol <= 279) {
                points = 5;
            }
            else if (cholesterol >= 280) {
                points = 7;
            }
        } 
        else if (age >= 60 && age <= 69) {
            if (cholesterol < 160) {
                points = 0;
            }
            else if (cholesterol >= 160 && cholesterol <= 199) {
                points = 1;
            }
            else if (cholesterol >= 200 && cholesterol <= 239) {
                points = 2;
            }
            else if (cholesterol >= 240 && cholesterol <= 279) {
                points = 3;
            }

            else if (cholesterol >= 280) {
                points = 4;
            }
        } 
        else if (age >= 70 && age <= 79) {
            if (cholesterol < 160) {
                points = 0;
            }
            else if (cholesterol >= 160 && cholesterol <= 199) {
                points = 1;
            }
            else if (cholesterol >= 200 && cholesterol <= 239) {
                points = 1;
            }
            else if (cholesterol >= 240 && cholesterol <= 279) {
                points = 2;
            }
            else if (cholesterol >= 280) {
                points = 2;
            }
        }
    } 
    else if (gender === 'Male') {
        if (age >= 20 && age <= 39) {
            if (cholesterol < 160) {
                points = 0;
            }
            else if (cholesterol >= 160 && cholesterol <= 199) {
                points = 4;
            }
            else if (cholesterol >= 200 && cholesterol <= 239) {
                points = 7;
            }
            else if (cholesterol >= 240 && cholesterol <= 279) {
                points = 9;
            }
            else if (cholesterol >= 280) {
                points = 11;
            }
        } 
        else if (age >= 40 && age <= 49) {
            if (cholesterol < 160) {
                points = 0;
            }
            else if (cholesterol >= 160 && cholesterol <= 199) {
                points = 3;
            }
            else if (cholesterol >= 200 && cholesterol <= 239) {
                points = 5;
            }
            else if (cholesterol >= 240 && cholesterol <= 279) {
                points = 6;
            }
            else if (cholesterol >= 280) {
                points = 8;
            }
        } 
        else if (age >= 50 && age <= 59) {
            if (cholesterol < 160) {
                points = 0;
            }
            else if (cholesterol >= 160 && cholesterol <= 199) {
                points = 2;
            }
            else if (cholesterol >= 200 && cholesterol <= 239) {
                points = 3;
            }
            else if (cholesterol >= 240 && cholesterol <= 279) {
                points = 4;
            }
            else if (cholesterol >= 280) {
                points = 5;
            }
        } 
        else if (age >= 60 && age <= 69) {
            if (cholesterol < 160) {
                points = 0;
            }
            else if (cholesterol >= 160 && cholesterol <= 199) {
                points = 1;
            }
            else if (cholesterol >= 200 && cholesterol <= 239) {
                points = 1;
            }
            else if (cholesterol >= 240 && cholesterol <= 279) {
                points = 2;
            }
            else if (cholesterol >= 280) {
                points = 3;
            }
        } 
        else if (age >= 70 && age <= 79) {
            if (cholesterol < 160) {
                points = 0;
            }
            else if (cholesterol >= 160 && cholesterol <= 199) {
                points = 0;
            }
            else if (cholesterol >= 200 && cholesterol <= 239) {
                points = 0;
            }
            else if (cholesterol >= 240 && cholesterol <= 279) {
                points = 1;
            }
            else if (cholesterol >= 280) {
                points = 1;
            }
        }
    }
    console.log(points);
    return points;
}

//calculates the points based on age, gender and if they smoke then  returns it
function calculateSmokingPoints(gender, age, smoker) {
    let points = 0;
    
    // Non-smokers get 0 points
    if (!smoker) {
        console.log(points);
        return points; 
    }
    //then all others must be a smoker
    if (gender === 'Female') {
        if (age >= 20 && age <= 39) {
            points = 9;
        } 
        else if (age >= 40 && age <= 49) {
            points = 7;
        } 
        else if (age >= 50 && age <= 59) {
            points = 4;
        } 
        else if (age >= 60 && age <= 69) {
            points = 2;
        } 
        else if (age >= 70 && age <= 79) {
            points = 1;
        }
    } 
    else if (gender === 'Male') {
        if (age >= 20 && age <= 39) {
            points = 8;
        } 
        else if (age >= 40 && age <= 49) {
            points = 5;
        } 
        else if (age >= 50 && age <= 59) {
            points = 3;
        } 
        else if (age >= 60 && age <= 69) {
            points = 1;
        } 
        else if (age >= 70 && age <= 79) {
            points = 1;
        }
    }
    console.log(points);
    return points;   
}

//calculates the points based on HDL levels then  returns it, gener doesn't change the points
function calculateHDLPoints(hdl) {
    let points = 0;

    if (hdl >= 60) {
        points = -1;
    } 
    else if (hdl >= 50 && hdl <= 59) {
        points = 0;
    } 
    else if (hdl >= 40 && hdl <= 49) {
        points = 1;
    } 
    else if (hdl < 40) {
        points = 2;
    }
    console.log(points);
    return points;
}


//calculates the points based on gender, blood pressure, and if they are getting treated or not, then returns it
function calculateBloodPressurePoints(gender, bloodPressure, treated) {
    let points = 0;
   
    if (gender === 'Female') {
        
        if (treated) {
            if (bloodPressure < 120) {
                points = 0;
            } 
            else if (bloodPressure >= 120 && bloodPressure <= 129) {
                points = 3;
            } 
            else if (bloodPressure >= 130 && bloodPressure <= 139) {
                points = 4;
            } 
            else if (bloodPressure >= 140 && bloodPressure <= 159) {
                points = 5;
            } 
            else if (bloodPressure >= 160) {
                points = 6;
            }
        } 
        else {
            if (bloodPressure < 120) {
                points = 0;
            } 
            else if (bloodPressure >= 120 && bloodPressure <= 129) {
                points = 1;
            } 
            else if (bloodPressure >= 130 && bloodPressure <= 139) {
                points = 2;
            } 
            else if (bloodPressure >= 140 && bloodPressure <= 159) {
                points = 3;
            } 
            else if (bloodPressure >= 160) {
                points = 4;
            }
        }
    } 
    else if (gender === 'Male') {
      
        if (treated) {
            if (bloodPressure < 120) {
                points = 0;
            } 
            else if (bloodPressure >= 120 && bloodPressure <= 129) {
                points = 1;
            } 
            else if (bloodPressure >= 130 && bloodPressure <= 139) {
                points = 2;
            } 
            else if (bloodPressure >= 140 && bloodPressure <= 159) {
                points = 2;
            } 
            else if (bloodPressure >= 160) {
                points = 3;
            }
        } 
        else {
            if (bloodPressure < 120) {
                points = 0;
            } 
            else if (bloodPressure >= 120 && bloodPressure <= 129) {
                points = 0;
            } 
            else if (bloodPressure >= 130 && bloodPressure <= 139) {
                points = 1;
            } 
            else if (bloodPressure >= 140 && bloodPressure <= 159) {
                points = 1;
            } 
            else if (bloodPressure >= 160) {
                points = 2;
            }
        }
    }
    console.log(points);
    return points;
}


function calculateRiskPercentage(gender, totalPoints) {
    let riskPercentage = 0;

    if (gender === 'Female') {
        if (totalPoints < 9) {
            riskPercentage = 'less than 1';
        } 
        else if (totalPoints >= 9 && totalPoints <= 12) {
            riskPercentage = 1;
        } 
        else if (totalPoints >= 13 && totalPoints <= 14) {
            riskPercentage = 2;
        } 
        else if (totalPoints === 15) {
            riskPercentage = 3;
        } 
        else if (totalPoints === 16) {
            riskPercentage = 4;
        } 
        else if (totalPoints === 17) {
            riskPercentage = 5;
        } 
        else if (totalPoints === 18) {
            riskPercentage = 6;
        } 
        else if (totalPoints === 19) {
            riskPercentage = 8;
        } 
        else if (totalPoints === 20) {
            riskPercentage = 11;
        } 
        else if (totalPoints === 21) {
            riskPercentage = 14;
        } 
        else if (totalPoints === 22) {
            riskPercentage = 17;
        } 
        else if (totalPoints === 23) {
            riskPercentage = 22;
        } 
        else if (totalPoints === 24) {
            riskPercentage = 27;
        } 
        else if (totalPoints >= 25) {
            riskPercentage = 'greater than 30';
        }
    } 
    else if (gender === 'Male') {
        if (totalPoints === 0) {
            riskPercentage = 'less than 1';
        } 
        else if (totalPoints >= 1 && totalPoints <= 4) {
            riskPercentage = 1;
        } 
        else if (totalPoints >= 5 && totalPoints <= 6) {
            riskPercentage = 2;
        } 
        else if (totalPoints === 7) {
            riskPercentage = 3;
        } 
        else if (totalPoints === 8) {
            riskPercentage = 4;
        } 
        else if (totalPoints === 9) {
            riskPercentage = 5;
        } 
        else if (totalPoints === 10) {
            riskPercentage = 6;
        } 
        else if (totalPoints === 11) {
            riskPercentage = 8;
        } 
        else if (totalPoints === 12) {
            riskPercentage = 10;
        } 
        else if (totalPoints === 13) {
            riskPercentage = 12;
        } 
        else if (totalPoints === 14) {
            riskPercentage = 16;
        } 
        else if (totalPoints === 15) {
            riskPercentage = 20;
        } 
        else if (totalPoints === 16) {
            riskPercentage = 25;
        } 
        else if (totalPoints >= 17) {
            riskPercentage = 'greater than 30';
        }
    }

    console.log(riskPercentage);
    return riskPercentage;
}



function displayRiskScore(riskPercentage) {
    // Display the risk percentage on the final page
    document.getElementById('finalScore').innerText = `Your 10-year risk of heart disease is ${riskPercentage}%`;
}

