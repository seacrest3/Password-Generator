//Module 5 Challenge: Password Generator

// Array of special characters to be included in password
let specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
let numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
let lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
let upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

let passwordLength = 0;
let passwordCharSet = [];

// *** Function to prompt user for password options ***
function getPasswordOptions() {
  let isNumber = false;
  while (isNumber == false) {
    isNumber = true;

    // Prompt user to enter the length [10 - 64] of password
    let userInput = prompt("Would you please enter the length [10 - 64] of your password?");

    // Validate input for password length is not empty
    if (userInput === "") {
      alert("Password length has not been entered! Try again!");
      isNumber = false;

      // Validate for password length that must not start with '0' and alert if invalid input has been entered
    } else if (userInput.charAt(0) === '0') {
      alert("Password length must not start with '0'! Try again!");
      isNumber = false;
    } else {

      // Validate input for password length must only contain numeric characters and alert if invalid input has been entered
      for (let i = 0; i < userInput.length; i++) {
        if (!numericCharacters.includes(userInput.charAt(i))) {
          alert("Password length must only contain numeric characters (no space, negative or decimal number)! Try again!");
          i = userInput.length - 1;
          isNumber = false;
        }
      }

      // Validate for password length between 10 and 64 inclusive and alert if invalid input has been entered
      if (isNumber == true) {
        passwordLength = parseInt(userInput);
        if (passwordLength < 10 || passwordLength > 64) {
          alert("Password length must be at least 10 but no more than 64! Try again!");
          isNumber = false;
        }
        else {
          break;
        }
      }
    }
  }

  // Prompt user to confirm the option of character types be used in the password
  do {
    let selectLowerCase = confirm(
      "Please confirm any lowercase letters be used in your password?"
    );
    let selectUpperCase = confirm(
      "Please confirm any uppercase letters be used in your password?"
    );
    let selectNumbers = confirm(
      "Please confirm any numeric characters be used in your password?"
    );
    let selectSymbols = confirm(
      "Please confirm any symbols be used in your password?"
    );

    // Store the set of each selected character type into an array
    if (selectLowerCase === true) {
      passwordCharSet.push(lowerCasedCharacters);
    }
    if (selectUpperCase === true) {
      passwordCharSet.push(upperCasedCharacters);
    }
    if (selectNumbers === true) {
      passwordCharSet.push(numericCharacters);
    }
    if (selectSymbols === true) {
      passwordCharSet.push(specialCharacters);
    }

    // Validate for at least one character type should be selected and alert if none of any character type has been selected
    if (passwordCharSet.length === 0) {
      alert("At least one character type should be selected! Try again!");
    } else {
      break;
    }
  }
  while (true);
}

// *** Function for getting a random element from an array ***
function getRandom(arr) {
  let charSet = arr[Math.floor(Math.random() * arr.length)];
  return charSet;
}

// *** Function to generate password with user input ***
function generatePassword() {
  getPasswordOptions();
  let generatePassword = "";

  for (let i = 0; i < passwordLength; i++) {
    let randomList = getRandom(passwordCharSet);
    let randomChar = getRandom(randomList);
    generatePassword += randomChar;
  }
  // Reset variables
  passwordLength = 0;
  passwordCharSet = [];

  // Generate password
  return generatePassword;
}

// Get references to the #generate element
let generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);