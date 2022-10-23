//typecasting, index props, and null coalescing

//const userInputElement = <HTMLInputElement>document.getElementById('user-input')
//it is of type html input, with typecasting, whatever is after html iinput element, is html
//similar syntax for React, to not clash wiith jsx, there is an alternative
//as keyword - expression in front will yield a type of html element

const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
userInputElement.value = "hi there!";

//the exclamation mark is used to tell typescript that whatever is in front of it will never return null


//index properties

interface ErrorContainer {
    //define index type by square brackets
    [prop: string]: string; //whatever object i am contructing, must have properties which are strings, every property which is added must have prop name which is a string

}



const errorBag: ErrorContainer = {
    email: 'Not a valid email!',
    username: 'Must start with a capital character!'
}

//function overloads - define multiple function signatures
//optional chaining - database source where you dont know with certainity that is defined

const fetchedUserData = {
    id: 'u1',
    name: 'Max',
    job: {title: 'CEO', description: 'My co'}
};
//add question mark after thing that you are not sure is defined or not, if something exists, show title, helps safely access nested props etc in object data, if the item is undefined it will not continue - if check, checks before access
console.log(fetchedUserData?.job?.title);

//nullish coalescing
const userInput = undefined; //false and use fall back
//if null store a fall back value
const storedData = userInput ?? 'Default'; //if this is null or undefined then we use fallback, if its not we use userInput
console.log(storedData);

