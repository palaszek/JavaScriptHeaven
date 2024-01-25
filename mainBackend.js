const dataType = Object.freeze({
  ETask: 0,
  EPerson: 1,
  ECategory: 2,
  EStatus: 3,
});

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

class Status {
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

personsTable.style.display = "";

const urlTasks = "http://localhost:3000/Tasks";
const urlPersons = "http://localhost:3000/Persons";
const urlCategories = "http://localhost:3000/Categories";
const urlTaskStatuses = "http://localhost:3000/TaskStatuses";

var tasksArray = [];
var personsArray = [];
var categoriesArray = [];
var statusesArray = [];

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
        statusesArray.push(status);
      }
      if (statusesArray.length == 0) {
        let defaultStatus1 = new Status("Brak Kategorii");
        let defaultStatus2 = new Status("Zakończony");
        let defaultStatus3 = new Status("W Realizacji");
        statusesArray.push[(defaultStatus1, defaultStatus2, defaultStatus3)];
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
      console.log("Updated " + data);
    });
}

async function deleteData(id, url) {
  await fetch(url + "/" + id, {
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

    var inputButton = addUpdateButton(
      tasksTable,
      tasksArray,
      i,
      tasksArray[i].id,
      dataType.ETask
    );

    cell = row.insertCell();
    cell.appendChild(inputButton);

    var inputButton = addDeleteButton(i, tasksArray[i].id);

    cell.appendChild(inputButton);
  }

  const dlg = document.getElementById("add-task-dialog");
  const form = document.getElementById("add-task-form");
  const newProductButton = addCreateButton(dataType.ETask, form, dlg);
}

function deleteOptions(sel) {
  while (sel.length > 0) {
    sel.remove(0);
  }
}

function AddValuesToNewTask() {
  var sel_personsAdd = document.getElementById("addTaskPersons");
  var sel_categoriesAdd = document.getElementById("addTaskCategories");
  var sel_statusesAdd = document.getElementById("addTaskStatuses");

  var sel_personsEdit = document.getElementById("editTaskPersons");
  var sel_categoriesEdit = document.getElementById("editTaskCategories");
  var sel_statusesEdit = document.getElementById("editTaskStatuses");

  deleteOptions(sel_personsAdd);
  deleteOptions(sel_categoriesAdd);
  deleteOptions(sel_statusesAdd);

  deleteOptions(sel_personsEdit);
  deleteOptions(sel_categoriesEdit);
  deleteOptions(sel_statusesEdit);

  personsArray.forEach((element) => {
    var option = document.createElement("option");
    option.text = element.firstName + " " + element.lastName;
    var option2 = option.cloneNode(true);
    sel_personsEdit.add(option);
    sel_personsAdd.add(option2);
  });

  categoriesArray.forEach((element) => {
    var option = document.createElement("option");
    option.text = element.name;
    var option2 = option.cloneNode(true);
    sel_categoriesEdit.add(option);
    sel_categoriesAdd.add(option2);
  });

  statusesArray.forEach((element) => {
    var option = document.createElement("option");
    option.text = element.name;
    var option2 = option.cloneNode(true);
    sel_statusesEdit.add(option);
    sel_statusesAdd.add(option2);
  });
}

function createInitPersons() {
  var caption = personsTable.createCaption();
  caption.innerHTML = "<b>Łosoby<b/> ";

  var form = document.getElementById("addPersonForm");
  var dlg = document.getElementById("add-person-dialog");
  var addPersonsButton = addCreateButton(dataType.EPerson, form, dlg);
  caption.appendChild(addPersonsButton);

  let row = personsTable.insertRow();
  let cell = row.insertCell();

  cell.innerHTML = "LP";

  cell = row.insertCell();
  cell.innerHTML = "Imie";

  cell = row.insertCell();
  cell.innerHTML = "Nazwisko";

  cell = row.insertCell();

  for (let i = 0; i < personsArray.length; i++) {
    row = personsTable.insertRow();
    cell = row.insertCell();

    cell.innerHTML = i + 1;

    cell = row.insertCell();

    cell.innerHTML = personsArray[i].firstName;

    cell = row.insertCell();

    cell.innerHTML = personsArray[i].lastName;

    var inputButton = addUpdateButton(
      personsTable,
      personsArray,
      i,
      personsArray[0].id,
      dataType.EPerson
    );
    cell = row.insertCell();
    cell.appendChild(inputButton);

    var inputButton = addDeleteButton(i, tasksArray[i].id);

    cell.appendChild(inputButton);
  }
}

function createInitCategories() {
  var caption = categoriesTable.createCaption();
  caption.innerHTML = "<b>Kategorie<b/> ";

  var form = document.getElementById("addCategoryForm");
  var dlg = document.getElementById("add-category-dialog");
  var addCetegoryButton = addCreateButton(dataType.ECategory, form, dlg);
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

    var inputButton = addUpdateButton(
      categoriesTable,
      categoriesArray,
      i,
      categoriesArray[0].id,
      dataType.ECategory
    );
    cell = row.insertCell();
    cell.appendChild(inputButton);

    var inputButton = addDeleteButton(i, tasksArray[i].id);

    cell.appendChild(inputButton);
  }
}

