// URL Firebase projekta - Obratiti paznju da je uklonjen znak / sa kraja!
// Obavezno postavite URL do svog Firebase projekta da bi sve radilo kako treba
let firebaseURL="https://projekat-f829c-default-rtdb.europe-west1.firebasedatabase.app";
let predstaveUrl="https://projekat-f829c-default-rtdb.europe-west1.firebasedatabase.app/predstave"
let predstavaId = getParamValue("id");
console.log(predstavaId)
let predstava = {};

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

/*function getParamValue(name) {
  var location = decodeURI(window.location.toString());
  var index = location.indexOf("?") + 1;
  var subs = location.substring(index, location.length);
  var splitted = subs.split("&");
  console.log(splitted)

  return splitted
}*/

function getPredstave(){
  let getRequest = new XMLHttpRequest();
  
  getRequest.onreadystatechange = function() {
      if (this.readyState == 4) {
          if (this.status == 200){
              let predstave= JSON.parse(this.responseText);
              for (let id in predstave){
                  predstava1Id=id;
                  let vise_predstava=predstave[id];
                  for(let id in vise_predstava){
                      if (id == predstavaId){
                          predstava = vise_predstava[id];
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
  }

function dodajPredstavu(predstava){
  let imePolje=document.getElementById("naziv");
  imePolje.value=predstava.naziv;

  let kodPolje=document.getElementById("kod");
  kodPolje.value=predstava.kod;

  let zanrPolje=document.getElementById("zanr");
  zanrPolje.value=predstava.zanr;

  let cenaPolje=document.getElementById("cena");
  cenaPolje.value=predstava.cena;

  let brojOsobaPolje=document.getElementById("maxOsobe");
  brojOsobaPolje.value=predstava.maxOsobe;

  let opisPolje=document.getElementById("kratakOpis");
  opisPolje.value=predstava.kratakOpis;

  let trajanjePolje=document.getElementById("trajanje");
  trajanjePolje.value=predstava.trajanje;


  let detaljanOpisPolje=document.getElementById("opis");
  detaljanOpisPolje.value=predstava.opis;

}
getPredstave()
/*      document.getElementById("cena").value = predstava.cena;
      document.getElementById("kod").value = predstava.kod;
      document.getElementById("kratakOpis").value = predstava.kratakOpis;
      document.getElementById("maxOsobe").value = predstava.maxOsobe;
      document.getElementById("naziv").value = predstava.naziv;
      document.getElementById("opis").value = predstava.opis;
      document.getElementById("slika").value = predstava.slika;
      document.getElementById("trajanje").value = predstava.trajanje;
      document.getElementById("zanr").value = predstava.zanr;
*/
      



//getRequest.open("GET", firebaseUrl + "/predstave/" + predstave + "&"+predstavaId+".json");
//getRequest.send();

/* 
    Izmena automobila na 'submit' forme 
*/
let forma1 = document.getElementById("form");
// Na izmenu cemo reagovati tako sto uhvatimo 'submit' dogadjaj na editForm




forma1.addEventListener('submit', function(e) {
  e.preventDefault();
  let forma1 = document.getElementById("form");
  let naziv = document.querySelector("#naziv").value.trim();//imas

  let cena = document.querySelector("#cena").value.trim();//imas

  let kod = document.querySelector("#kod").value.trim();//imas

  let kratakOpis = document.querySelector("#kratakOpis").value.trim();//imas

  let maxOsobe = document.querySelector("#maxOsobe").value.trim();//imas
  
  let opis = document.querySelector("#opis").value.trim();//imas

  let trajanje = document.querySelector("#trajanje").value.trim();//imas

  let zanr = document.querySelector("#zanr").value.trim();

  validateForm();

  console.log(isFormValid());
  if (window.confirm('Da li ste sigurni da zelite da izmenite predstavu?')) {
    if(isFormValid()==true){
      let putRequest = new XMLHttpRequest();
      putRequest.onreadystatechange = function (e) {
        if (this.readyState == 4) {
          if (this.status == 200) {
            //forma1.submit()
            window.location.href = "tabela_sa_predstavama.html";
          } else {
            e.preventDefault()
            alert("Greška prilikom izmene predstve.");
          }
        }
      };
      putRequest.open("PUT", predstaveUrl + "/predstave/" + predstavaId + ".json");
      putRequest.send(JSON.stringify(predstava));}
      else {confirmResult.innerText = 'Ne';}};       
    });
  

  //forma1.submit();



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




  //naziv
  if(naziv.value.trim() ==''){
    setError(naziv.value.trim(), 'Greska! Ostavili ste prazno polje!');
  }else if(naziv.value.trim().length <3 || naziv.value.trim().length > 25){
    setError(naziv, 'Neispravan unos! Naziv moze sadrzati min 3, a max 25 karaktera!');
  }else {
    predstava.naziv=naziv;
    setSuccess(naziv);
  }

	//kod
	if(kod.value.trim()==''){
		setError(kod.value.trim(), 'Greska! Ostavili ste prazno polje!');
	}else if(kod.value.trim().length <3 || kod.value.trim().length > 15){
		setError(kod, 'Neispravan unos! Kod moze sadrzati min 3, a max 15 karaktera!');
	}else {
    predstava.kod=kod;
		setSuccess(kod);
    
	}

	//kratakOpis
	if(kratakOpis.value.trim()==''){
		setError(kratakOpis.value.trim(), 'Greska! Ostavili ste prazno polje!');
	}else if(kratakOpis.value.trim().length <3 || kratakOpis.value.trim().length > 200){
		setError(kratakOpis, 'Neispravan unos! Kratak opis moze sadrzati min 3, a max 200 karaktera!');
	}else {
    predstava.kratakOpis=kratakOpis;
		setSuccess(kratakOpis);
	}

	/*
	if(email.value.trim()==''){
    setError(email, 'Greska! Ostavili ste prazno polje!');
  }else if(isEmailValid(email.value)){
    predstava.email=email;
    setSuccess(email);
  }else{
    setError(email, 'Unesite email adresu u ispravnom formatu!');
  }*/

	//DetaljanOpis
	if(opis.value.trim()==''){
    setError(opis.value.trim(), 'Greska! Ostavili ste prazno polje!');
  }else if(opis.value.trim().length <6 || opis.value.trim().length >10000){
    setError(opis, 'Dugacak opis mora imati izmedju 6 i 10k karaktera!');
  }else {
    predstava.opis=opis;
    setSuccess(opis);
  }

	//cena
	if(cena.value.trim()==''){
    setError(cena, 'Greska! Ostavili ste prazno polje!');
  }
	else if(onlyNumbers(cena.value)){
    predstava.cena=cena;
		setSuccess(cena);
    }else {
		setError(cena, 'Cena sadrzi samo cifre!');;
  }
  //maxOsobe
  if(maxOsobe.value.trim()==''){
    setError(maxOsobe, 'Greska! Ostavili ste prazno polje!');
  }
  else if(onlyNumbers(maxOsobe.value)){
    predstava.maxOsobe=maxOsobe
    setSuccess(maxOsobe);
    }else {
    setError(maxOsobe, 'Cena sadrzi samo cifre!');;
    }


	if(zanr.value.trim()==''){
    setError(adresa, 'Greska! Ostavili ste prazno polje!');
    }else {
      predstava.zanr=zanr;
      setSuccess(zanr);}
  //trajanjePredstave*/
  if(trajanje.value.trim()==''){
    setError(trajanje, 'Greska! Ostavili ste prazno polje!');
  }
  else if(onlyNumbers(trajanje.value)){
    predstava.trajanje=trajanje
    setSuccess(trajanje);
    }else {
    setError(trajanje, 'Cena sadrzi samo cifre!');;
    }
	
	
	
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