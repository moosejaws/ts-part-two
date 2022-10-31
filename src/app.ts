//decorators
function Logger(logString: string) { 
    console.log('Logger factory')
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

//create new decorator, can add more than one decorator to a class
function WithTemplate(template: string, hookId: string) {
    console.log("Template Factory")
    return function<T extends {new(...args: any[]): {name: string}} >(originalConstructor: T) {
    
        return class extends originalConstructor{ 
            constructor(..._: any[]) {
                super();
                //run any logic to run when the class is instantiated
                console.log('Rendering template')
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    }
}
//decorator runs when js finds your class definition, not when you use the contructor function
//at symbol is special identifier, after the @ there should points to function, which is the decorator
@Logger('LOGGING-HUMAN') // in which order do these decorators execute?, they execute from the bottom - up
@WithTemplate('<h1>My Human-Person Object</h1>', 'app')
class Human {
    name = 'Mars';

    constructor(){
        console.log('Creating person object...');
    }
}

//const pers = new Human();
//console.log(pers);

function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator');
    console.log(target, propertyName)
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
//can add decorators to methods, method decorators receive 3 arguments
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
console.log('Method decorator');
console.log(target);
console.log(name);
console.log(descriptor);

}

function Log4(target: any, name: string | Symbol, position: number) {
console.log('parameter');
console.log(target);
console.log(name);
console.log(position);
}

class Product {
    @Log
    title: string; // property
    private _price: number; // property

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price - should be positive!')
        }     
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}


//decorators are executed with the class, behind the scenes 

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
//make sure this keyword is set to method it belongs to
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {            //value prop with extra logic
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}


class Printer {
    message= 'this works';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer()


const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage.bind(p))//referring to p

interface ValidatorConfig{
    [property: string]: {
        [validatableProp: string]: string[]

    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name], 
        [propName]: ['required']
    };
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name], 
        [propName]: ['positive']
}}

function validate(obj: any) {
    //run different logic based on which validators it finds
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if(!objValidatorConfig) {
        return true;
    }

    let isValid = true;

    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop])
        switch(validator) {
            case 'required': 
            isValid = isValid && !! obj[prop];
            break;
            case 'positive':
            isValid = isValid && obj[prop] > 0;
            break;
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

//validate the input

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;


    const createdCourse = new Course(title, price);
    
    if(!validate(createdCourse)) {
        alert('Invalid input, please try again!')
        return;
    }
    console.log(createdCourse)
})
