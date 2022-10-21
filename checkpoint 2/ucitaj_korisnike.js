let firebaseUrl="https://projekat-f829c-default-rtdb.europe-west1.firebasedatabase.app";
// URL Firebase projekta - Obratiti paznju da je uklonjen znak / sa kraja!
// Obavezno postavite URL do svog Firebase projekta da bi sve radilo kako treba
let korisnici = {}; // Objekat koji ce cuvati sve automobile sa Firebase-a

// Pozivamo ucitavanje svih automobila prilikom ucitavanja stranice
dobavi_korisnike();

/*
    Funkcija koja dobavlja sve automobile i dodaje ih u tabelu
*/
function dobavi_korisnike() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        // Brisanje prethodnog sadrzaja tabele
        removeTableRows("sviKorisnici");

        korisnici = JSON.parse(request.responseText);
        console.log(korisnici);

        // Izdvajanje svakog pojedinacnog automobila iteriranjem kroz atribute objekta
        for (let id in korisnici) {
          let korisnik = korisnici[id];
          // console.log(car);
          dodaj_u_tabelu("sviKorisnici", id, korisnik);
        }
      } else {
        alert("Greška prilikom učitavanja svih korisnika.");
      }
    }
  };
  
  request.open("GET", firebaseUrl+"/korisnici.json");
  request.send();
}

/*
    Funkcija koja otvara stranicu za izmenu
*/
function showEditPage() {
  let clickedBtn = this;
  const button = document.getElementById('confirmTrigger');
  const confirmResult = document.getElementById('confirmResult');
  clickedBtn.addEventListener('click', function (e) {
      if (window.confirm('Da li ste sigurni da zelite da izmenite korisnika?')) {
          confirmResult.innerText = 'Da';
          let korisnikId = clickedBtn.getAttribute("data-id");
          window.location.href = "izmena_korisnickih_podataka.html?id=" + korisnikId;
      } else {
          confirmResult.innerText = 'Ne';
          window.location.href = "administrator.html";
      }
      
});
  
  // console.log(clickedBtn);
//let korisnikId = clickedBtn.getAttribute("data-id");
//  window.location.href = "izmena_korisnickih_podataka.html?id=" + korisnikId;
}

function showStranicaKorisnika(){
  let clickedBtn = this;
  let korisnikId = clickedBtn.getAttribute("data-id");
  window.location.href = "korisnik_podaci.html?id=" + korisnikId;
}


function obrisiKorisnika() {
/* let clickedBtn = this;
  let korisnikId = clickedBtn.getAttribute("data-id");

  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        dobavi_korisnike();
      } else {
        alert("Greška prilikom brisanja korisnika.");
      }
    }
  };

  request.open("DELETE", firebaseUrl + "/korisnici/" + korisnikId + ".json");
  request.open("DELETE", firebaseUrl + korisnikId)
  request.send();*/
  let clickedBtn = this;
  const button = document.getElementById('confirmTrigger');
  const confirmResult = document.getElementById('confirmResult');
  clickedBtn.addEventListener('click', function (e) {
      if (window.confirm('Da li ste sigurni da zelite da izmenite predstavu?')) {
          confirmResult.innerText = 'Da';
          let korisnikId = clickedBtn.getAttribute("data-id");
          let request = new XMLHttpRequest();

          request.onreadystatechange = function () {
            if (this.readyState == 4) {
              if (this.status == 200) {
                dobavi_korisnike();
              } else {
                alert("Greška prilikom brisanja korisnika.");
              }
            }
          };
        
          request.open("DELETE", firebaseUrl + "/korisnici/" + korisnikId + ".json");
          request.send();
      } else {
          confirmResult.innerText = 'Ne';
      }})
}

// *********************************************
//               POMOCNE FUNCKIJE
// *********************************************

/* 
    Pomocna funckija koja dodaje red u tabelu
*/
function dodaj_u_tabelu(tBody, id, korisnik) {
  let korisnikRow = document.createElement("tr");

  let adresaTd = document.createElement("td");
  adresaTd.innerText = korisnik.adresa;
  korisnikRow.appendChild(adresaTd);


  let datumRodjenjaTd = document.createElement("td");
  datumRodjenjaTd.innerText = korisnik.datumRodjenja;
  korisnikRow.appendChild(datumRodjenjaTd);

  let emailTd = document.createElement("td");
  emailTd.innerText = korisnik.email;
  korisnikRow.appendChild(emailTd);

  let imeTd = document.createElement("td");
  imeTd.innerText = korisnik.ime;
  korisnikRow.appendChild(imeTd);

  let korisnickoimeTd = document.createElement("td");
  korisnickoimeTd.innerText = korisnik.korisnickoIme;
  korisnikRow.appendChild(korisnickoimeTd);

  let lozinkaTd = document.createElement("td");
  lozinkaTd.innerText = korisnik.lozinka;
  korisnikRow.appendChild(lozinkaTd);

  let prezimeTd = document.createElement("td");
  prezimeTd.innerText = korisnik.prezime;
  korisnikRow.appendChild(prezimeTd);

  let telefonTd = document.createElement("td");
  telefonTd.innerText = korisnik.telefon;
  korisnikRow.appendChild(telefonTd);



  // <button type="button" onclick="showEditPage()" data-id="neki_id">Izmeni</button>
  let editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.classList="btn submit-btn";
  editBtn.innerText = "Izmeni";
  editBtn.onclick = showEditPage;
  editBtn.setAttribute("data-id", id);

  let editTd = document.createElement("td");
  editTd.appendChild(editBtn);
  korisnikRow.appendChild(editTd);

  let stranicaKorisnika = document.createElement("button");
  stranicaKorisnika.classList="btn submit-btn";
  stranicaKorisnika.type = "button";
  stranicaKorisnika.innerText = "Stranica korisnika";
  stranicaKorisnika.onclick = showStranicaKorisnika;
  stranicaKorisnika.setAttribute("data-id", id);

  let stranicaKorisnikaTd = document.createElement("td");
  stranicaKorisnikaTd.appendChild(stranicaKorisnika);
  korisnikRow.appendChild(stranicaKorisnikaTd);

  let deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.classList="btn submit-btn";
  deleteBtn.innerText = "Obriši";
  deleteBtn.onclick = obrisiKorisnika;
  deleteBtn.setAttribute("data-id", id);

  let deleteTd = document.createElement("td");
  deleteTd.appendChild(deleteBtn);
  korisnikRow.appendChild(deleteTd);

  document.getElementById(tBody).appendChild(korisnikRow);
}

/*
    Pomocna funkcija koja brise sve redove iz tabele
*/
function removeTableRows(tBodyId) {
  let tBody = document.getElementById(tBodyId);
  while (tBody.firstChild) {
    tBody.removeChild(tBody.lastChild);
  }
}