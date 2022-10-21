// URL Firebase projekta - Obratiti paznju da je uklonjen znak / sa kraja!
// Obavezno postavite URL do svog Firebase projekta da bi sve radilo kako treba
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
      korisnik = JSON.parse(getRequest.responseText);

      document.getElementById("adresa").value = korisnik.adresa;
      document.getElementById("datumRodjenja").value = korisnik.datumRodjenja;
      document.getElementById("email").value = korisnik.email;
      document.getElementById("ime").value = korisnik.ime;
      document.getElementById("korisnickoIme").value = korisnik.korisnickoIme;
      document.getElementById("lozinka").value = korisnik.lozinka;
      document.getElementById("prezime").value = korisnik.prezime;
      document.getElementById("telefon").value = korisnik.telefon;

      console.log(korisnik);

    } 
    else 
    {
      alert("Greška prilikom učitavanja korsinika.");
    }
  }
};

getRequest.open("GET", firebaseUrl + "/korisnici/" + korisnikId + ".json");
getRequest.send();

/* 
    Izmena automobila na 'submit' forme 
*/// Na izmenu cemo reagovati tako sto uhvatimo 'submit' dogadjaj na editForm

/*
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

  /* Bolje resenje: ne dozvoliti slanje ukoliko je bilo koji podatak nevalidan,
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
  putRequest.send(JSON.stringify(korisnik));
});
*/
let forma1 = document.getElementById("form");


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


forma1.addEventListener('submit', function(e) {
  e.preventDefault();

  let adresa = document.querySelector("#adresa").value.trim();
  let datumRodjenja = document.querySelector("#datumRodjenja").value.trim();
  let email = document.querySelector("#email").value.trim();
  let korisnickoIme = document.querySelector("#korisnickoIme").value.trim();
  let telefon = document.querySelector("#telefon").value.trim();
  let lozinka = document.querySelector("#lozinka").value.trim();
  let prezime = document.querySelector("#prezime").value.trim();
  let ime = document.querySelector("#ime").value.trim();

  validateForm();

  console.log(isFormValid());

  let clickedBtn = this;
  const button = document.getElementById('confirmTrigger');
  const confirmResult = document.getElementById('confirmResult');
  clickedBtn.addEventListener('click', function (e) {

      if (window.confirm('Da li ste sigurni da zelite da izmenite korisnika?')) {
          confirmResult.innerText = 'Da';
          if(isFormValid()==true){

            let putRequest = new XMLHttpRequest();

            putRequest.onreadystatechange = function (e) {
              if (this.readyState == 4) {
                if (this.status == 200) {
                  //forma1.submit()
                  window.location.href = "administrator.html";
                } else {
                  e.preventDefault()
                  alert("Greška prilikom izmene korisnika.");
                }
              }
            
            }
            putRequest.open("PUT", firebaseUrl + "/korisnici/" + korisnikId + ".json");
            putRequest.send(JSON.stringify(korisnik));}
            else {confirmResult.innerText = 'Ne';}};       
})
});

/*  if(isFormValid()==true){

    let putRequest = new XMLHttpRequest();

    putRequest.onreadystatechange = function (e) {
      if (this.readyState == 4) {
        if (this.status == 200) {
          //forma1.submit()
          window.location.href = "administrator.html";
        } else {
          e.preventDefault()
          alert("Greška prilikom izmene korisnika.");
        }
      }
    };
    putRequest.open("PUT", firebaseUrl + "/korisnici/" + korisnikId + ".json");
    putRequest.send(JSON.stringify(korisnik));
    
  

  //forma1.submit();
}else{alert("Greška prilikom izmene korisnika.");}
});
*/


function isFormValid(){
  const inputContainers = form.querySelectorAll('.form__group');
  let result = true;
  inputContainers.forEach((container)=>{
  if(container.classList.contains('error')){
    result = false;
  }
  });
  return result;
}

function validateForm() {

  //korisnicko ime
  if(korisnickoIme.value.trim()==''){
    setError(korisnickoIme, 'Greska! Ostavili ste prazno polje!');
  }else if(korisnickoIme.value.trim().length <3 || korisnickoIme.value.trim().length > 15){
    setError(korisnickoIme, 'Neispravan unos! Korisnicko ime moze sadrzati min 3, a max 15 karaktera!');
  }else {
    //korisnik.korisnickoIme=korisnickoIme;
    setSuccess(korisnickoIme);
      
  }

	//ime
	if(ime.value.trim()==''){
		setError(ime, 'Greska! Ostavili ste prazno polje!');
	}else if(ime.value.trim().length <3 || ime.value.trim().length > 15){
		setError(ime, 'Neispravan unos! Ime moze sadrzati min 3, a max 15 karaktera!');
	}else {
    //korisnik.ime=ime;
		setSuccess(ime);
    
	}

	//prezime
	if(prezime.value.trim()==''){
		setError(prezime, 'Greska! Ostavili ste prazno polje!');
	}else if(prezime.value.trim().length <3 || prezime.value.trim().length > 15){
		setError(prezime, 'Neispravan unos! Prezime moze sadrzati min 3, a max 15 karaktera!');
	}else {
    //korisnik.prezime=prezime;
		setSuccess(prezime);
	}

	//email
	if(email.value.trim()==''){
    setError(email, 'Greska! Ostavili ste prazno polje!');
  }else if(isEmailValid(email.value)){
    //korisnik.email=email;
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
    //korisnik.lozinka=lozinka;
    setSuccess(lozinka);
  }

	//datum_rodjenja
	if(datumRodjenja.value.trim()==''){
    setError(datumRodjenja, 'Greska! Ostavili ste prazno polje!');
  }else {
    //korisnik.datumRodjenja=datumRodjenja;
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
      //korisnik.adresa=adresa;
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
