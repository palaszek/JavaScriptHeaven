class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class Task {
  constructor(taskName, assignedPerson, category, status) {
    this.taskName = taskName;
    this.assignedPerson = assignedPerson;
    this.category = category;
    this.status = status;
  }
}

class Categories {
  constructor(name) {
    this.name = name;
  }
}

class TaskStatus {
  constructor(name) {
    this.name = name;
  }
}

const leftTable = document.getElementById("left-table");
const rightTable = document.getElementById("right-table");

const tasksTable = document.createElement("TABLE");

leftTable.appendChild(tasksTable);

const personsTable = document.createElement("TABLE");
const categoriesTable = document.createElement("TABLE");
const statusesTable = document.createElement("TABLE");

tasksTable.classList.add("left-table-content");
personsTable.classList.add("right-table-content");
categoriesTable.classList.add("right-table-content");
statusesTable.classList.add("right-table-content");

rightTable.appendChild(personsTable);
rightTable.appendChild(categoriesTable);
rightTable.appendChild(statusesTable);

const rightTables = [personsTable, categoriesTable, statusesTable];

function hideAllTables() {
  rightTables.forEach((table) => {
    table.style.display = "none";
  });
}

hideAllTables();

const urlTasks = "http://localhost:3000/Tasks";
const urlPersons = "http://localhost:3000/Persons";
const urlCategories = "http://localhost:3000/Categories";
const urlTaskStatuses = "http://localhost:3000/TaskStatuses";

var tasksArray = [];
var personsArray = [];
var categoriesArray = [];
var taskStatusesArray = [];

const fetchData = async () => {
  await fetch(urlTasks)
    .then((response) => response.json())
    .then(async (data) => {
      for (let task of data) {
        tasksArray.push(task);
      }
      if (tasksArray.length == 0) {
        alert("Witaj! Wprowadź tekst na powitanie :D");
      }
    });

  await fetch(urlPersons)
    .then((response) => response.json())
    .then(async (data) => {
      for (let person of data) {
        personsArray.push(person);
      }
      if (personsArray.length == 0) {
        let defaultName = new Person("Nie przypisano", "Nie przypisano");
        personsArray.push[defaultName];
        pushData(defaultName, urlPersons);
      }
    });

  await fetch(urlCategories)
    .then((response) => response.json())
    .then(async (data) => {
      for (let category of data) {
        categoriesArray.push(category);
      }
      if (personsArray.length == 0) {
        let defaultCategorie = new Categories("Brak Kategorii");
        personsArray.push[defaultCategorie];
        pushData(defaultCategorie, urlCategories);
      }
    });

  await fetch(urlTaskStatuses)
    .then((response) => response.json())
    .then(async (data) => {
      for (let status of data) {
        taskStatusesArray.push(status);
      }
      if (taskStatusesArray.length == 0) {
        let defaultStatus1 = new TaskStatus("Brak Kategorii");
        let defaultStatus2 = new TaskStatus("Zakończony");
        let defaultStatus3 = new TaskStatus("W Realizacji");
        taskStatusesArray.push[
          (defaultStatus1, defaultStatus2, defaultStatus3)
        ];
        pushData(defaultStatus1, urlTaskStatuses);
        pushData(defaultStatus2, urlTaskStatuses);
        pushData(defaultStatus3, urlTaskStatuses);
      }
    });

  //createInitParagon();
  //inaczej mowiac inicjalizacja tabel dopiero gdy wczyta dane
  createInitTaskTable();
  createInitPersons();
  createInitCategories();
  createInitStatuses();
};

async function pushData(newData, url) {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

async function updateData(updateData, url) {
  await fetch(url + "/" + updateData.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  })
    .then((response) => response.json())
    .then((data) => {
      //zrób coś dopiero jak wpuści dane na server;
    });
}

async function deleteData(removeData, url) {
  await fetch(url + "/" + removeData.id, {
    method: "DELETE",
  }).then((data) => {
    //zrób coś dopiero jak usunie dane z servera;
  });
}

function sortByName(array) {
  let sortedArray = array;
  sortedArray.sort((element1, element2) => {
    if (Object.values(element1)[0] < Object.values(element2)[0]) {
      return -1;
    } else return 1;
  });

  return sortedArray;
}

function hamburgerToggle() {
  var menuDiv = document.querySelector("#Menu-div");
  if (menuDiv.style.display !== "none") {
    menuDiv.style.display = "none";
  } else {
    menuDiv.style.display = "flex";
  }
}

function setDateOnNav() {
  var dateNav = document.querySelector("#Nav-date");
  var data = new Date().toLocaleDateString();
  dateNav.textContent = "Data: " + data;
}

