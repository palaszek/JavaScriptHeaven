class Osoba {
  constructor(imie, nazwisko) {
    this.imie = imie;
    this.nazwisko = nazwisko;
  }
}

let os1 = new Osoba("Joanna", "Dark");
let os2 = new Osoba("beata", "haha");

class Obiekt {
  constructor(nazwa, ilosc, cena) {
    this.nazwa = nazwa;
    this.ilosc = ilosc;
    this.cena = cena;
    this.suma = cena * ilosc;
    this.suma = Math.round(this.suma * 100) / 100;
    this.ktos = os1;
  }
}

let ob1 = new Obiekt("jablka", 1.5, 4.9);
let ob2 = new Obiekt("bulka", 5, 2.45);

const magazyn = [ob1, ob2];
var magazynJSON = [];
const url = "http://localhost:3000/produkt";

//localStorage.magazyn = JSON.stringify(magazyn);

//localStorage.clear();

let sumaParagonu = 0;

const out = document.getElementById("out");

const tabela = document.createElement("TABLE");
tabela.classList.add("left-table-content");
/*
if (localStorage.magazyn != undefined)
  magazynJSON = JSON.parse(localStorage.magazyn);
else {
  alert("Witaj! rozpocznij tworzenie paragonu przez dodanie produktu!");
  localStorage.magazyn = JSON.stringify(magazynJSON);
}
*/

const fetchDataZad = async () => {
  await fetch(url)
    .then((response) => response.json())
    .then(async (data) => {
      for (let produkt of data) {
        magazynJSON.push(produkt);
      }
      if (magazynJSON.length == 0) {
        alert("Witaj! rozpocznij tworzenie paragonu przez dodanie produktu!");
      }
    });
  //createInitParagon();
};

fetchDataZad();

function createInitParagon() {
  var caption = tabela.createCaption();
  var data = new Date().toLocaleDateString();
  caption.innerHTML = "<b>ZADANIA<b/> ";

  let row = tabela.insertRow();
  let cell = row.insertCell();

  cell.innerHTML = "LP";
  cell.style.textAlign = "center";

  cell = row.insertCell();
  cell.style.textAlign = "center";
  cell.innerHTML = "Nazwa";

  cell = row.insertCell();
  cell.style.textAlign = "center";
  cell.innerHTML = "Ilosc";

  cell = row.insertCell();
  cell.style.textAlign = "center";
  cell.innerHTML = "Cena (zł)";

  cell = row.insertCell();
  cell.style.textAlign = "center";
  cell.innerHTML = "Suma (zł)";

  for (let i = 0; i < magazynJSON.length; i++) {
    row = tabela.insertRow();
    cell = row.insertCell();

    cell.style.width = "25px";
    cell.style.textAlign = "center";
    cell.style.padding = "5px";

    cell.innerHTML = i + 1;

    cell = row.insertCell();
    cell.style.width = "125px";
    cell.innerHTML = magazynJSON[i].nazwa;

    cell = row.insertCell();
    cell.style.width = "50px";
    cell.style.textAlign = "center";
    cell.innerHTML = magazynJSON[i].ilosc;

    cell = row.insertCell();
    cell.style.width = "60px";
    cell.style.textAlign = "center";
    cell.innerHTML = magazynJSON[i].cena.toFixed(2);

    cell = row.insertCell();
    cell.style.width = "75px";
    cell.style.textAlign = "center";
    cell.innerHTML = magazynJSON[i].suma.toFixed(2);
    sumaParagonu += magazynJSON[i].suma;

    var inputButton = addEditButton(i, magazynJSON[i].id);

    cell = row.insertCell();
    cell.appendChild(inputButton);

    var inputButton = addDeleteButton(i, magazynJSON[i].id);

    cell.appendChild(inputButton);

    if (i % 2 == 0) row.style.backgroundColor = "LightGrey";
    else row.style.backgroundColor = "DarkGrey";
  }
  addRazem();
  out.appendChild(tabela);

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
              tabela.deleteRow(magazynJSON.length);
              addData(magazynJSON.length);
              addRazem();
            });

          //localStorage.magazyn = JSON.stringify(magazynJSON);
        }
      }
    }
  };

  form.onreset = () => {
    dlg.close();
  };*/
}

