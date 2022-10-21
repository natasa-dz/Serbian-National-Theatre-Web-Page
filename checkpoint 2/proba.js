let firebaseUrl="https://projekat-f829c-default-rtdb.europe-west1.firebasedatabase.app";
let korisnikId = getParamValue("id");
let korisnik = {};

/* 
    Dobavljanje automobila po id-ju prilikom ucitavanja stranice 
*/
let getRequest = new XMLHttpRequest();

getRequest.onreadystatechange = function (e) {
  if (this.readyState == 4) {
    if (this.status == 200) {
      predstava = JSON.parse(getRequest.responseText);

      document.getElementById("adresa").value = predstava.adresa;
      document.getElementById("datumRodjenja").value = predstava.datumRodjenja;
      document.getElementById("email").value = predstava.email;
      document.getElementById("ime").value = predstava.ime;
      document.getElementById("korisnickoIme").value = predstava.korisnickoIme;
      document.getElementById("lozinka").value = predstava.lozinka;
      document.getElementById("prezime").value = predstava.prezime;
      document.getElementById("telefon").value = predstava.telefon;

      console.log(predstava);

    } 
    else 
    {
      alert("Greška prilikom učitavanja korsinika.");
    }
  }
};

getRequest.open("GET", firebaseUrl + "/korisnici/" + korisnikId + ".json");
getRequest.send();
let forma1 = document.getElementById("form");

forma1.addEventListener("submit", function (e) {
  // Sprecicemo slanje forme na server, jer zelimo mi da imamo kontrolu nad time
  e.preventDefault();

  let adresa = document.querySelector("#adresa").value.trim();
  let datumRodjenja = document.querySelector("#datumRodjenja").value.trim();
  let email = document.querySelector("#email").value.trim();
  let korisnickoIme = document.querySelector("#korisnickoIme").value.trim();
  let telefon = document.querySelector("#telefon").value.trim();
  let loznika = document.querySelector("#lozinka").value.trim();
  let prezime = document.querySelector("#prezime").value.trim();
  let ime = document.querySelector("#ime").value.trim();

  /* Drugi nacin:
        let yearText = document.getElementById('year').value;
        let year = parseInt(yearText);
    */

  /*Bolje resenje: ne dozvoliti slanje ukoliko je bilo koji podatak nevalidan,
   i u tom slucaju obavestiti korisnika
  if (adresa != "") {
    korisnik.adresa = adresa;
  }
  if (datumRodjenja != "") {
    korisnik.datumRodjenja = datumRodjenja;
  }
  if (email != "") {
    korisnik.email = email;
  }
  if (korisnickoIme
     != "") {
    korisnik.korisnickoIme = korisnickoIme;
  }
  */

  validateForm();
  
  
  // console.log(car);

  let putRequest = new XMLHttpRequest();

  putRequest.onreadystatechange = function (e) {
    if (this.readyState == 4) {
      if (this.status == 200) {
        window.location.href = "ucitaj_korisnike.html";
      } else {
        alert("Greška prilikom izmene korisnika.");
      }
    }
  };

  putRequest.open("PUT", firebaseUrl + "/korisnici/" + korisnikId + ".json");
  putRequest.send(JSON.stringify(predstava));
})


function getParamValue(name) {
  let location = decodeURI(window.location.toString());
  let index = location.indexOf("?") + 1;
  let subs = location.substring(index, location.length);
  let splitted = subs.split("&");

  for (i = 0; i < splitted.length; i++) {
    let s = splitted[i].split("=");
    let pName = s[0];
    let pValue = s[1];
    if (pName == name) {
      return pValue;
    }
  }
}

function validateForm() {

  //korisnicko ime
  if(korisnickoIme.value.trim()==''){
    setError(korisnickoIme, 'Greska! Ostavili ste prazno polje!');
  }else if(korisnickoIme.value.trim().length <3 || korisnickoIme.value.trim().length > 15){
    setError(korisnickoIme, 'Neispravan unos! Korisnicko ime moze sadrzati min 3, a max 15 karaktera!');
  }else {
    predstava.korisnickoIme=korisnickoIme;
    setSuccess(korisnickoIme);
      
  }

  //ime
  if(ime.value.trim()==''){
    setError(ime, 'Greska! Ostavili ste prazno polje!');
  }else if(ime.value.trim().length <3 || ime.value.trim().length > 15){
    setError(ime, 'Neispravan unos! Ime moze sadrzati min 3, a max 15 karaktera!');
  }else {
    predstava.ime=ime;
    setSuccess(ime);
    
  }

  //prezime
  if(prezime.value.trim()==''){
    setError(prezime, 'Greska! Ostavili ste prazno polje!');
  }else if(prezime.value.trim().length <3 || prezime.value.trim().length > 15){
    setError(prezime, 'Neispravan unos! Prezime moze sadrzati min 3, a max 15 karaktera!');
  }else {
    predstava.prezime=prezime;
    setSuccess(prezime);
  }

  //email
  if(email.value.trim()==''){
    setError(email, 'Greska! Ostavili ste prazno polje!');
  }else if(isEmailValid(email.value)){
    predstava.email=email;
    setSuccess(email);
  }else{
    setError(email, 'Unesite email adresu u ispravnom formatu!');
  }

  //password
  if(lozinka.value.trim()==''){
    setError(lozinka, 'Greska! Ostavili ste prazno polje!');
  }else if(lozinka.value.trim().length <6 || lozinka.value.trim().length >20){
    setError(lozinka, 'Lozinka mora sadrzati izmedju 6 i 20 karaktera!');
  }else {
    predstava.lozinka=lozinka;
    setSuccess(lozinka);
  }

  //datum_rodjenja
  if(datumRodjenja.value.trim()==''){
    setError(datumRodjenja, 'Greska! Ostavili ste prazno polje!');
  }else {
    predstava.datumRodjenja=datumRodjenja;
    setSuccess(datumRodjenja);
  }

  //broj telefona
  if(telefon.value.trim()==''){
    setError(telefon, 'Greska! Ostavili ste prazno polje!');
  }
  else if(onlyNumbers(telefon.value)){
    setSuccess(telefon);
    }else {
    setError(telefon, 'Broj telefona sadrzi samo cifre!');;
    }

  //adresa
  if(adresa.value.trim()==''){
    setError(adresa, 'Greska! Ostavili ste prazno polje!');
    }else {
      predstava.adresa=adresa;
      setSuccess(adresa);}
  
  
  
}
function onlyNumbers(str) {
  return /^[0-9.,]+$/.test(str);
}
function validatePhoneNumber(phone){
  var re = /^\d{10}$/;
  return re.test(phone)
}

function setError(element, errorMessage) {
    const parent = element.parentElement;
    if(parent.classList.contains('success')){
        parent.classList.remove('success');
    }
    parent.classList.add('error');
    const paragraph = parent.querySelector('p');
    paragraph.textContent = errorMessage;
}


function setSuccess(element){
    const parent = element.parentElement;
    if(parent.classList.contains('error')){
        parent.classList.remove('error');
    }
    parent.classList.add('success');
}

function isEmailValid(email){
    const reg =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return reg.test(email);
}
