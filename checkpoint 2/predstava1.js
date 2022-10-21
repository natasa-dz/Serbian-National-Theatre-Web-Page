let firebaseURL ="https://projekat-f829c-default-rtdb.europe-west1.firebasedatabase.app";

let predstavaId = getParamValue('id');
let predstava;

function getParamValue(name){
    let location = decodeURI(window.location.toString());
    let index = location.indexOf("?") + 1;
    let subs = location.substring(index, location.length);
    let splitted = subs.split("&");

    for (i=0; i < splitted.length; i++){
      let s = splitted[i].split("=");
      let pName = s[0];
      let pValue = s[1];
      if (pName == name) {
        return pValue;
      }
    }
  }

let getRequest = new XMLHttpRequest();

getRequest.onreadystatechange = function() {
    if (this.readyState == 4) {
        if (this.status == 200){
            var predstave= JSON.parse(this.responseText);
            for (let id in predstave){
                vise_predstava = predstave[id];
                for(let n in vise_predstava){
                    if (n == predstavaId){
                        predstava = vise_predstava[n];
                        console.log(predstava);
                        dodajPredstavu(predstava);
                    }
                }
            }
        }else{
            alert("Greska prilikom ucitavanja!")
        }
    }
}

getRequest.open('GET', firebaseURL.concat('/predstave.json'));
getRequest.send();


