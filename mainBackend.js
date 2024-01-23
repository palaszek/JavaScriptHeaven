class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class Task {
  constructor(taskName, assignedPerson, status) {
    this.taskName = taskName;
    this.assignedPerson = assignedPerson;
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

const urlTasks = "http://localhost:3000/Tasks";
const urlPersons = "http://localhost:3000/Persons";
const urlCategories = "http://localhost:3000/Categories";
const urlTaskStatuses = "http://localhost:3000/TaskStatuses";

var tasks = [];
var persons = [];
var categories = [];
var taskStatuses = [];

persons.push[new Person("Nie przypisano", "Nie przypisano")];
categories.push[new Categories("Brak Kategorii")];
taskStatuses.push[
  (new TaskStatus("Rozpoczęty"),
  new TaskStatus("Zakończony"),
  new TaskStatus("W Realizacji"))
];

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

fetchData();
