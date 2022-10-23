
// type AddFn = (a: number, b: number) => number;
interface AddFn { // custom function type
    (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2;
}

interface Named {
    readonly name: string;
    outputName?: string; //the ? makes it optional, optional property
}

//combine interfaces
interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    name: string;
    age = 26;

    constructor(n: string) {
        this.name = n;
    }

    greet(phrase: string) {
        console.log(phrase + ' ' + this.name);
    }
}

let user1: Greetable; 

user1 = new Person('Max');

user1.greet('Hi there - I am');
console.log(user1);

//class implements interface, forces the existence of interface method

//an interface describes the structure of an object
/*interface Person {
    // custom type.. kinda

    name: string;
    age: number;

    // add method
    greet(phrase: string): void;
}

//can use this to typecheck object
//can use an interface as a type
let user1: Person;

user1 = {
    name: 'Max',
    age: 26,
    greet(phrase: string) {
        console.log(phrase + '' + this.name);
    }
};

user1.greet('Hi there - I am ')*/

//interface definition is clear, can implement interface in class, class has to adhere to