function createInitStatuses() {
  var caption = statusesTable.createCaption();
  caption.innerHTML = "<b>Statusy Zadań<b/> ";

  var form = document.getElementById("addStatusForm");
  var dlg = document.getElementById("add-status-dialog");
  var addStatusesButton = addCreateButton(dataType.EStatus, form, dlg);
  caption.appendChild(addStatusesButton);

  let row = statusesTable.insertRow();
  let cell = row.insertCell();

  cell.innerHTML = "LP";

  cell = row.insertCell();

  cell.innerHTML = "Nazwa statusu";

  for (let i = 0; i < statusesArray.length; i++) {
    row = statusesTable.insertRow();
    cell = row.insertCell();

    cell.innerHTML = i + 1;

    cell = row.insertCell();
    cell.innerHTML = statusesArray[i].name;

    var inputButton = addUpdateButton(
      statusesTable,
      statusesArray,
      i,
      statusesArray[0].id,
      dataType.EStatus
    );

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
      deleteData(id, urlTasks);
      inputButton.parentNode.parentNode.remove();
    }
  };
  inputButton.setAttribute("value", "Usun");
  return inputButton;
}

function addUpdateButton(table, array, index, id, type) {
  var inputButton = document.createElement("Input");
  inputButton.setAttribute("type", "button");
  let form;
  let dlg;
  let row = table.rows[index + 1];
  inputButton.setAttribute("id", "edit-button");

  switch (type) {
    case dataType.ETask:
      //inputButton.setAttribute("id", "edit-button");
      dlg = document.getElementById("edit-task-dialog");
      form = document.getElementById("edit-task-form");
      break;
    case dataType.EPerson:
      //inputButton.setAttribute("id", "edit-button");
      dlg = document.getElementById("edit-person-dialog");
      form = document.getElementById("edit-person-form");
      break;
    case dataType.ECategory:
      //inputButton.setAttribute("id", "edit-button");
      dlg = document.getElementById("edit-category-dialog");
      form = document.getElementById("edit-category-form");
      break;
    case dataType.ECategory:
      //inputButton.setAttribute("id", "edit-button");
      dlg = document.getElementById("edit-status-dialog");
      form = document.getElementById("edit-status-form");
      break;
    default:
      dlg = document.getElementById("edit-task-dialog");
      form = document.getElementById("edit-task-form");
      break;
  }

  inputButton.onclick = () => {
    form.reset();
    dlg.showModal();
    if (type == dataType.ETask) {
      AddValuesToNewTask();
    }
  };

  switch (type) {
    case dataType.ETask:
      form.onsubmit = () => {
        array[index][Object.keys(array[index])[0]] = form.name.value;
        array[index][Object.keys(array[index])[1]] = form.persons.value;
        array[index][Object.keys(array[index])[2]] = form.categories.value;
        array[index][Object.keys(array[index])[3]] = form.statuses.value;

        updateData(array[index], urlTasks);

        row.cells[1].innerHTML = form.name.value;
        row.cells[2].innerHTML = form.persons.value;
        row.cells[3].innerHTML = form.categories.value;
        row.cells[4].innerHTML = form.statuses.value;
      };
      break;
    case dataType.EPerson:
      form.onsubmit = () => {
        array[index][Object.keys(array[index])[0]] = form.personFirstname.value;
        array[index][Object.keys(array[index])[1]] = form.personLastname.value;

        updateData(array[index], urlPersons);

        row.cells[1].innerHTML = form.personFirstname.value;
        row.cells[2].innerHTML = form.personLastname.value;
      };
    case dataType.ECategory:
      form.onsubmit = () => {
        array[index][Object.keys(array[index])[0]] = form.categoryName.value;

        updateData(array[index], urlCategories);

        row.cells[1].innerHTML = form.categoryName.value;
      };

      break;
    case dataType.EStatus:
      form.onsubmit = () => {
        array[index][Object.keys(array[index])[0]] = form.statusName.value;

        updateData(array[index], urlTaskStatuses);

        row.cells[1].innerHTML = form.statusName.value;
      };

      break;
    default:
      break;
  }

  form.onreset = () => {
    dlg.close();
  };
  inputButton.setAttribute("value", "Edytuj");
  return inputButton;
}

