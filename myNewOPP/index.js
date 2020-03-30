const fs  = require("fs");
const path = require("path");
const inquirer = require("inquirer");


const Manager = require("./myLib/Manager");
const Engineer = require("./myLib/Engineer");
const Intern = require("./myLib/Intern");
const render = require("./myLib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");


const employees = []

const confirm = [
    {
        type: "confirm",
        name: "confirm",
        message: "add an employee"
    }
]

const questions = [
    {
        type: "list",
        name: "role",
        message: "role:",
        choice: ["Manager", "Engineer", "Intern"]
    } ,
    {
        type: "input",
        name: "name",
        message: "what is your name?",
    } ,
    {
        type: "input",
        name: "id",
        message: "what is your id?",
    } ,
    {
        type: "input",
        name: "email",
        message: "what is your email?",
    }
]

const engineerQ = [
    {
        type: "input",
        name: "github",
        message: "what is your Github?",
    }
]

const internQ = [
    {
        type: "input",
        name: "school",
        message: "name of school:"
    }
]

const managerQ = [
    {
        type: "input",
        name: "officeNumber",
        message: "office number:"
    }
]


const manager = async (data) => {
    const res = await inquirer.prompt(managerQ)
    const e = new Manager(data.name, data.id, data.email, res.officeNumber)
    employees.push(e)
    console.log(employees)
    init()
}

const engineer = async (data) => {
    const res = await inquirer.prompt(engineerQ)
    const e = new Engineer(data.name, data.id, data.email, res.github)
    employees.push(e)
    console.log(employees)
    init()
}

const intern = async (data) => {
    const res = await inquirer.prompt(internQ)
    const e = new Intern(data.name, data.id, data.email, res.school)
    employees.push(e)
    console.log(employees)
    init()
}

const exit = async (data) => {

}

const init = async () => {
    const choice = await inquirer.prompt(confirm)
    console.log(choice)
    if (choice.confirm) {
        const res = await inquirer.prompt(questions)
        switch (res.role) {
            case "Manager":
                return manager(res)
            case "Engineer":
                return engineer(res)
            case "Intern":
                return intern(res)
            default:
                console.log("default")
                break;
        }
    } else {
        exit(employees)
    }
}
    

init();