// URL Firebase projekta - Obratiti paznju da je uklonjen znak / sa kraja!
// Obavezno postavite URL do svog Firebase projekta da bi sve radilo kako treba
let firebaseUrl ="https://projekat-f829c-default-rtdb.europe-west1.firebasedatabase.app";

let predstave = {}; // Objekat koji ce cuvati sve automobile sa Firebase-a

// Pozivamo ucitavanje svih automobila prilikom ucitavanja stranice
dobavi_predstave();

/*
    Funkcija koja dobavlja sve automobile i dodaje ih u tabelu
*/
function dobavi_predstave() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        // Brisanje prethodnog sadrzaja tabele
        removeTableRows("predstave");

        predstave = JSON.parse(request.responseText);
        console.log(predstave);

        // Izdvajanje svakog pojedinacnog automobila iteriranjem kroz atribute objekta
        for (let id in predstave) {
          let predstave_pozorista = predstave[id];
          //console.log(predstave_pozorista);
          for (let id1 in predstave_pozorista){
            let predstava=predstave_pozorista[id1];
            dodaj_predstavu_u_tabelu("predstave", id1, predstava);
        }
          // console.log(car);
        }
        
      } else {
        alert("Greška prilikom učitavanja svih predstava.");
      }
    }
  };

  request.open("GET", firebaseUrl + "/predstave.json");
  request.send();
}

/*
    Funkcija koja otvara stranicu za izmenu
*/
function otvori_formu_za_izmenu_predstava() {
  let clickedBtn = this;
  // console.log(clickedBtn);
  let predstavaId = clickedBtn.getAttribute("data-id");
  window.location.href = "izmena_detalja_predstave.html?id=" + predstavaId;
}

/*
    Funkcija koja briše željeni automobil
*/
function obrisi_predstavu() {
  let clickedBtn = this;
  const button = document.getElementById('confirmTrigger');
  const confirmResult = document.getElementById('confirmResult');
  clickedBtn.addEventListener('click', function (e) {
      if (window.confirm('Da li ste sigurni da zelite da obrisete predstavu?')) {
        confirmResult.innerText = 'Da';
        let predstavaId = clickedBtn.getAttribute("data-id");
        console.log(predstavaId);

        let request = new XMLHttpRequest();
      
        request.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              dobavi_predstave();
            } else {
              alert("Greška prilikom brisanja predstave.");
            }
          }
        };

        for (let id in predstave) {
          let predstave_pozorista1 = predstave[id];
          for (let id1 in predstave_pozorista1){
            let predstava=predstave_pozorista1[id1];
            if (predstava===predstavaId){
              console.log(predstave_pozorista1);
              console.log(predstava);
              request.open("DELETE", firebaseUrl + "/predstave/" +predstave_pozorista1+"?"+ predstavaId + ".json");

              request.send();
            }}}

        
          //request.open("DELETE", firebaseUrl + "/predstave/" +predstave_pozorista+"&"+ predstavaId + ".json");
          //console.log(request);
          //request.send();
        } 
          else {
            confirmResult.innerText = 'Ne';
            window.location.href="tabela_sa_predstavama.html"
          }
        }
)}
/*  let clickedBtn = this;

}

// *********************************************
//               POMOCNE FUNCKIJE
// *********************************************

/* 
    Pomocna funckija koja dodaje red u tabelu
*/
function dodaj_predstavu_u_tabelu(tBody, id, predstava) {
  let predstavaRow = document.createElement("tr");

  let cenaTd = document.createElement("td");
  cenaTd.innerText = predstava.cena;
  predstavaRow.appendChild(cenaTd);

  let kodTd = document.createElement("td");
  kodTd.innerText = predstava.kod;
  predstavaRow.appendChild(kodTd);

  let maxOsobeTd = document.createElement("td");
  maxOsobeTd.innerText = predstava.maxOsobe;
  predstavaRow.appendChild(maxOsobeTd);

  let naziv = document.createElement("td");
  naziv.innerText = predstava.naziv;
  predstavaRow.appendChild(naziv);

  let ocenaTd = document.createElement("td");
  ocenaTd.innerText = predstava.ocena;
  predstavaRow.appendChild(ocenaTd);

  let zanrTd = document.createElement("td");
  zanrTd.innerText = predstava.zanr;
  predstavaRow.appendChild(zanrTd);

  let slikaTd = document.createElement("td");
  slikaTd.innerText = predstava.slika;

  let trajanjeTd = document.createElement("td");
  trajanjeTd.innerText = predstava.trajanje;
  predstavaRow.appendChild(trajanjeTd);

  let kratakOpisTd = document.createElement("td");
  kratakOpisTd.innerText = predstava.kratakOpis;

  let OpisTd = document.createElement("td");
  OpisTd.innerText = predstava.opis;


  // <button type="button" onclick="showEditPage()" data-id="neki_id">Izmeni</button>
  let editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.classList=("btn submit-btn")
  editBtn.innerText = "Izmeni";
  editBtn.onclick = otvori_formu_za_izmenu_predstava;
  editBtn.setAttribute("data-id", id);

  let editTd = document.createElement("td");
  editTd.appendChild(editBtn);
  predstavaRow.appendChild(editTd);

  let deleteBtn = document.createElement("button");
  deleteBtn.classList=("btn submit-btn")
  deleteBtn.type = "button";
  deleteBtn.innerText = "Obriši";
  deleteBtn.onclick = obrisi_predstavu;
  deleteBtn.setAttribute("data-id", id);

  let deleteTd = document.createElement("td");
  deleteTd.appendChild(deleteBtn);
  predstavaRow.appendChild(deleteTd);

  document.getElementById(tBody).appendChild(predstavaRow);
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