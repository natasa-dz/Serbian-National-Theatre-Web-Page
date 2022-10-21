let firebaseURL ="https://projekat-f829c-default-rtdb.europe-west1.firebasedatabase.app";
let korisnikID = getParamValue('id');

let getRequest = new XMLHttpRequest();

getRequest.onreadystatechange = function (e) {
    if(this.readyState == 4){
        if(this.status == 200){
            var korisnik = JSON.parse(this.responseText);
            console.log(korisnik);
            prikaziKorisnikaProfilna("korisnik", korisnik)
      } else{
            alert('Pojavila se greska');
        }
    }
}
getRequest.open('GET', firebaseURL+'/korisnici/'+ korisnikID+'.json');
getRequest.send();

function prikaziKorisnikaProfilna(tBody, korisnik){

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
/*
    var ime=document.getElementById('ime');
    var prezime=document.getElementById('prezime')
    var brTelefona=document.getElementById('telefon');
    var email=document.getElementById('email');
    var datumRodjenja=document.getElementById('datumRodjenja');
    var korisnickoIme=document.getElementById('korisnickoIme');
    var adresa=document.getElementById('adresa');



    

    let brandTd = document.createElement("td");
    brandTd.innerText = car.brand;
    korisnikRow.appendChild(brandTd);
  
    let imeVrTd = document.createElement("td");
    imeVrTd .innerText = korisnik.ime;
    korisnikRow.appendChild(imeVrTd);

    let yearTd = document.createElement("td");
    yearTd.innerText = car.year;
    korisnikRow.appendChild(yearTd);
*/

    let korisnikRow = document.createElement("tr");

    let Header2=document.createElement("td")
    Header2.innerText=("Ime")
    korisnikRow.appendChild(Header2)

    let imeTd=document.createElement("td")
    imeTd.innerText=korisnik.ime;
    korisnikRow.appendChild(imeTd)

    korisnikRow.appendChild(Break)
    korisnikRow.appendChild(Break1)

    let Header1=document.createElement("td")
    Header1.innerText=("Prezime")
    korisnikRow.appendChild(Header1)

    let prezimeVr=document.createElement("td")
    prezimeVr.innerText=korisnik.prezime;
    korisnikRow.appendChild(prezimeVr)

    korisnikRow.appendChild(Break2)
    korisnikRow.appendChild(Break3)

    let Header3=document.createElement("td")
    Header3.innerText=("Broj telefona")
    korisnikRow.appendChild(Header3)


    let brTelefonaVr=document.createElement("td")
    brTelefonaVr.innerText=korisnik.telefon;
    korisnikRow.appendChild(brTelefonaVr)

    korisnikRow.appendChild(Break4)
    korisnikRow.appendChild(Break5)

    let Header4=document.createElement("td")
    Header4.innerText=("Email")
    korisnikRow.appendChild(Header4)


    let emailVr=document.createElement("td")
    emailVr.innerText=korisnik.email;
    korisnikRow.appendChild(emailVr)

    
    korisnikRow.appendChild(Break6)
    korisnikRow.appendChild(Break7)

    let Header5=document.createElement("td")
    Header5.innerText=("Datum rodjenja")
    korisnikRow.appendChild(Header5)


    let datumRodjenjaVr=document.createElement("td")
    datumRodjenjaVr.innerText=korisnik.datumRodjenja;
    korisnikRow.appendChild(datumRodjenjaVr)
    
    korisnikRow.appendChild(Break8)
    korisnikRow.appendChild(Break9)

    
    let Header6=document.createElement("td")
    Header6.innerText=("Korisnicko ime")
    korisnikRow.appendChild(Header6)

    let korisnickoImeVr=document.createElement("td")
    korisnickoImeVr.innerText=korisnik.korisnickoIme;
    korisnikRow.appendChild(korisnickoImeVr)

    
    korisnikRow.appendChild(Break10)
    korisnikRow.appendChild(Break11)

    let Header7=document.createElement("td")
    Header7.innerText=("Adresa korisnika")
    korisnikRow.appendChild(Header7)

    let adresaVr=document.createElement("td")
    adresaVr.innerText=korisnik.adresa;
    korisnikRow.appendChild(adresaVr)

    
    korisnikRow.appendChild(Break12)
    korisnikRow.appendChild(Break13)

    document.getElementById(tBody).appendChild(korisnikRow);

    /*ime.appendChild(imeVr)
    prezime.appendChild(prezimeVr)
    brTelefona.appendChild(brTelefonaVr)
    email.appendChild(emailVr)
    korisnickoIme.appendChild(korisnickoImeVr)
    datumRodjenja.appendChild(datumRodjenjaVr)
    adresa.appendChild(adresaVr)*/
}

function getParamValue(name) {
    var location = decodeURI(window.location.toString());
    var index = location.indexOf("?") + 1;
    var subs = location.substring(index, location.length);
    var splitted = subs.split("&");

    for (i = 0; i < splitted.length; i++) {
        var s = splitted[i].split("=");
        var pName = s[0];
        var pValue = s[1];
        if (pName == name) {
            return pValue;
        }
    }
}