function addData(index) {
  row = tabela.insertRow();
  cell = row.insertCell();

  cell.style.width = "25px";
  cell.style.textAlign = "center";
  cell.style.padding = "5px";
  index--;
  cell.innerHTML = index + 1;

  cell = row.insertCell();
  cell.style.width = "125px";
  cell.innerHTML = magazynJSON[index].nazwa;

  cell = row.insertCell();
  cell.style.width = "50px";
  cell.style.textAlign = "center";
  cell.innerHTML = magazynJSON[index].ilosc;

  cell = row.insertCell();
  cell.style.width = "60px";
  cell.style.textAlign = "center";
  cell.innerHTML = magazynJSON[index].cena.toFixed(2);

  cell = row.insertCell();
  cell.style.width = "75px";
  cell.style.textAlign = "center";
  cell.innerHTML = magazynJSON[index].suma.toFixed(2);
  sumaParagonu += magazynJSON[index].suma;

  var inputButton = addEditButton(index, magazynJSON[index].id);

  cell = row.insertCell();
  cell.appendChild(inputButton);

  var inputButton = addDeleteButton(index, magazynJSON[index].id);
  cell.appendChild(inputButton);

  if (index % 2 == 0) row.style.backgroundColor = "LightGrey";
  else row.style.backgroundColor = "DarkGrey";
}

/*function addDeleteButton(index, id) {
  var inputButton = document.createElement("Input");
  inputButton.setAttribute("type", "button");
  inputButton.onclick = (event) => {
    if (
      confirm(
        "Wlasnie usuwasz produkt nr " + (index + 1) + ". Jestes pewny?"
      ) == true
    ) {
      sumaParagonu -= magazynJSON[index].suma;
      magazynJSON = magazynJSON.filter(
        (produkt) => magazynJSON.indexOf(produkt) != index
      );
      fetch(url + "/" + id, {
        method: "DELETE",
      }).then((data) => {
        inputButton.parentNode.parentNode.remove();

        for (let i = index + 1; i < magazynJSON.length + 2; i++) {
          tabela.deleteRow(index + 1);
        }

        for (let i = index + 1; i < magazynJSON.length + 1; i++) {
          sumaParagonu -= magazynJSON[i - 1].suma;
          addData(i);
        }

        addRazem();
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
  var dlg = document.createElement("dialog");
  var form = document.getElementById("editForm").cloneNode(true);
  let row = tabela.rows[index + 1];

  dlg.appendChild(form);
  out.appendChild(dlg);

  inputButton.onclick = () => {
    form.reset();
    dlg.showModal();
  };

  form.onsubmit = () => {
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
        if (confirm("Jestes pewien ze chcesz edytowac ten produkt?") == true) {
          magazynJSON[index].nazwa = form.nazwa.value;
          magazynJSON[index].ilosc = parseFloat(form.ilosc.value);
          magazynJSON[index].cena = parseFloat(form.cena.value);
          magazynJSON[index].suma =
            magazynJSON[index].ilosc * magazynJSON[index].cena;

          fetch(url + "/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(magazynJSON[index]),
          }).then((data) => {
            row.cells[1].innerHTML = form.nazwa.value;
            row.cells[2].innerHTML = parseFloat(form.ilosc.value);
            row.cells[3].innerHTML = parseFloat(form.cena.value).toFixed(2);
            row.cells[4].innerHTML = magazynJSON[index].suma.toFixed(2);

            row = tabela.rows[magazynJSON.length + 1];
            row.cells[4].innerHTML = policzRazem().toFixed(2);
          });
          //localStorage.magazyn = JSON.stringify(magazynJSON);
        }
      }
    }
  };

  form.onreset = () => {
    dlg.close();
  };
  inputButton.setAttribute("value", "Edytuj");
  return inputButton;
}*/

function addRazem() {
  row = tabela.insertRow();
  for (let i = 0; i < 3; i++) {
    cell = row.insertCell();
  }

  cell = row.insertCell();
  cell.style.textAlign = "center";
  cell.innerHTML = "Razem";

  cell = row.insertCell();
  cell.style.textAlign = "center";
  cell.innerHTML = sumaParagonu.toFixed(2);

  cell.style.padding = "5px";

  if (magazyn.length % 2 == 0) row.style.backgroundColor = "LightGrey";
  else row.style.backgroundColor = "DarkGrey";
}

function policzRazem() {
  sumaParagonu = 0;
  magazynJSON.forEach((element) => {
    sumaParagonu += element.suma;
  });
  return sumaParagonu;
}
