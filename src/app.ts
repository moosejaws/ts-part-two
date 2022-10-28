function Logger(logString: string) { 
    console.log('Logger factory')
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

//create new decorator, can add more than one decorator to a class
function WithTemplate(template: string, hookId: string) {
    return function(constructor: any) {
        console.log('Rendering template')
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
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

const pers = new Human();
console.log(pers);

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
