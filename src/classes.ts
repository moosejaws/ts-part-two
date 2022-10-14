class Department {
    static fiscalYear = Date.now();
    //name: string;
    protected employees: string[] = []; //only accessible from inside the class // protected means it is accessible in any class extended

    constructor(protected readonly id: string, public name: string){
        //this.name = n;
        //console.log(Department.fiscalYear);
    }

    static createEmployee(name: string) {
        return { name: name };
    }

    
    //methods 

    describe(this: Department) {
        console.log(`Department: (${this.id}): ${this.name}`);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department { //inheriting from department, department class is base constructor
    admins: string[];
    constructor(id: string, admins: string[]) { //when you have a subclass with own class you have to add super so that it can call the base class too
        super(id, 'IT');
        this.admins = admins;
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment; //
    //read/set property getter setter
    get mostRecentReport() { //getter 
        if (this.lastReport) {
            return this.lastReport;

        }
        throw new Error('No report found.')
    }

    set mostRecentReport(value: string) { //setter
        
        if (!value) {
            throw new Error('Please pass in a valid value!');
        }

        this.addReport(value);
    }

    private constructor(id: string, private reports: string[]) { //when you have a subclass with own class you have to add super so that it can call the base class too
        super(id, 'Accounting');
        this.lastReport = reports[0]
    }
    //
    static getInstance() {
        //check if we already have an instance of the class, if so returns new one
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment('d2', []);
        return this.instance; //can only run once
    }
    

    describe() {
        console.log('Accounting Department - ID: ' + this.id)
    }
    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }
}

console.log(Department.fiscalYear);

const it = new ITDepartment('d1', ['Max']);



it.addEmployee('Max');



it.describe();
it.printEmployeeInformation();

console.log(it);

// const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();
console.log(accounting, accounting2)


accounting.mostRecentReport = 'Your End Report';
accounting.addReport("Something went wrong..");

console.log(accounting.mostRecentReport);


accounting.addEmployee('Max');
accounting.addEmployee('Manu');

// accounting.printReports();
// accounting.printEmployeeInformation();

accounting.describe();

