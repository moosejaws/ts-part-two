//generics
//certain types might work better if you provide additional info 

/*const names: Array<string> = []; //specify type of data to be stored in array  in angled brackets aka string[]
//names[0].split('');

//Promise type
//this promise works together with other types, returns some data of some type
const promise: Promise<number> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(10);
    }, 2000);
})

//better typesafety with generic types. what type will the promise  return

promise.then(data => {
    //data.split('');
}) */

function merge<T extends object, U extends object>(objA: T, objB: U) { 
    return Object.assign(objA, objB); //will return merged data
}

const mergedObj = merge({name: 'Max', hobbies: ['Sports']}, {age: 30});
console.log(mergedObj);

interface Lengthy {
    length: number;
}


function countAndDescribe<T extends Lengthy>(element: T): [T, string] { //return tuple
    let descriptionText = 'Got no value.';
    if (element.length === 1) {
        descriptionText = "Got 1 element.";
    } else if (element.length > 1) {
        descriptionText = 'Got ' + element.length + ' elements.';
    }
    return [element, descriptionText];
}

console.log(countAndDescribe(['Sports', 'Cooking']));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Value: ' + obj[key];
}

extractAndConvert({name: 'Max'}, 'name');


//generic classes, add angle brackets and identifiers T U

class DataStorage<T extends string | number | boolean > { //constraints
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if(this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1); //-1
    }

    getItems(){
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Cassia');
textStorage.addItem('Troy');
textStorage.removeItem('Troy');

console.log(textStorage.getItems());

//typescript knows which concrete type we pass in when instantiating class or calling function
// flexible and provide some contraints which are optional

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {}; //partial makes type where properties are optional, so you can set the object empty initially and add things step by step
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal as CourseGoal; //typecasting
}

//readonly type

const names: Readonly<string[]> = ['Max', 'Bart']; //not allowed to do anything to the array, can only read, be more precise
//names.push('Manu');
console.log(names);


// - generic types lock in a type