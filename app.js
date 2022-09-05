function reverseStr(str) {

    var listOfChars = str.split("");
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join("");

    return reversedStr;
}



function isPalindrome(str) {

    reverseSt = reverseStr(str);

    return reverseSt === str;


}

function convertDateToStr(date) {
    var dateStr = {
        day: " ",
        month: " ",
        year: " "
    };
    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];

}

function checkPalindromeOnAllDateFormats(date) {
    var listOfDateFormats = getAllDateFormats(date);

    var flag = false;

    for (var i = 0; i < listOfDateFormats.length; i++) {
        if (isPalindrome(listOfDateFormats[i])) {
            flag = true;
            break;
        }

    }

    return flag;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }

    return false
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonths = [31, 28, 30, 31, 30, 31, 30, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonths[month - 1]) {
            day = 1;
            month++;
        }

    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    };

}


function getNextPalindromeDate(date) {
    var count = 0;
    var nextDate = getNextDate(date);

    while (true) {
        count++;
        var isPalindrome = checkPalindromeOnAllDateFormats(nextDate)
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [count, nextDate];

}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonths = [31, 28, 30, 31, 30, 31, 30, 31, 30, 31, 30, 31];

    if (day === 0) {
        month--;
        if (month === 0) {
            month = 12;
            day = 31;
            year--;
        } else if (month === 2) {
            if (isLeapYear(year)) {
                day = 29;
            } else {
                day = 28;
            }
        } else {
            day = daysInMonths[month - 1];
        }
    }

    return {
        day: day,
        month: month,
        year: year,
    };

}

function getPreviousPalindromeDate(date) {
    var count = 0;
    var previousDate = getPreviousDate(date);



    while (true) {
        count++;
        var isPalindrome = checkPalindromeOnAllDateFormats(previousDate)
        if (isPalindrome) {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }



    return [count, previousDate];

}
const dateInput = document.querySelector("#birthdate-input");
const checkButton = document.querySelector("#check-button");
const outputResult = document.querySelector("#output-result");

function evenHandler() {
    bdayStr = dateInput.value;

    if (bdayStr !== "") {
        dateList = bdayStr.split("-")


        var date = {
            day: Number(dateList[2]),
            month: Number(dateList[1]),
            year: Number(dateList[0])
        }

        var palindromeCheck = checkPalindromeOnAllDateFormats(date);

        if (palindromeCheck) {
            outputResult.innerText = " Yay !!!! your Birthday is a Palindrome!! 🥳🥳🥳🥳 "
        } else {
            var [nextCount, nextPalindromeDate] = getNextPalindromeDate(date);
            var [previousCount, previousPalindromedate] = getPreviousPalindromeDate(date);



            if (nextCount < previousCount) {
                outputResult.innerText = `The nearest palindrome date is ${nextPalindromeDate.day}-${nextPalindromeDate.month}-${nextPalindromeDate.year}, you missed by ${nextCount} days.`;

            } else {
                outputResult.innerText = `The nearest palindrome date is ${previousPalindromedate.day}-${previousPalindromedate.month}-${previousPalindromedate.year}, you missed by ${previousCount} days.`;
            }
        }


    } else {
        outputResult.innerText = "Enter Your Birthdate."
    }



}

checkButton.addEventListener("click", evenHandler);