function dodajPredstavu(predstava){
/*
    let naziv = document.createElement('h3');
    naziv.innerText = predstava.naziv;

    let tbodyNaziv = document.getElementById("predstava1__info");
    tbodyNaziv.appendChild(naziv);

    let kod = document.createElement("p");
    kod.innerText = predstava.kod;

    let tbodyKod = document.getElementById("predstava1__info");
    tbodyKod.appendChild(kod);

    let trajanje = document.createElement('p');
    trajanje.innerText = predstava.trajanje;

    let tbodyTrajanje = document.getElementById("predstava1__info");
    tbodyTrajanje.appendChild(trajanje);

    let zanr = document.createElement('em');
    zanr.innerText = predstava.zanr;

    let tbodyZanr = document.getElementById("predstava1__info");
    tbodyZanr.appendChild(zanr);

    let cena = document.createElement('em');
    cena.innerText = predstava.cena;

    let tbodyCena = document.getElementById("predstava1__info");
    tbodyCena.appendChild(cena);

    let ocena = document.createElement('em');
    ocena.innerText = predstava.ocena;

    let tbodyOcena = document.getElementById('uloge');
    tbodyOcena.appendChild(ocena);

    let maxOsoba = document.createElement('em');
    maxOsoba.innerText = predstava.maxOsobe;

    let tbodyMaxOsoba = document.getElementById('osobe');
    tbodyMaxOsoba.appendChild(maxOsoba);

    let kratakOpis = document.createElement('p');
    kratakOpis.innerText = predstava.kratakOpis;

    let tbodykratakOpis = document.getElementById("predstava1__info");
    tbodykratakOpis.appendChild(kratakOpis);

    let slika = document.createElement('img');
    slika.src = predstava.slika;

    let tbodySlika = document.getElementById('predstava1__img');
    tbodySlika.appendChild(slika);

    let detaljanOpis = document.createElement('p');
    detaljanOpis.innerText = predstava.opis;

    let tbodyDetaljanOpis = document.getElementById("predstava1__info");
    tbodyDetaljanOpis.appendChild(detaljanOpis);
*/


let predstavaRow = document.createElement("tr");

let Break=document.createElement("br")
let Break1=document.createElement("br")
let Break2=document.createElement("br")
let Break3=document.createElement("br")
let Break4=document.createElement("br")
let Break5=document.createElement("br")
let Break6=document.createElement("br")
let Break7=document.createElement("br")
let Break8=document.createElement("br")
let Break9=document.createElement("br")
let Break10=document.createElement("br")
let Break11=document.createElement("br")
let Break12=document.createElement("br")
let Break13=document.createElement("br")
let Break14=document.createElement("br")
let Break15=document.createElement("br")
let Break16=document.createElement("br")
let Break17=document.createElement("br")
let Break18=document.createElement("br")
let Break19=document.createElement("br")


let slikaPredstave=document.createElement('img');
slikaPredstave.src=predstava.slika
predstavaRow.appendChild(slikaPredstave)

predstavaRow.appendChild(Break)
predstavaRow.appendChild(Break1)

let Header1=document.createElement("td")
Header1.innerText=("Cena ulaznice")
predstavaRow.appendChild(Header1)


let cenaTd = document.createElement("td");
cenaTd.innerText = predstava.cena;
predstavaRow.appendChild(cenaTd);

predstavaRow.appendChild(Break5)
predstavaRow.appendChild(Break2)

let Header=document.createElement("td")
Header.innerText=("Kod")
predstavaRow.appendChild(Header)



let kodTd = document.createElement("td");
kodTd.innerText = predstava.kod;
predstavaRow.appendChild(kodTd);

predstavaRow.appendChild(Break3)
predstavaRow.appendChild(Break6)

let Header2=document.createElement("td")
Header2.innerText=("Maksimalan broj posetilaca")
predstavaRow.appendChild(Header2)


let maxOsobeTd = document.createElement("td");
maxOsobeTd.innerText = predstava.maxOsobe;
predstavaRow.appendChild(maxOsobeTd);

predstavaRow.appendChild(Break4)
predstavaRow.appendChild(Break8)

let Header4=document.createElement("td")
Header4.innerText=("Naziv predstave")
predstavaRow.appendChild(Header4)

let naziv = document.createElement("td");
naziv.innerText = predstava.naziv;
predstavaRow.appendChild(naziv);
predstavaRow.appendChild(Break7)
predstavaRow.appendChild(Break9)

let Header5=document.createElement("td")
Header5.innerText=("Ocena korisnika")
predstavaRow.appendChild(Header5)

let ocenaTd = document.createElement("td");
ocenaTd.innerText = predstava.ocena;
predstavaRow.appendChild(ocenaTd);

predstavaRow.appendChild(Break10)
predstavaRow.appendChild(Break11)

let Header6=document.createElement("td")
Header6.innerText=("Zanr predstave")
predstavaRow.appendChild(Header6)

let zanrTd = document.createElement("td");
zanrTd.innerText = predstava.zanr;
predstavaRow.appendChild(zanrTd);

predstavaRow.appendChild(Break12)
predstavaRow.appendChild(Break13)

let Header7=document.createElement("td")
Header7.innerText=("Trajanje predstave")
predstavaRow.appendChild(Header7)


let trajanjeTd = document.createElement("td");
trajanjeTd.innerText = predstava.trajanje;
predstavaRow.appendChild(trajanjeTd);

predstavaRow.appendChild(Break14)
predstavaRow.appendChild(Break15)

let Header8=document.createElement("td")
Header8.innerText=("Kratak opis predstave")
predstavaRow.appendChild(Header8)


let kratakOpisTd = document.createElement("td");
kratakOpisTd.innerText = predstava.kratakOpis;
predstavaRow.appendChild(kratakOpisTd);

predstavaRow.appendChild(Break16)
predstavaRow.appendChild(Break17)

let Header9=document.createElement("td")
Header9.innerText=("Detaljan opis predstave")
predstavaRow.appendChild(Header9)
  
let OpisTd = document.createElement("td");
OpisTd.innerText = predstava.opis;
predstavaRow.appendChild(OpisTd);

predstavaRow.appendChild(Break18)
predstavaRow.appendChild(Break19)

let tbody = document.getElementById('tabela');
tbody.appendChild(predstavaRow);
let detaljnije_o_pozoristima_btn = document.createElement("button");
detaljnije_o_pozoristima_btn.type = "button";
}
/*detaljnije_o_pozoristima_btn.innerText= "Izmenite predstavu";
detaljnije_o_pozoristima_btn.onclick = showEditPage;
detaljnije_o_pozoristima_btn.setAttribute("data-id", predstava);
detaljnije_o_pozoristima_btn.classList="btn submit-btn"

let edit_detaljnije_o_pozoristima = document.createElement("td");
edit_detaljnije_o_pozoristima.appendChild(detaljnije_o_pozoristima_btn);
predstavaRow.appendChild(edit_detaljnije_o_pozoristima);


}*/