function addDataToTable(table, array, type) {
  row = table.insertRow();
  cell = row.insertCell();

  index = array.length - 1;
  cell.innerHTML = index + 1;

  for (let i = 0; i < Object.values(array[index]).length - 1; i++) {
    cell = row.insertCell();
    cell.innerHTML = Object.values(array[index])[i];
  }

  var inputButton = addUpdateButton(table, array, index, array[index].id, type);

  cell = row.insertCell();
  cell.appendChild(inputButton);

  var inputButton = addDeleteButton(index, array[index].id);
  cell.appendChild(inputButton);

  if (index % 2 == 0) row.style.backgroundColor = "LightGrey";
  else row.style.backgroundColor = "DarkGrey";
}

function addCreateButton(type, form, dlg) {
  var addButton = document.createElement("INPUT");
  addButton.setAttribute("type", "button");
  addButton.classList.add("add-button");
  addButton.setAttribute("id", "add-button");

  switch (type) {
    case dataType.ECategory:
      addButton.setAttribute("value", "Dodaj Kategorię");
      addButton.onclick = () => {
        form.reset();
        dlg.showModal();
        AddValuesToNewTask();
      };

      form.onsubmit = async (event) => {
        let newObject = new Categories(form.categoryName.value);

        var data = await pushData(newObject, urlCategories);

        categoriesArray.push(data);

        addDataToTable(categoriesTable, categoriesArray, type);
      };

      form.onreset = () => {
        dlg.close();
      };
      break;
    case dataType.EPerson:
      addButton.setAttribute("value", "Dodaj Osobę");
      addButton.onclick = () => {
        form.reset();
        dlg.showModal();
        AddValuesToNewTask();
      };

      form.onsubmit = async (event) => {
        let newObject = new Person(
          form.personFirstname.value,
          form.personLastname.value
        );

        var data = await pushData(newObject, urlPersons);

        personsArray.push(data);

        addDataToTable(personsTable, personsArray, type);
      };

      form.onreset = () => {
        dlg.close();
      };
      break;
    case dataType.EStatus:
      addButton.setAttribute("value", "Dodaj Status");
      addButton.onclick = () => {
        form.reset();
        dlg.showModal();
        AddValuesToNewTask();
      };

      form.onsubmit = async (event) => {
        let newObject = new Status(form.statusName.value);

        var data = await pushData(newObject, urlTaskStatuses);

        statusesArray.push(data);

        addDataToTable(statusesTable, statusesArray, type);
      };

      form.onreset = () => {
        dlg.close();
      };
      break;
    case dataType.ETask:
      addButton = document.getElementById("new-task-button");
      addButton.setAttribute("value", "Utwórz Zadanie");
      addButton.onclick = () => {
        form.reset();
        dlg.showModal();
        AddValuesToNewTask();
      };

      form.onsubmit = async (event) => {
        let newObject = new Task(
          form.name.value,
          form.persons.value,
          form.categories.value,
          form.statuses.value
        );

        var data = await pushData(newObject, urlTasks);

        tasksArray.push(data);
        console.log(data);
        addDataToTable(tasksTable, tasksArray, type);
      };

      form.onreset = () => {
        dlg.close();
      };
      break;
  }
  return addButton;
}

setDateOnNav();
fetchData();
