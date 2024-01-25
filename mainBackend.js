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

var tasks = [];
var persons = [];
var categories = [];
var taskStatuses = [];

const fetchData = async () => {
  await fetch(urlTasks)
    .then((response) => response.json())
    .then(async (data) => {
      for (let task of data) {
        tasks.push(task);
      }
      if (tasks.length == 0) {
        alert("Witaj! Wprowadź tekst na powitanie :D");
      }
    });

  await fetch(urlPersons)
    .then((response) => response.json())
    .then(async (data) => {
      for (let person of data) {
        persons.push(person);
      }
      if (persons.length == 0) {
        let defaultName = new Person("Nie przypisano", "Nie przypisano");
        persons.push[defaultName];
        pushData(defaultName, urlPersons);
      }
    });

  await fetch(urlCategories)
    .then((response) => response.json())
    .then(async (data) => {
      for (let category of data) {
        categories.push(category);
      }
      if (persons.length == 0) {
        let defaultCategorie = new Categories("Brak Kategorii");
        persons.push[defaultCategorie];
        pushData(defaultCategorie, urlCategories);
      }
    });

  await fetch(urlTaskStatuses)
    .then((response) => response.json())
    .then(async (data) => {
      for (let status of data) {
        taskStatuses.push(status);
      }
      if (taskStatuses.length == 0) {
        let defaultStatus1 = new TaskStatus("Brak Kategorii");
        let defaultStatus2 = new TaskStatus("Zakończony");
        let defaultStatus3 = new TaskStatus("W Realizacji");
        taskStatuses.push[(defaultStatus1, defaultStatus2, defaultStatus3)];
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
  caption.innerHTML = "<b>ZADANIA<b/> ";

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

  for (let i = 0; i < tasksTable.length; i++) {
    row = tasksTable.insertRow();
    cell = row.insertCell();

    cell.style.width = "25px";
    cell.style.textAlign = "center";
    cell.style.padding = "5px";

    cell.innerHTML = i + 1;

    cell = row.insertCell();
    cell.style.width = "125px";
    cell.innerHTML = tasks[i].taskName;

    cell = row.insertCell();
    cell.style.width = "50px";
    cell.style.textAlign = "center";
    cell.innerHTML = tasks[i].assignedPerson;

    cell = row.insertCell();
    cell.style.width = "60px";
    cell.style.textAlign = "center";
    cell.innerHTML = tasks[i].category;

    cell = row.insertCell();
    cell.style.width = "75px";
    cell.style.textAlign = "center";
    cell.innerHTML = tasks[i].status;

    // var inputButton = addEditButton(i, tasks[i].id);

    cell = row.insertCell();
    //cell.appendChild(inputButton);

    //var inputButton = addDeleteButton(i, magazynJSON[i].id);

    //cell.appendChild(inputButton);

    if (i % 2 == 0) row.style.backgroundColor = "LightGrey";
    else row.style.backgroundColor = "DarkGrey";
  }

  const newProductButton = document.getElementById("newProductButton");
  const dlg = document.getElementById("addTaskDialog");
  const form = document.getElementById("addForm");

  newProductButton.onclick = () => {
    form.reset();
    dlg.showModal();
    AddValuesToNewTask();
  };

  form.onsubmit = (event) => {
    if (
      !parseFloat(form.ilosc.value) ||
      parseFloat(form.ilosc.value) <= 0 ||
      !parseFloat(form.cena.value) ||
      parseFloat(form.cena.value) <= 0
    ) {
      alert("Dodaj wartosci liczbowe dodatnie w polach ilosc oraz cena!");
    } else {
      if (!form.nazwa.value) {
        alert("Podaj nazwe produktu!");
      } else {
        if (confirm("Jestes pewien ze chcesz dodac ten produkt?") == true) {
          let newObject = new Obiekt(
            form.nazwa.value,
            parseFloat(form.ilosc.value),
            parseFloat(form.cena.value)
          );

          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newObject),
          })
            .then((response) => response.json())
            .then((data) => {
              magazynJSON.push(data);
              addData(magazynJSON.length);
            });
        }
      }
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

  for (let i = 0; i <= sel_persons.length + 1; i++) {
    sel_persons.remove(0);
  }

  for (let i = 0; i <= sel_categories.length + 1; i++) {
    sel_categories.remove(0);
  }

  for (let i = 0; i <= sel_statuses.length + 1; i++) {
    sel_statuses.remove(0);
  }

  persons.forEach((element) => {
    var option = document.createElement("option");
    option.text = element.firstName + " " + element.lastName;
    sel_persons.add(option);
  });

  categories.forEach((element) => {
    var option = document.createElement("option");
    option.text = element.name;
    sel_categories.add(option);
  });

  taskStatuses.forEach((element) => {
    var option = document.createElement("option");
    option.text = element.name;
    sel_statuses.add(option);
  });
}

function createInitPersons() {
  var caption = personsTable.createCaption();
  caption.innerHTML = "<b>Łosoby<b/> ";

  let row = personsTable.insertRow();
  let cell = row.insertCell();

  cell.innerHTML = "LP";

  cell = row.insertCell();
  cell.innerHTML = "Imie";

  cell = row.insertCell();
  cell.innerHTML = "Nazwisko";

  for (let i = 0; i < persons.length; i++) {
    row = personsTable.insertRow();
    cell = row.insertCell();

    cell.innerHTML = i + 1;

    cell = row.insertCell();

    cell.innerHTML = persons[i].firstName;

    cell = row.insertCell();

    cell.innerHTML = persons[i].lastName;

    // var inputButton = addEditButton(i, tasks[i].id);

    cell = row.insertCell();
    //cell.appendChild(inputButton);

    //var inputButton = addDeleteButton(i, magazynJSON[i].id);

    //cell.appendChild(inputButton);
  }

  /*const newProductButton = document.getElementById("newProductButton");
  const dlg = document.getElementById("addDialog");
  const form = document.getElementById("addForm");

  newProductButton.onclick = () => {
    form.reset();
    dlg.showModal();
  };*/

  /*form.onsubmit = (event) => {
    if (
      !parseFloat(form.ilosc.value) ||
      parseFloat(form.ilosc.value) <= 0 ||
      !parseFloat(form.cena.value) ||
      parseFloat(form.cena.value) <= 0
    ) {
      alert("Dodaj wartosci liczbowe dodatnie w polach ilosc oraz cena!");
    } else {
      if (!form.nazwa.value) {
        alert("Podaj nazwe produktu!");
      } else {
        if (confirm("Jestes pewien ze chcesz dodac ten produkt?") == true) {
          let newObject = new Obiekt(
            form.nazwa.value,
            parseFloat(form.ilosc.value),
            parseFloat(form.cena.value)
          );

          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newObject),
          })
            .then((response) => response.json())
            .then((data) => {
              magazynJSON.push(data);
              addData(magazynJSON.length);
            });
        }
      }
    }
  };

  form.onreset = () => {
    dlg.close();
  };*/
}

function createInitCategories() {
  var caption = categoriesTable.createCaption();
  caption.innerHTML = "<b>Kategorie<b/> ";

  let row = categoriesTable.insertRow();
  let cell = row.insertCell();

  cell.innerHTML = "LP";

  cell = row.insertCell();
  cell.innerHTML = "Nazwa";

  for (let i = 0; i < categories.length; i++) {
    row = categoriesTable.insertRow();
    cell = row.insertCell();

    cell.innerHTML = i + 1;

    cell = row.insertCell();
    cell.innerHTML = categories[i].name;

    // var inputButton = addEditButton(i, tasks[i].id);

    cell = row.insertCell();
    //cell.appendChild(inputButton);

    //var inputButton = addDeleteButton(i, magazynJSON[i].id);

    //cell.appendChild(inputButton);
  }

  /*const newProductButton = document.getElementById("newProductButton");
  const dlg = document.getElementById("addDialog");
  const form = document.getElementById("addForm");

  newProductButton.onclick = () => {
    form.reset();
    dlg.showModal();
  };*/

  /*form.onsubmit = (event) => {
    if (
      !parseFloat(form.ilosc.value) ||
      parseFloat(form.ilosc.value) <= 0 ||
      !parseFloat(form.cena.value) ||
      parseFloat(form.cena.value) <= 0
    ) {
      alert("Dodaj wartosci liczbowe dodatnie w polach ilosc oraz cena!");
    } else {
      if (!form.nazwa.value) {
        alert("Podaj nazwe produktu!");
      } else {
        if (confirm("Jestes pewien ze chcesz dodac ten produkt?") == true) {
          let newObject = new Obiekt(
            form.nazwa.value,
            parseFloat(form.ilosc.value),
            parseFloat(form.cena.value)
          );

          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newObject),
          })
            .then((response) => response.json())
            .then((data) => {
              magazynJSON.push(data);
              addData(magazynJSON.length);
            });
        }
      }
    }
  };

  form.onreset = () => {
    dlg.close();
  };*/
}

function createInitStatuses() {
  var caption = statusesTable.createCaption();
  caption.innerHTML = "<b>Statusy Zadań<b/> ";

  let row = statusesTable.insertRow();
  let cell = row.insertCell();

  cell.innerHTML = "LP";

  cell = row.insertCell();

  cell.innerHTML = "Nazwa statusu";

  for (let i = 0; i < taskStatuses.length; i++) {
    row = statusesTable.insertRow();
    cell = row.insertCell();

    cell.innerHTML = i + 1;

    cell = row.insertCell();
    cell.innerHTML = taskStatuses[i].name;

    // var inputButton = addEditButton(i, tasks[i].id);

    cell = row.insertCell();
    //cell.appendChild(inputButton);

    //var inputButton = addDeleteButton(i, magazynJSON[i].id);

    //cell.appendChild(inputButton);
  }

  /*const newProductButton = document.getElementById("newProductButton");
  const dlg = document.getElementById("addTaskDialog");
  const form = document.getElementById("addForm");

  newProductButton.onclick = () => {
    form.reset();
    dlg.showModal();
  };*/

  /*form.onsubmit = (event) => {
    if (
      !parseFloat(form.ilosc.value) ||
      parseFloat(form.ilosc.value) <= 0 ||
      !parseFloat(form.cena.value) ||
      parseFloat(form.cena.value) <= 0
    ) {
      alert("Dodaj wartosci liczbowe dodatnie w polach ilosc oraz cena!");
    } else {
      if (!form.nazwa.value) {
        alert("Podaj nazwe produktu!");
      } else {
        if (confirm("Jestes pewien ze chcesz dodac ten produkt?") == true) {
          let newObject = new Obiekt(
            form.nazwa.value,
            parseFloat(form.ilosc.value),
            parseFloat(form.cena.value)
          );

          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newObject),
          })
            .then((response) => response.json())
            .then((data) => {
              magazynJSON.push(data);
              addData(magazynJSON.length);
            });
        }
      }
    }
  };

  form.onreset = () => {
    dlg.close();
  };*/
}

setDateOnNav();
fetchData();
