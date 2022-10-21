let firebaseURL ="https://projekat-f829c-default-rtdb.europe-west1.firebasedatabase.app";

let pozoristeID = getParamValue('id');
let pozoriste = {};
let getRequest = new XMLHttpRequest();

getRequest.onreadystatechange = function (){

    if(this.readyState == 4){
        if(this.status == 200){
            pozoriste = JSON.parse(this.responseText);
            console.log(pozoriste);
            //printPozoriste(pozoriste);
            var predstavePozorista = pozoriste.idPredstava; //dobavi repertoar pozorista

                let getRequest = new XMLHttpRequest();

                getRequest.onreadystatechange = function (){

                    if(this.readyState == 4){
                        if(this.status == 200){
                            repertoar = JSON.parse(this.responseText);
                            console.log(repertoar);
                            for (let id in repertoar){ //za predstave na repertoaru 

                                var predstava = repertoar[id] //predstava je repertoar[id te predstave]
                                console.log(predstava)
                                printRepertoarPozorista(id, predstava)
                                //printPredstavePozorista(predstavePozorista)

                            }


                        } else{
                            alert('Pojavila se greska');
                        }
                    }
                }
                getRequest.open('GET', firebaseURL.concat('/predstave/', predstavePozorista,'.json'));
                getRequest.send();



        } else{
            alert('Pojavila se greska');
        }
    }
}
getRequest.open('GET', firebaseURL.concat('/pozorista/', pozoristeID,'.json'));
getRequest.send();

function showEditPage() {
    let clickedBtn = this;
    console.log(clickedBtn);
    let pozoristeID = clickedBtn.getAttribute("data-id");
    var predstavePozorista = pozoriste.idPredstava
    window.location.href = "predstava.html?id=" +pozoristeID;
}


function printRepertoarPozorista(id, predstava) {

    let predstavaRow = document.createElement("tr");

    let slikaPredstave=document.createElement('img');
    slikaPredstave.src=predstava.slika
    predstavaRow.appendChild(slikaPredstave)

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
    

    
    let trajanjeTd = document.createElement("td");
    trajanjeTd.innerText = predstava.trajanje;
    predstavaRow.appendChild(trajanjeTd);
    
    
    let kratakOpisTd = document.createElement("td");
    kratakOpisTd.innerText = predstava.kratakOpis;
    predstavaRow.appendChild(kratakOpisTd);
/*    
    let OpisTd = document.createElement("td");
    OpisTd.innerText = predstava.opis;
    predstavaRow.appendChild(OpisTd);
*/
    let tbody = document.getElementById('tabela');
    tbody.appendChild(predstavaRow);
    let detaljnije_o_pozoristima_btn = document.createElement("button");
    detaljnije_o_pozoristima_btn.type = "button";

    detaljnije_o_pozoristima_btn.innerText= "Detaljnije o predstavi";
    detaljnije_o_pozoristima_btn.onclick=showEditPage;
    detaljnije_o_pozoristima_btn.setAttribute("data-id", id);
    detaljnije_o_pozoristima_btn.classList="btn submit-btn"


    let edit_detaljnije_o_pozoristima = document.createElement("td");
    edit_detaljnije_o_pozoristima.appendChild(detaljnije_o_pozoristima_btn);
    predstavaRow.appendChild(edit_detaljnije_o_pozoristima);
}


    //<button type="button" onclick="showEditPage()" data-id="neki_id">Izmeni</button>





/*function printPredstavePozorista(predstavePozorista){
    for (let id in predstavePozorista){
        var predstava=predstavePozorista[id];
        printRepertoarPozorista(id, predstavePozorista, predstava)

    }
}*/
  
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

/*
                for (let id in predstave) {
                    let predstava = predstave[id];
                    console.log(predstava);

                    let slikaPredstave = document.createElement('img');
                    slikaPredstave.src = predstava.slika;
                    console.log(slikaPredstave);
                    slike.appendChild(slikaPredstave);
                    let tbodySlika = document.getElementById('predstava');
                    tbodySlika.appendChild(slike);*/
