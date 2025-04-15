// grabbing the input fields from the DOM
let Name = document.getElementById("Name");
let age = document.getElementById("age");
let check = document.getElementById("checked"); // checkbox for Admin

// array to store student objects for local storage
let arrayObjectsStorage = [];

// grabbing elements from the DOM that we’ll need
let submit = document.getElementById("AddStudent");
let tableRows = document.getElementById("tableOfData");
let container = document.querySelector(".container");

// will hold values from form inputs
let formName, formAge;
let formCheck = null; // start off null just to be clean

// array to store the list of students for display and deletion
let nameList = [];

// creating a div to show number of students (cool little stat box)
let studentCounter = document.createElement('div');

// add the student counter to the DOM initially so it’s not empty
function studentTextCounter() {
  studentCounter.innerHTML = `
    <p>number of students : ${nameList.length}</p>`;
  container.appendChild(studentCounter);
};
studentTextCounter(); // call it right away so it's visible

// update the counter whenever students are added or removed
function updateStudentCounter() {
  studentCounter.innerHTML = `
    <p>number of students : ${nameList.length}</p>`;
}

// main button that does renders the UI
submit.addEventListener('click', () => {
  // get values from input fields
  formName = Name.value;
  formAge = age.value;
  formCheck = check.checked;

  // if either is empty, don’t go through with the add
  var truth = (formName == '' || formAge == '');

  printConsole(); // just to peek in the console what’s going on

  if (truth) {
    // give an alert depending on what’s missing (basic validation)
    (formName == '' ? alert('insert Name') : alert('insert Age'));
  } else {
    // everything’s good, let’s store the student!
    addToList(formName, formAge, formCheck);
    render(nameList);
    updateStudentCounter();
    console.log(nameList); // debugging info
  }
});

// function to print out form values to console (nice for debugging)
function printConsole() {
  console.log(formName);
  console.log(formAge);
  console.log(formCheck + " button is not clicked so therefore not an Admin");
}

// actually builds and stores the student object
function addToList(name, age, action) {
  let admin = (action ? 'Admin' : 'notAdmin'); // toggle role
  let objects = { name, age, admin };

  // push into the array that will be saved in local storage
  arrayObjectsStorage.push(objects);
  console.log(objects); // log what's going in

  // stringify and save into localStorage
  let values = JSON.stringify(arrayObjectsStorage);
  localStorage.setItem("students", values);

  // also store into our working array
  nameList.push(objects);
}

// builds and displays the table rows
function render(nameList) {
  const table = document.getElementById("tableOfData");
  table.innerHTML = ''; // clear previous content first

  // header row for the table (name, age, action)
  let newHeader = document.createElement('tr');
  newHeader.innerHTML = `
        <th>Name</th>
        <th>Age</th>
        <th>Action</th>
  `;
  tableRows.appendChild(newHeader);

  // loop through list and create rows dynamically
  nameList.map((list, index) => {
    let newRow = document.createElement('tr');
    newRow.setAttribute("id", "newRow");
    newRow.innerHTML = ` 
      <td>${list.name}</td>
      <td>${list.age}</td>
      <td>${list.admin}</td>
      <button id="Remove" onclick="remove(${index})">Remove</button>
    `; // inject HTML into the table row

    tableRows.appendChild(newRow); // add to table
  });
}

// removes student by index
function remove(index) {
  // remove from the working array
  nameList.splice(index, 1);
  arrayObjectsStorage.splice(index, 1);

  // refresh UI and counter
  render(nameList);
  updateStudentCounter();

  // also update the localStorage so it's in sync
  let storedValues = localStorage.getItem("students");
  var arrayStorage = JSON.parse(storedValues);

  arrayStorage.splice(index, 1);
  storedValues = JSON.stringify(arrayStorage);
  localStorage.setItem("students", storedValues);
};

// shows or hides the student counter based on Admin checkbox
function showCounterStudent() {
  studentCounter.style.display = check.checked ? "block" : "none";
}
// make sure the counter is correctly displayed when page loads
showCounterStudent();