function showHideTables(id) {
  if (rightTables[id].style.display == "none") {
    hideAllTables();
    rightTables[id].style.display = "";
  } else {
    rightTables[id].style.display = "none";
  }
}

function createInitTaskTable() {
  var caption = tasksTable.createCaption();

  let row = tasksTable.insertRow();
  let cell = row.insertCell();

  cell.innerHTML = "LP";
  cell.style.textAlign = "center";

  cell = row.insertCell();
  cell.style.textAlign = "center";
  cell.innerHTML = "Zadanie";

  cell = row.insertCell();
  cell.style.textAlign = "center";
  cell.innerHTML = "Przydzielona Osoba";

  cell = row.insertCell();
  cell.style.textAlign = "center";
  cell.innerHTML = "Kategoria";

  cell = row.insertCell();
  cell.style.textAlign = "center";
  cell.innerHTML = "Status";

  for (let i = 0; i < tasksArray.length; i++) {
    row = tasksTable.insertRow();
    cell = row.insertCell();

    cell.innerHTML = i + 1;

    cell = row.insertCell();

    cell.innerHTML = tasksArray[i].taskName;

    cell = row.insertCell();

    cell.innerHTML = tasksArray[i].assignedPerson;

    cell = row.insertCell();

    cell.innerHTML = tasksArray[i].category;

    cell = row.insertCell();

    cell.innerHTML = tasksArray[i].status;

    var inputButton = addEditButton(i, tasksArray[i].id);

    cell = row.insertCell();
    cell.appendChild(inputButton);

    var inputButton = addDeleteButton(i, tasksArray[i].id);

    cell.appendChild(inputButton);
  }
  const newProductButton = document.getElementById("newProductButton");
  const dlg = document.getElementById("addTaskDialog");
  const form = document.getElementById("addForm");

  newProductButton.onclick = () => {
    form.reset();
    dlg.showModal();
    AddValuesToNewTask();
  };

  form.onsubmit = async (event) => {
    if (confirm("Jestes pewien ze chcesz dodac nowe zadanie?") == true) {
      let newObject = new Task(
        form.nazwa.value,
        form.persons.value,
        form.categories.value,
        form.statuses.value
      );

      var data = await pushData(newObject, urlTasks);

      tasksArray.push(data);

      addDataToTable(tasksTable, tasksArray);
    }
  };

  form.onreset = () => {
    dlg.close();
  };
}

function AddValuesToNewTask() {
  var sel_persons = document.getElementById("persons");
  var sel_categories = document.getElementById("categories");
  var sel_statuses = document.getElementById("statuses");

  while (sel_persons.length > 0) {
    sel_persons.remove(0);
  }

  while (sel_categories.length > 0) {
    sel_categories.remove(0);
  }
  while (sel_statuses.length > 0) {
    sel_statuses.remove(0);
  }

  personsArray.forEach((element) => {
    var option = document.createElement("option");
    option.text = element.firstName + " " + element.lastName;
    sel_persons.add(option);
  });

  categoriesArray.forEach((element) => {
    var option = document.createElement("option");
    option.text = element.name;
    sel_categories.add(option);
  });

  taskStatusesArray.forEach((element) => {
    var option = document.createElement("option");
    option.text = element.name;
    sel_statuses.add(option);
  });
}

function createInitPersons() {
  var caption = personsTable.createCaption();
  caption.innerHTML = "<b>Łosoby<b/> ";

  var addPersonsButton = document.createElement("INPUT");
  addPersonsButton.setAttribute("value", "Dodaj Osobę");
  addPersonsButton.setAttribute("type", "button");
  addPersonsButton.style.marginLeft = "100px";
  caption.appendChild(addPersonsButton);

  let row = personsTable.insertRow();
  let cell = row.insertCell();

  cell.innerHTML = "LP";

  cell = row.insertCell();
  cell.innerHTML = "Imie";

  cell = row.insertCell();
  cell.innerHTML = "Nazwisko";

  for (let i = 0; i < personsArray.length; i++) {
    row = personsTable.insertRow();
    cell = row.insertCell();

    cell.innerHTML = i + 1;

    cell = row.insertCell();

    cell.innerHTML = personsArray[i].firstName;

    cell = row.insertCell();

    cell.innerHTML = personsArray[i].lastName;

    var inputButton = addEditButton(i, tasksArray[i].id);

    cell = row.insertCell();
    cell.appendChild(inputButton);

    var inputButton = addDeleteButton(i, tasksArray[i].id);

    cell.appendChild(inputButton);
  }
}

