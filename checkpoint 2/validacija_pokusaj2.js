let korisnik={};
const form = document.querySelector('#login');
const form1=document.querySelector("#login1")
const korisnickoIme = document.querySelector('#korisnickoIme');
const ime = document.querySelector('#ime');
const korisnickoIme1 = document.querySelector('#korisnickoIme1');
const prezime = document.querySelector('#prezime');
const password = document.querySelector('#lozinka');
const password1 = document.querySelector('#lozinka1');
const email = document.querySelector('#email');
const datumRodjenja = document.querySelector('#datumRodjenja');
const adresa = document.querySelector('#adresa');
const telefon = document.querySelector('#telefon');

/*function getKorisnici(){
    let firebaseURL = "https://projekat-f829c-default-rtdb.europe-west1.firebasedatabase.app";
      let request = new XMLHttpRequest();

      request.onreadystatechange = function () {

          if (this.readyState == 4) {
            if (this.status == 200) {

              let korisnici = JSON.parse(this.responseText);
              console.log(korisnici);
              logIn(korisnici)

              } else{
              alert("Pojavila se Greska");
            }
          }

      }

      request.open("GET", firebaseURL.concat("/korisnici.json"));
      request.send();
}
function logIn(korisnici){

    var form = document.getElementById('login');

    form.addEventListener('submit', function(e){
        var input1 = document.getElementById('KorisnickoIme').value;
        var input2 = document.getElementById('Sifra').value;
        var logovanje = false;

            for(var id in korisnici){
                var korisnik = korisnici[id];
                if(input1 == korisnik.korisnickoIme){
                    if(input2 == korisnik.lozinka){
                        window.alert('Uspesno ulogovanje!');
                        window.location.replace = "main.html";
                        return logovanje = true;
                    }
                }
            }
            if(logovanje == false){
                window.alert('Pogresno korisnicko ime i/ili lozinka!')
                window.location.replace = "main.html";
            }
})
}*/

function login(){
    let firebaseUrl = "https://projekat-f829c-default-rtdb.europe-west1.firebasedatabase.app";

    let korisnciUrl = firebaseUrl + "/korisnici.json";

    let form = document.getElementById("login-form"); // forma login
    form.addEventListener("submit", function (n) {
    n.preventDefault();

    let korisnickoIme1 = document.getElementById("korisnickoIme").value.trim(); // korisnik id

    let lozinka = document.getElementById("lozinka").value.trim(); // lozinka id
    if (korisnickoIme == "" || lozinka == "") {
        alert("Polja ne smeju biti prazna");}
    else{
    let korisniciRequest = new XMLHttpRequest();

    korisniciRequest.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          console.log(this.responseText);
          let korisnici = JSON.parse(this.responseText);
          console.log(korisnici);
          let login=false;
        
          for (let i in korisnici) {
            let korisnik = korisnici[i];
            let korisnickaImena = korisnik.korisnickoIme;

            console.log(korisnickaImena);
            let lozinke = korisnik.lozinka;

            console.log(korisnickaImena, lozinke);
            console.log(korisnickoIme1, lozinka);

            if (korisnickaImena == korisnickoIme1 && lozinke == lozinka) {
                login=true;
                break;
            }
             else {
                login=false;
            }
          }
          if (login == true) {
            alert("Uspesno ste ulogovani");
            document.getElementById("login-btn").style.display="none";
          } else {
            alert("Pogresan unos podataka");
          }
        }
    }
}
korisniciRequest.open("GET", firebaseUrl +"/korisnici.json");
korisniciRequest.send();
}})}
login()

/*form.addEventListener('submit', (event)=>{
    
    validateForm();
    console.log(isFormValid());
    if(isFormValid()==true){
        if (logIn()==true){
            alert("Uspesno ste ulogovani");}}
    else {event.preventDefault();
        alert("Niste se uspesno ulogovali! Pokusajte sa ispravnim podacima");}

});*/

form1.addEventListener('submit', (event)=>{

    
    validateForm1();
    console.log(isFormValid());
    if(isForm1Valid()==true){
        let firebaseUrl="https://projekat-f829c-default-rtdb.europe-west1.firebasedatabase.app";
        form.submit();
        let putRequest=new XMLHttpRequest();
        putRequest.open("POST", firebaseUrl+"/korisnici.json");
        putRequest.send=(JSON.stringify(korisnik));
        console.log(korisnik);
     }else {
         event.preventDefault();
     }

});



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

