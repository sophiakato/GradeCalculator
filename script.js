//AT SOME TIME IF THE WEIGHT IS ABOVE 100 RETURN FAULTY
function onLoad() {
    document.getElementById("overHundred").style.display = "none";
    document.getElementById("notNumber").style.display = "none";
    document.getElementById("instructions").innerHTML = "Please enter numerical values only, separate grades with a comma, and input only one value for each weight category.";
    //RESET EVERYTHING?
}

// - “Calculate Current Grade” button calculates current grades using comma separated
// list of grades in each category (homework, quizzes, tests, midterm) along with the category weights
// calls on sub-functions to calculate the student grade and output it back to page.
//     Also “return” the result so that calculateGradeNeeded() can use it.

function calculateCurrentGrade(){
    //for ex "70,80,90"y



    var desiredGrade = document.getElementById("desiredGrade").value;

    var finalWeight = document.getElementById("finalWeight").value;

    var testGrades=  document.getElementById("tests").value;

    var testWeight =  document.getElementById("testWeight").value;

    var quizGrades= document.getElementById("quizzes").value;

    var quizWeight =  document.getElementById("quizWeight").value;

    var midtermGrade= document.getElementById("midterm").value;

    var midtermWeight =  document.getElementById("midtermWeight").value;

    var hwGrades= document.getElementById("homework").value;

    var hwWeight =  document.getElementById("homeworkWeight").value;

    document.getElementById("notNumber").style.display = "none";


    overHundred(hwWeight, finalWeight, testWeight, quizWeight, midtermWeight);

    var testsArray = convertArrayStringToNumber(testGrades);
    var testsAverage = averageArray(testsArray);

    document.getElementById("testGrade").innerHTML = testsAverage + "%";


    var quizArray = convertArrayStringToNumber(quizGrades);
    var quizAverage = averageArray(quizArray);
    document.getElementById("quizGrade").innerHTML = quizAverage + "%";


    var midtermArray = convertArrayStringToNumber(midtermGrade);
    var midtermAverage = averageArray(midtermArray);
    document.getElementById("midtermGrade").innerHTML = midtermAverage + "%";


    var homeworkArray = convertArrayStringToNumber(hwGrades);

    var homeworkAverage = averageArray(homeworkArray);
    document.getElementById("hwGrade").innerHTML = homeworkAverage + "%";


    //For color-coding the categories dependent on score
    var hwRow = document.getElementById("hwRow");
    colorRow(hwRow, homeworkAverage);

    var testRow = document.getElementById("testRow");
    colorRow(testRow, testsAverage);

    var quizRow = document.getElementById("quizRow");
    colorRow(quizRow, quizAverage);

    var midtermRow = document.getElementById("midtermRow");
    colorRow(midtermRow, midtermAverage);



    var weightedGrade = weightGrade(quizAverage, quizWeight, testsAverage, testWeight, homeworkAverage,
        hwWeight, midtermAverage, midtermWeight);

    document.getElementById("weightedGrade").innerHTML = "Your current grade is a " + weightedGrade + "%.";


    var finalGrade = calculateGradeNeeded(weightedGrade);

    document.getElementById("finalScoreNeeded").innerHTML = "You must get a "+ finalGrade + "% on the final to get a " + desiredGrade
        + "% in the class." ;

}

//    convertArrayStringToNumber(str) → takes an array of strings (from page) and returns the same array,
// except all the items are numbers.
function convertArrayStringToNumber(str){
    //for ex ["70","80","90"]
    var array = stringToArray(str);
    for(var i = 0; i < array.length; i++) {
        array[i] = parseInt(array[i]);
    }
    //for ex [70,80,90]
    return array;
}


function stringToArray(str){
    var array = str.split(",");
    return array;
}

// averageArray() → takes an array of numbers and returns the average of those numbers...
function averageArray(array){
    var average = 0;
    var length = array.length;
    for(i=0; i < length; i ++){
        average+=array[i];
    }
    average = Math.round(average/length);
    return average;
}


//This calculates the total current grade in the class
function weightGrade(quizAverage, quizWeight, testsAverage, testWeight, homeworkAverage,
                     hwWeight, midtermAverage, midtermWeight){
    // Weighted grade = w1×g1+ w2×g2+ w3×g3+...
    var decimal = 0.01;
    var testPercent = testWeight * decimal;
    var quizPercent = quizWeight * decimal;
    var midPercent = midtermWeight * decimal;
    var hwPercent = hwWeight * decimal;
    var bestScore = 100* (testPercent + quizPercent + midPercent + hwPercent);
    // var bestScore = 100;

    // var grade = (testsAverage * testPercent) + (quizWeight *  quizPercent) +
    //     (midtermWeight * midPercent) + (hwWeight * hwPercent);
    var nowGrade = (testsAverage * testPercent) + (quizAverage *  quizPercent) +
        (midtermAverage * midPercent) + (homeworkAverage * hwPercent);


    var grade = nowGrade/bestScore;
    var gradePercent = Math.round(grade * 100);
    return gradePercent;
}


function calculateGradeNeeded(str){
    // calculateGradeNeeded() → takes the current grade returned by calculateCurrentGrade() and the grade desired and does the math to
// determine what the user needs on the final.
//     "gradeDesired"
    var desiredGrade = document.getElementById("desiredGrade").value;
    var finalWeight = document.getElementById("finalWeight").value;
    var weight = finalWeight*0.01;

    var final= (desiredGrade - (1 - weight) * str)/finalWeight;
    var finalGrade = Math.round(final *100);
    // var finalGradeNeededPercent = Math.round((desiredGrade -final)/finalWeight);
    return finalGrade;


}



function overHundred(hwWeight, finalWeight, testWeight, quizWeight, midtermWeight){
    hwWeight = parseInt(hwWeight);
    finalWeight = parseInt(finalWeight);
    testWeight = parseInt(testWeight);
    quizWeight = parseInt(quizWeight);
    midtermWeight = parseInt(midtermWeight);
    console.log(hwWeight+finalWeight+testWeight+quizWeight+midtermWeight);
    if((hwWeight+finalWeight+testWeight+quizWeight+midtermWeight)!==100){
        document.getElementById("overHundred").style.display = "block";
        document.getElementById("overHundred").innerHTML = "Are you sure it's okay that the total of your category weights is not a hundred percent?";
    }else{
        document.getElementById("overHundred").style.display = "none";
        document.getElementById("overHundred").innerHTML = "";
    }
}

function colorRow(row, score) {
    console.log(score);
    console.log(row);
    if (score > 90) {
        row.style.background = "green";
    }
    else if (score > 80) {
        row.style.background = "yellow";
    }
    else if (score > 70) {
        row.style.background = "orange";
    }
    else if (score > 60) {
        row.style.background = "red";
    }
    else {
        row.style.background = "magenta";
    }
}