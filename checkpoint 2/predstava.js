let firebaseURL ="https://projekat-f829c-default-rtdb.europe-west1.firebasedatabase.app";

let predstavaID = getParamValue('id');
var predstava=predstavaID[1]
console.log(predstava);
let predstave = {};
let getRequest = new XMLHttpRequest();

getRequest.onreadystatechange = function (){

    if(this.readyState == 4){
        if(this.status == 200){
            predstave = JSON.parse(this.responseText);
                printRepertoarPozorista(predstava)
                //printPredstavePozorista(predstavePozorista)
            }
            getRequest.open('GET', firebaseURL.concat('/predstave/', predstava,'.json'));
            getRequest.send();

        } else{
            alert('Pojavila se greska');
    }
}
getRequest.open('GET', firebaseUrl.concat('/predstave.json'));
getRequest.send();


function printRepertoarPozorista(predstava) {

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
    detaljnije_o_pozoristima_btn.onclick = showEditPage;
    detaljnije_o_pozoristima_btn.setAttribute("data-id", id);
    detaljnije_o_pozoristima_btn.classList="btn submit-btn"

    let edit_detaljnije_o_pozoristima = document.createElement("td");
    edit_detaljnije_o_pozoristima.appendChild(detaljnije_o_pozoristima_btn);
    predstavaRow.appendChild(edit_detaljnije_o_pozoristima);
}


function getParamValue(name) {
    var location = decodeURI(window.location.toString());
    var index = location.indexOf("?") + 1;
    var subs = location.substring(index, location.length);
    var splitted = subs.split("&");
    console.log(splitted)

    return splitted
}