function isForm1Valid(){
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

    /*
	if(email.value.trim()==''){
        setError(email, 'Greska! Ostavili ste prazno polje!');
    }else if(isEmailValid(email.value)){
        setSuccess(email);
    }else{
        setError(email, 'Unesite email adresu u ispravnom formatu!');
    }*/

	//password
	if(password.value.trim()==''){
        setError(password, 'Greska! Ostavili ste prazno polje!');
    }else if(password.value.trim().length <6 || password.value.trim().length >20){
        setError(password, 'Lozinka mora sadrzati izmedju 6 i 20 karaktera!');
    }else {
        setSuccess(password);
    }



	/*
	if(ime.value.trim()==''){
		setError(ime, 'Greska! Ostavili ste prazno polje!');
	}else if(ime.value.trim().length <3 || ime.value.trim().length > 15){
		setError(ime, 'Neispravan unos! Ime moze sadrzati min 3, a max 15 karaktera!');
	}else {
		setSuccess(ime);
	}

	//prezime
	if(prezime.value.trim()==''){
		setError(prezime, 'Greska! Ostavili ste prazno polje!');
	}else if(prezime.value.trim().length <3 || prezime.value.trim().length > 15){
		setError(prezime, 'Neispravan unos! Prezime moze sadrzati min 3, a max 15 karaktera!');
	}else {
		setSuccess(prezime);
	}*/

    //korisnicko ime
    if(korisnickoIme.value.trim()==''){
        setError(korisnickoIme, 'Greska! Ostavili ste prazno polje!');
    }else if(korisnickoIme.value.trim().length <3 || korisnickoIme.value.trim().length > 15){
        setError(korisnickoIme, 'Neispravan unos! Korisnicko ime moze sadrzati min 3, a max 15 karaktera!');
    }else {
        setSuccess(korisnickoIme);
    }



	/*datum_rodjenja
	if(datumRodjenja.value.trim()==''){
        setError(datumRodjenja, 'Greska! Ostavili ste prazno polje!');
    }else {
        setSuccess(datumRodjenja);}

	//broj telefona
	if(telefon.value.trim()==''){
        setError(telefon, 'Greska! Ostavili ste prazno polje!');
    }
	else if(validatePhoneNumber(telefon.value)){
		setSuccess(telefon);
    }else {
		setError(telefon, 'Broj telefona sadrzi isklucivo 10 cifara!');;
    }

	//adresa
	if(adresa.value.trim()==''){
        setError(adresa, 'Greska! Ostavili ste prazno polje!');
    }else {
        setSuccess(adresa);}*/
	
	
	
}
function validateForm1(){
    //email
	if(email.value.trim()==''){
        setError(email, 'Greska! Ostavili ste prazno polje!');
    }else if(isEmailValid(email.value)){
        setSuccess(email);
        korisnik.email=email.value.trim();
    }else{
        setError(email, 'Unesite email adresu u ispravnom formatu!');
    }

	//password
	if(password1.value.trim()==''){
        setError(password1, 'Greska! Ostavili ste prazno polje!');
    }else if(password1.value.trim().length <6 || password1.value.trim().length >20){
        setError(password1, 'Lozinka mora sadrzati izmedju 6 i 20 karaktera!');
    }else {
        setSuccess(password);
        korisnik.password=password1.value.trim();;
    }



	//ime
	if(ime.value.trim()==''){
		setError(ime, 'Greska! Ostavili ste prazno polje!');
	}else if(ime.value.trim().length <3 || ime.value.trim().length > 15){
		setError(ime, 'Neispravan unos! Ime moze sadrzati min 3, a max 15 karaktera!');
	}else {
		setSuccess(ime);
        korisnik.ime=ime.value.trim();;
	}

	//prezime
	if(prezime.value.trim()==''){
		setError(prezime, 'Greska! Ostavili ste prazno polje!');
	}else if(prezime.value.trim().length <3 || prezime.value.trim().length > 15){
		setError(prezime, 'Neispravan unos! Prezime moze sadrzati min 3, a max 15 karaktera!');
	}else {
		setSuccess(prezime);
        korisnik.prezime=prezime.value.trim();;
	}

    //korisnicko ime
    if(korisnickoIme1.value.trim()==''){
        setError(korisnickoIme1, 'Greska! Ostavili ste prazno polje!');
    }else if(korisnickoIme1.value.trim().length <3 || korisnickoIme1.value.trim().length > 15){
        setError(korisnickoIme1, 'Neispravan unos! Korisnicko ime moze sadrzati min 3, a max 15 karaktera!');
    }else {
        setSuccess(korisnickoIme1);
        korisnik.korisnickoIme1=korisnickoIme1.value.trim();;
    }



	//datum_rodjenja
	if(datumRodjenja.value.trim()==''){
        setError(datumRodjenja, 'Greska! Ostavili ste prazno polje!');
    }else {
        setSuccess(datumRodjenja);
        korisnik.datumRodjenja=datumRodjenja.value.trim();;
    }

	//broj telefona
	if(telefon.value.trim()==''){
        setError(telefon, 'Greska! Ostavili ste prazno polje!');
    }
	else if(validatePhoneNumber(telefon.value)){
		setSuccess(telefon);
        korisnik.telefon=telefon.value.trim();;
    }else {
		setError(telefon, 'Broj telefona sadrzi isklucivo 10 cifara!');;
    }

	//adresa
	if(adresa.value.trim()==''){
        setError(adresa, 'Greska! Ostavili ste prazno polje!');
    }else {
        korisnik.adresa=adresa.value.trim();;
        setSuccess(adresa);}
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
