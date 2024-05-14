console.log("___Welcome to Student Management System___");

import inquirer from "inquirer";

class Student {
    private studentName: string;
    private studentAge: number;
    private studentGender: string;
    private studentID: number;
    private courses: string[];
    private balance: number;
    static nextID: number = 10000;

    constructor(name: string, age: number, gender: string) {
        this.studentID = Student.nextID++;
        this.balance = 100000;
        this.courses = [];
        this.studentName = name;
        this.studentAge = age;
        this.studentGender = gender;
    }

    enrollCourses(course: string) {
        this.courses.push(course);
    }

    viewBalance() {
        console.log(`Balance for ${this.studentName}: $${this.balance}`);
    }

    payTuition(amount: number) {
        this.balance -= amount;
        console.log(`Payment of $${amount} received from ${this.studentName}`);
    }

    showStatus() {
        console.log(`Student Name: ${this.studentName}`);
        console.log(`Student ID: ${this.studentID}`);
        console.log(`Student Age: ${this.studentAge}`);
        console.log(`Student Gender: ${this.studentGender}`);
        console.log(`Courses Enrolled: ${this.courses.join(', ')}`);
        console.log(`Balance: $${this.balance}`);
    }
}

let student: Student;

// Function to prompt user for action
async function promptAction() {
    const { action } = await inquirer.prompt({
        name: "action",
        message: "What do you want to do? \nChoose an action: ",
        type: "list",
        choices: ['Enroll in a course', 'View balance', 'Pay tuition fees', 'Show status', 'Exit']
    });

    switch (action) {
        case 'Enroll in a course':
            await enrollCourse();
            break;
        case 'View balance':
            student.viewBalance();
            await promptAction(); // Re-prompt for next action
            break;
        case 'Pay tuition fees':
            await payTuition();
            break;
        case 'Show status':
            student.showStatus();
            await promptAction(); // Re-prompt for next action
            break;
        case 'Exit':
            process.exit();
            break;
    }
}

// Function to enroll in a course
async function enrollCourse() {
    const { course } = await inquirer.prompt({
        type: 'list',
        name: 'course',
        message: 'Choose course name: ',
        choices: ['Python Programming', 'Data Structures And Algorithms', 'WordPress Development', 'Android Development']
    });

    student.enrollCourses(course);
    console.log(`Enrolled in course: ${course}`);
    await promptAction(); // Re-prompt for next action
}

// Function to pay tuition fees
async function payTuition() {
    const { amount } = await inquirer.prompt({
        type: 'number',
        name: 'amount',
        message: 'Enter the amount to pay:'
    });

    student.payTuition(amount);
    await promptAction(); // Re-prompt for next action
}

// Function to start the program
async function start() {
    const { name, age, gender } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter your name: '
        },
        {
            type: 'input',
            name: 'age',
            message: 'Enter your age: '
        },
        {
            type: 'list',
            name: 'gender',
            message: 'Enter your Gender: ',
            choices: ['Male', 'Female']
        }
    ]);

    student = new Student(name, parseInt(age), gender);
    await promptAction();
}

// Start the program
start();
