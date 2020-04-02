const fs  = require("fs");
const path = require("path");
const inquirer = require("inquirer");


const Manager = require("./myLib/Manager");
const Engineer = require("./myLib/Engineer");
const Intern = require("./myLib/Intern");
const render = require("./myLib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");


const employeesID = []
const employees = []

function myInit () {
    function managerQ () {
        inquirer.prompt(
        [
        {
            type: "input",
            name: "name",
            message: "What is your name, manager?",
        } ,
        {
            type: "input",
            name: "id",
            message: "What is your manager ID?",
        } ,
        {
            type: "input",
            name: "email",
            message: "What is your email?",
            
        } ,
        {
            type: "input",
            name: "officeNumber",
            message: "What is your office number?",
        validate: answer => {
            const pass = answer.match( /^[1-9]\d*$/);
             if(pass)
            {return true; 
            }
             return "please enter a number"
        }}
        ])
        //here a promise is being created. This states that guranteed after the prompts have been answered - the next function willl execute
        .then (
            answer => {
                //Create a const that will hold all of the data from the manager input
        const managerInfo = new Manager(answer.name, answer.id, answer.email, answer.officeNumber)
                //create code that pushes the idbdata to the employee object array
                employees.push(managerInfo)
                employeesID.push(answer.id)
               console.log(employees)
               console.log(employeesID)
             teamInfo();
            } 
        )
        }
  //Create Function Starts here
  function teamInfo () {
      inquirer.prompt([{
          type: "list",
          name: "team",
          message: "Do you want to add another team member?",
          choices: ["Engineer", "Intern", "I'm done."]
      }]).then(userChoice => {
          switch (userChoice.team) {
              case "Engineer":
                  makeEngineer();
                  break
              case "Intern":
                  makeIntern();
                  break
              case "I'm done.":
                  createTeam();       
          }
      }) 
  }
managerQ();

function makeEngineer () {
    inquirer.prompt(
        [
        {
            type: "input",
            name: "name",
            message: "What is your name, engineer?",
        } ,
        {
            type: "input",
            name: "id",
            message: "What is your engineer ID?",
        } ,
        {
            type: "input",
            name: "email",
            message: "What is your email?",
        } ,
        {
            type: "input",
            name: "github",
            message: "What is your Github username?",
        }
    ]).then (
        answer => {
            //Create a const that will hold all of the data from the manager input
    const engineerInfo = new Engineer(answer.name, answer.id, answer.email, answer.github)
            //create code that pushes the idbdata to the employee object array
            employees.push(engineerInfo)
            employeesID.push(answer.id)
           console.log(employees)
           console.log(employeesID)
         teamInfo();
        } 
    )
}
    function makeIntern () {
        inquirer.prompt(
            [
            {
                type: "input",
                name: "name",
                message: "What is your name, intern?",
            } ,
            {
                type: "input",
                name: "id",
                message: "What is your intern ID?",
            } ,
            {
                type: "input",
                name: "email",
                message: "What is your email?",
            } ,
            {
                type: "input",
                name: "school",
                message: "Please enter your school:"
            }
        ]).then (
            answer => {
                //Create a const that will hold all of the data from the manager input
        const internInfo = new Intern(answer.name, answer.id, answer.email, answer.school)
                //create code that pushes the idbdata to the employee object array
                employees.push(internInfo)
                employeesID.push(answer.id)
               console.log(employees)
               console.log(employeesID)
             teamInfo();
            } 
        )
    }

    function createTeam () {
        fs.writeFile("./output/team.html", render(employees), function(err) {
            if(err) return console.log(err);
            console.log("Your team has been created! See output folder for listing.");
        });   
    };

}

myInit();