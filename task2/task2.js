function arrayDiff(array1, array2) {

    return array1.filter(
    function (calc){
         return !array2.includes(calc)
         //или через стрелочную функцию calc => !array2.includes(calc)
    });
}

function alphabetPosition (){

}



function squareEveryDigits(number){
     return (('' + number).split('').map(val => Math.pow(val, 2)).join(''));
}








console.log (arrayDiff ([1, 2, 2, 3, 'abc', 'ab'], [ 2, 9, 99, 'abc']));
console.log (squareEveryDigits (9119));