function createInitCategories() {
  var caption = categoriesTable.createCaption();
  caption.innerHTML = "<b>Kategorie<b/> ";

  var addCetegoryButton = document.createElement("INPUT");
  addCetegoryButton.setAttribute("value", "Dodaj Kategorię");
  addCetegoryButton.setAttribute("type", "button");
  addCetegoryButton.style.marginLeft = "100px";
  caption.appendChild(addCetegoryButton);

  let row = categoriesTable.insertRow();
  let cell = row.insertCell();

  cell.innerHTML = "LP";

  cell = row.insertCell();
  cell.innerHTML = "Nazwa";

  for (let i = 0; i < categoriesArray.length; i++) {
    row = categoriesTable.insertRow();
    cell = row.insertCell();

    cell.innerHTML = i + 1;

    cell = row.insertCell();
    cell.innerHTML = categoriesArray[i].name;

    var inputButton = addEditButton(i, tasksArray[i].id);

    cell = row.insertCell();
    cell.appendChild(inputButton);

    var inputButton = addDeleteButton(i, tasksArray[i].id);

    cell.appendChild(inputButton);
  }
}

function createInitStatuses() {
  var caption = statusesTable.createCaption();
  caption.innerHTML = "<b>Statusy Zadań<b/> ";

  var addStatusesButton = document.createElement("INPUT");
  addStatusesButton.setAttribute("value", "Dodaj Status");
  addStatusesButton.setAttribute("type", "button");
  addStatusesButton.style.marginLeft = "100px";
  caption.appendChild(addStatusesButton);

  let row = statusesTable.insertRow();
  let cell = row.insertCell();

  cell.innerHTML = "LP";

  cell = row.insertCell();

  cell.innerHTML = "Nazwa statusu";

  for (let i = 0; i < taskStatusesArray.length; i++) {
    row = statusesTable.insertRow();
    cell = row.insertCell();

    cell.innerHTML = i + 1;

    cell = row.insertCell();
    cell.innerHTML = taskStatusesArray[i].name;

    var inputButton = addEditButton(i, tasksArray[0].id);

    cell = row.insertCell();
    cell.appendChild(inputButton);

    var inputButton = addDeleteButton(i, tasksArray[0].id);

    cell.appendChild(inputButton);
  }
}

function addDeleteButton(index, id) {
  var inputButton = document.createElement("Input");
  inputButton.setAttribute("type", "button");
  inputButton.setAttribute("id", "delete-button");
  inputButton.onclick = (event) => {
    if (
      confirm(
        "Wlasnie usuwasz produkt nr " + (index + 1) + ". Jestes pewny?"
      ) == true
    ) {
      tasksArray = tasksArray.filter(
        (task) => tasksArray.indexOf(task) != index
      );
      fetch(urlTasks + "/" + id, {
        method: "DELETE",
      }).then((data) => {
        inputButton.parentNode.parentNode.remove();

        for (let i = index + 1; i < tasksArray.length + 1; i++) {
          tabela.deleteRow(index + 1);
        }
      });
      //localStorage.magazyn = JSON.stringify(magazynJSON);
    }
  };
  inputButton.setAttribute("value", "Usun");
  return inputButton;
}

function addEditButton(index, id) {
  var inputButton = document.createElement("Input");
  inputButton.setAttribute("type", "button");
  inputButton.setAttribute("id", "edit-button");
  var dlg = document.getElementById("edit-dialog");
  var form = document.getElementById("editForm");
  let row = tabela.rows[index + 1];
  var task = tasksArray[id - 1];

  inputButton.onclick = () => {
    form.reset();
    dlg.showModal();
    AddValuesToNewTask();
  };

  form.onsubmit = () => {};

  form.onreset = () => {
    dlg.close();
  };
  inputButton.setAttribute("value", "Edytuj");
  return inputButton;
}

function addDataToTable(table, array) {
  row = table.insertRow();
  cell = row.insertCell();

  index = array.length - 1;
  cell.innerHTML = index + 1;

  for (let i = 0; i < Object.values(array[index]).length - 1; i++) {
    cell = row.insertCell();
    cell.innerHTML = Object.values(array[index])[i];
  }
  /*
  var inputButton = addEditButton(index, magazynJSON[index].id);

  cell = row.insertCell();
  cell.appendChild(inputButton);

  var inputButton = addDeleteButton(index, magazynJSON[index].id);
  cell.appendChild(inputButton);

  */
  if (index % 2 == 0) row.style.backgroundColor = "LightGrey";
  else row.style.backgroundColor = "DarkGrey";
}

setDateOnNav();
fetchData();
