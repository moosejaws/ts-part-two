class Department {
    name: string;

    constructor(n: string){
        this.name = n
    }

    describe() { //method
        console.log('Department: ' + this.name)
    }
}

const accounting = new Department('Accounting');

accounting.describe();

