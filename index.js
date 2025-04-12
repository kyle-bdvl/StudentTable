let Name = document.getElementById("Name");
let age = document.getElementById("age");
let check = document.getElementById("checked");

//for the local storage 
let arrayObjectsStorage = [];

let submit = document.getElementById("AddStudent");
let tableRows = document.getElementById("tableOfData");

let container = document.querySelector(".container")
let formName, formAge;
let formCheck=null;

//array to store the student so that i can delete it haha 
let nameList = [];
//studentCounter declared here
let studentCounter = document.createElement('div');

//adding a student counter at the bottom of the form; 
function studentTextCounter() {
  studentCounter.innerHTML = `
    <p>number of students : ${nameList.length}</p>`;
  container.appendChild(studentCounter);

};
studentTextCounter();


function updateStudentCounter() {
  studentCounter.innerHTML = `
    <p>number of students : ${nameList.length}</p>`;
}

//the main button for the UI

submit.addEventListener('click', () => {
  formName = Name.value;
  formAge = age.value;
  formCheck = check.checked;
  var truth = (formName == '' || formAge == '')
  printConsole();
  if (truth) {
    (formName == '' ? alert('insert Name') : alert('insert Age'));
  }
  else {
    addToList(formName, formAge, formCheck);
    render(nameList);

    updateStudentCounter();
    console.log(nameList);
  }
});

function printConsole() {
  console.log(formName);
  console.log(formAge);
  console.log(formCheck + "button is not clicked so there for not an Admin");
}



function addToList(name, age, action) {
  let admin = (action ? 'Admin' : 'notAdmin')
  let objects = { name, age, admin };
  //pushing the objects into the local storage/ 
  arrayObjectsStorage.push(objects);
  console.log(objects)
  let values = JSON.stringify(arrayObjectsStorage);
  localStorage.setItem("students", values);
  //pushing the objects into the array 
  nameList.push(objects);
}
//this will take the newList and run it to get all the information
function render(nameList) {
  const table = document.getElementById("tableOfData");
  table.innerHTML = '';
  let newHeader = document.createElement('tr');
  newHeader.innerHTML = `
        <th>Name</th>
        <th>Age</th>
        <th>Action</th>
  `;
  tableRows.appendChild(newHeader);
  //upon rerender it will show the value
  
  nameList.map((list, index) => {
    let newRow = document.createElement('tr');
    newRow.setAttribute("id", "newRow");
    newRow.innerHTML = ` 
      <td>${list.name}</td>
      <td>${list.age}</td>
      <td>${list.admin}</td>
      <button id="Remove" onclick="remove(${index})">Remove</button>
  `;//end of the appending of the table stuff
    tableRows.appendChild(newRow);
  }
  )
};

//remove the object in the Array
function remove(index) {
  nameList.splice(index, 1);

  arrayObjectsStorage.splice(index,1);
  render(nameList);
  updateStudentCounter();

  //part to update the local Storage
  let storedValues = localStorage.getItem("students");

  var arrayStorage = JSON.parse(storedValues);

  arrayStorage.splice(index, 1);
  storedValues = JSON.stringify(arrayStorage)
  localStorage.setItem("students", storedValues);
};

function showCounterStudent(){
  studentCounter.style.display = check.checked ? "block" : "none";
}
//upon render the showCounterStudent should run 
showCounterStudent();


