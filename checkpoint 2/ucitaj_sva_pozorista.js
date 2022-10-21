let firebaseUrl="https://projekat-f829c-default-rtdb.europe-west1.firebasedatabase.app";
let korisnici = {}; 

dobavi_pozoriste()

function dobavi_pozorista() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        // Brisanje prethodnog sadrzaja tabele

        korisnici = JSON.parse(request.responseText);
        console.log(korisnici);

        // Izdvajanje svakog pojedinacnog automobila iteriranjem kroz atribute objekta
        for (let id in korisnici) {
          let korisnik = korisnici[id];
          // console.log(car);
          dodaj_u_tabelu("svapozorista", id, korisnik);
        }
      } else {
        alert("Greška prilikom učitavanja svih korisnika.");
      }
    }
  };
  
  request.open("GET", firebaseUrl+"/pozorista.json");
  request.send();
}

function dobavi_pozoriste() {
    let request = new XMLHttpRequest();
  
    request.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          // Brisanje prethodnog sadrzaja tabele
  
          korisnici = JSON.parse(request.responseText);
          console.log(korisnici);
  
          // Izdvajanje svakog pojedinacnog automobila iteriranjem kroz atribute objekta
          dobavi_pojedinacno_pozoriste()
        } else {
          alert("Greška prilikom učitavanja svih korisnika.");
        }
      }
    };
    
    request.open("GET", firebaseUrl+"/pozorista.json");
    request.send();
  }
function showEditPage() {
  let clickedBtn = this;
  console.log(clickedBtn);
  let pozoristeId = clickedBtn.getAttribute("data-id");
  window.location.href = "ucitaj_repertoar_proba.html?id=" + pozoristeId;
}
// *********************************************
//               POMOCNE FUNCKIJE
// *********************************************

/* 
    Pomocna funckija koja dodaje red u tabelu
*/

function dodaj_u_tabelu(tBody, id, pozoriste) {
  let pozoristeRow = document.createElement("tr");

  let adresaTd = document.createElement("td");
  adresaTd.innerText = pozoriste.adresa;
  pozoristeRow.appendChild(adresaTd);

  let brojPredstavaTd = document.createElement("td");
  brojPredstavaTd.innerText = pozoriste.brojPredstava;
  pozoristeRow.appendChild(brojPredstavaTd);

  let idPredstavaTd = document.createElement("td");
  idPredstavaTd.innerText = pozoriste.idPredstava;
  pozoristeRow.appendChild(idPredstavaTd);

  let nazivTd = document.createElement("td");
  nazivTd.innerText = pozoriste.naziv;
  pozoristeRow.appendChild(nazivTd);

  //<button type="button" onclick="showEditPage()" data-id="neki_id">Izmeni</button>
  let detaljnije_o_pozoristima_btn = document.createElement("button");
  detaljnije_o_pozoristima_btn.type = "button";
  detaljnije_o_pozoristima_btn.innerText = "Trenutni reperotar";
  detaljnije_o_pozoristima_btn.onclick = showEditPage;
  detaljnije_o_pozoristima_btn.setAttribute("data-id", id);
  detaljnije_o_pozoristima_btn.classList="submit-btn1"
  let edit_detaljnije_o_pozoristima = document.createElement("td");
  edit_detaljnije_o_pozoristima.appendChild(detaljnije_o_pozoristima_btn);
  pozoristeRow.appendChild(edit_detaljnije_o_pozoristima);
  

  document.getElementById(tBody).appendChild(pozoristeRow);
}

function dobavi_pojedinacno_pozoriste(){
    for (let id in korisnici) {
        let pozoriste = korisnici[id];
        // console.log(car);
        //appendKorisnikRow("svapozorista", id, pozoriste);
        if (id ==="-MNQftJa4rskH-dBqE9Z"){
            document.getElementById('slika1').src=(pozoriste.slika);
            dodaj_u_tabelu('tabela1', id, pozoriste);
        }

        else if (id ==="-MNQg8Nd8YPRs-5Kbgqu"){
            document.getElementById('slika2').src=(pozoriste.slika);
            dodaj_u_tabelu('tabela2', id, pozoriste);
        }

        else if (id ==="-MNQgI0t2nV3AT1YxNAr"){
            document.getElementById('slika3').src=(pozoriste.slika);
            dodaj_u_tabelu('tabela3', id, pozoriste);

        }

        else if (id ==="-MNQgO7Cm756dkG36efQ"){
            document.getElementById('slika4').src=(pozoriste.slika);
            dodaj_u_tabelu('tabela4', id, pozoriste);
        }

        else if (id ==="-MNQgUTr_lN9O7L8AoUS"){
            document.getElementById('slika5').src=(pozoriste.slika);
            dodaj_u_tabelu('tabela5', id, pozoriste);

        }

        else if (id === "-MNQg_nhfUBoPJKBu72e") {
            document.getElementById('slika6').src=(pozoriste.slika);
            dodaj_u_tabelu('tabela6', id, pozoriste);


        }

        else if (id === "-MNQgfzXvQgwB8K-SVfF") {
            document.getElementById('slika7').src=(pozoriste.slika);
            dodaj_u_tabelu('tabela7', id, pozoriste);
        }

        else if (id === "-MNQgnHVDMtvSasYG0C8"){
            document.getElementById('slika8').src=(pozoriste.slika);
            dodaj_u_tabelu('tabela8', id, pozoriste);

        }

        else if (id === "-MNQgy9N5foEWTmmA_1U"){
            document.getElementById('slika9').src=(pozoriste.slika);
            dodaj_u_tabelu('tabela9', id, pozoriste);
        }

        else {
            alert("Greška prilikom učitavanja svih korisnika.");
        }
      }

}

/*
    Funkcija koja otvara stranicu za izmenu
*/


