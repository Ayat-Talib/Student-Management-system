console.log("\n \n ___Welcome to Student Management System___\n \n ");
import inquirer from "inquirer";
class Student {
    studentName;
    studentAge;
    studentGender;
    studentID;
    courses;
    balance;
    static nextID = 10000;
    constructor(name, age, gender) {
        this.studentID = Student.nextID++;
        this.balance = 100000;
        this.courses = [];
        this.studentName = name;
        this.studentAge = age;
        this.studentGender = gender;
    }
    enrollCourse(course, fee) {
        if (this.balance >= fee) {
            this.courses.push(course);
            this.balance -= fee;
            console.log(`Successfully enrolled in course: ${course} with a fee of $${fee}. Remaining balance: $${this.balance}`);
        }
        else {
            console.log(`Insufficient balance to enroll in ${course}. Required: $${fee}, Available: $${this.balance}`);
        }
    }
    viewBalance() {
        console.log(`Balance for ${this.studentName}: $${this.balance}`);
    }
    payTuition(amount) {
        this.balance += amount;
        console.log(`Payment of $${amount} received from ${this.studentName}. New balance: $${this.balance}`);
    }
    showStatus() {
        console.log("\n=== Student Status ===");
        console.log(`Name: ${this.studentName}`);
        console.log(`ID: ${this.studentID}`);
        console.log(`Age: ${this.studentAge}`);
        console.log(`Gender: ${this.studentGender}`);
        console.log(`Courses Enrolled: ${this.courses.length > 0 ? this.courses.join(', ') : 'None'}`);
        console.log(`Balance: $${this.balance}`);
        console.log("======================\n");
    }
}
let student;
async function promptAction() {
    const { action } = await inquirer.prompt({
        name: "action",
        message: "What do you want to do? \nChoose an action:",
        type: "list",
        choices: ['Enroll in a course', 'View balance', 'Pay tuition fees', 'Show status', 'Exit']
    });
    try {
        switch (action) {
            case 'Enroll in a course':
                await enrollCourse();
                break;
            case 'View balance':
                student.viewBalance();
                await promptAction();
                break;
            case 'Pay tuition fees':
                await payTuition();
                break;
            case 'Show status':
                student.showStatus();
                await promptAction();
                break;
            case 'Exit':
                console.log("Exiting the Student Management System. Goodbye!");
                process.exit();
                break;
        }
    }
    catch (error) {
        console.error("An error occurred:", error);
        await promptAction();
    }
}
async function enrollCourse() {
    const { courseChoice } = await inquirer.prompt({
        type: 'list',
        name: 'courseChoice',
        message: 'Choose a course to enroll in:',
        choices: [
            { name: 'Python Programming ($2000)', value: { course: 'Python Programming', fee: 2000 } },
            { name: 'Data Structures And Algorithms ($2500)', value: { course: 'Data Structures And Algorithms', fee: 2500 } },
            { name: 'WordPress Development ($3000)', value: { course: 'WordPress Development', fee: 3000 } },
            { name: 'Android Development ($2000)', value: { course: 'Android Development', fee: 2000 } }
        ]
    });
    const { feeChoice } = await inquirer.prompt({
        type: 'confirm',
        name: 'feeChoice',
        message: `Do you want to pay the fee of $${courseChoice.fee} for ${courseChoice.course}?`,
        default: false
    });
    if (feeChoice) {
        student.enrollCourse(courseChoice.course, courseChoice.fee);
    }
    else {
        console.log("You need to pay the fees to enroll in the course.");
    }
    await promptAction();
}
async function payTuition() {
    const { amount } = await inquirer.prompt({
        type: 'input',
        name: 'amount',
        message: 'Enter the amount to pay:',
        validate: value => {
            const valid = !isNaN(parseFloat(value)) && isFinite(value) && value > 0;
            return valid || 'Please enter a valid amount.';
        }
    });
    student.payTuition(parseFloat(amount));
    await promptAction();
}
async function start() {
    const { name, age, gender } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter your name: ',
            validate: value => value ? true : 'Name cannot be empty.'
        },
        {
            type: 'input',
            name: 'age',
            message: 'Enter your age: ',
            validate: value => {
                const valid = !isNaN(parseInt(value)) && parseInt(value) > 0;
                return valid || 'Please enter a valid age.';
            }
        },
        {
            type: 'list',
            name: 'gender',
            message: 'Enter your Gender: ',
            choices: ['Male', 'Female', 'Other']
        }
    ]);
    student = new Student(name, parseInt(age), gender);
    await promptAction();
}
// Start the program
start();
