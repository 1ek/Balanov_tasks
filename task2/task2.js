function arrayDiff(array1, array2) {
  return array1.filter((val) => !array2.includes(val));
}

function alphabetPosition(text) {
  return text.toLowerCase().replace(/[^a-z]/gi, "").replace(/[a-z]/gi, val => val.charCodeAt() - 96 + " ").trim();
}

function squareEveryDigits(number) {
  return ("" + number).split("").map((val) => Math.pow(val, 2)).join("");
}

console.log(arrayDiff([1, 2, 2, 3, "abc", "ab"], [2, 9, 99, "abc"]));
console.log(alphabetPosition("Aa Bb The sunset sets at twelve o' clock."));
console.log(squareEveryDigits(9119));
