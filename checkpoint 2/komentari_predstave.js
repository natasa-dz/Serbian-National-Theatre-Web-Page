let firebaseUrl ="https://projekat-f829c-default-rtdb.europe-west1.firebasedatabase.app";

function ucitajPredstavu(){
    let location = decodeURI(window.location.toString());
    let index = location.indexOf("?") + 1;
    let subs = location.substring(index, location.length);
    let splitted = subs.split("&");
    let predstaveID = splitted[0].split("=")[1];
    let predstavaID = splitted[1];
    let predstava;
    let komentari = [];
    let i = 0;
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                predstava = JSON.parse(this.responseText);
                document.title = predstava.naziv;
                document.getElementById("naslov").innerText = predstava.naziv;
                document.getElementById("kod_predstave").innerText = predstava.kod;
                document.getElementById("trajanje").innerText = predstava.trajanje;
                document.getElementById("zanr").innerText = predstava.zanr;
                document.getElementById("predstava_slika").setAttribute("src", predstava.slika);
                document.getElementById("predstava_slika").setAttribute("alt", predstava.naziv);
                document.getElementById("opis").innerText = predstava.opis;
                document.getElementById("cena").innerText = predstava.cena;
                document.getElementById("br_osoba").innerText = predstava.maxOsobe;
                document.getElementById("dugme_izmena").setAttribute("href", "predstava-izmena.html?id=" + predstaveID + "&" + predstavaID)
                document.getElementById("prosek").innerText = predstava.ocena;
               
                ucitajKomentare(predstava.komentari, 0 , "", "");
 
                let brOcena = 0;
                for (let ocena in predstava.ocene){
                    brOcena += parseInt(predstava.ocene[ocena]);
                }
                document.getElementById("broj-ocena").innerText = brOcena;
                document.getElementsByClassName("bar-5")[0].setAttribute("style", "width:" + (predstava.ocene[4] * 100 / brOcena) + "%");
                document.getElementsByClassName("bar-4")[0].setAttribute("style", "width:" + (predstava.ocene[3] * 100 / brOcena) + "%");
                document.getElementsByClassName("bar-3")[0].setAttribute("style", "width:" + (predstava.ocene[2] * 100 / brOcena) + "%");
                document.getElementsByClassName("bar-2")[0].setAttribute("style", "width:" + (predstava.ocene[1] * 100 / brOcena) + "%");
                document.getElementsByClassName("bar-1")[0].setAttribute("style", "width:" + (predstava.ocene[0] * 100 / brOcena) + "%");
 
                document.getElementById("ocene-5").innerText = predstava.ocene[4];
                document.getElementById("ocene-4").innerText = predstava.ocene[3];
                document.getElementById("ocene-3").innerText = predstava.ocene[2];
                document.getElementById("ocene-2").innerText = predstava.ocene[1];
                document.getElementById("ocene-1").innerText = predstava.ocene[0];
            } else{
                alert("Greska prilikom ucitavanja predstave.");
            }
        }
    };
    request.open("GET", firebaseUrl + "/predstave/"+ predstaveID +"/"+ predstavaID +".json");
    request.send();
 
    function ucitajKomentare(p, ml, link, link1){
        for(let k in p){
            let komentar = {};
            komentar.tekst = p[k].tekst;
            komentar.komentari = p[k].komentari;
 
            let link = link1
            let divWrapper = document.createElement("div");
            divWrapper.classList.add("wrapper");
            divWrapper.setAttribute("style", "margin-left:" + ml.toString() + "px");
           
            let divWrapperKomentar = document.createElement("div");
            divWrapperKomentar.classList.add("wrapper-komentar");
            divWrapperKomentar.innerText = komentar.tekst;
           
            let buttonKomentar = document.createElement("button");
            buttonKomentar.classList.add("button-23");
            buttonKomentar.setAttribute("id", i);
            buttonKomentar.innerText = "Odgovori";
            buttonKomentar.addEventListener("click", function(e){
                console.log(link);
                replyButtonEvent(e, link);
            });
 
            divWrapper.appendChild(divWrapperKomentar);
            divWrapper.appendChild(buttonKomentar);
 
//            for(let odg in komentar.odgovori){
//                let divWrapperOdg = document.createElement("div");
//                divWrapperOdg.classList.add("wrapper");
//                divWrapperOdg.setAttribute("style", "margin-left:30px");
//
//                let divWrapper2 = document.createElement("div");
//                divWrapper2.classList.add("wrapper-komentar");
//                divWrapper2.innerText = komentar.odgovori[odg];
//
//                divWrapperOdg.appendChild(divWrapper2);
//                divWrapper.appendChild(divWrapperOdg);
//            }
            document.getElementById("allComments").appendChild(divWrapper);
            link += "/komentari/" + k;
            link1 += "/komentari/" + k;
            ucitajKomentare(p[k].komentari, ml + 30, link, link1);
            link1 = link.replace("/komentari/" + k, "");
            i++;
        }
    }
 
    prijava();
    registracija();
 
    document.getElementById("addComments").addEventListener("click", function (ev) {
        addComment(ev, "");
    });
 
    function hasClass(elem, className) {
        return elem.className.split(" ").indexOf(className) > -1;
    }  
 
    function addComment(ev, link) {
        let request1 = new XMLHttpRequest();
        let commentText, wrapDiv;
        let commentContainer = document.getElementById("allComments");
        const textBox = document.createElement("div");
        const replyButton = document.createElement("button");
        if(hasClass(ev.target.parentElement, "container")) {
            commentText = document.getElementById("newComment").value;
            if(commentText != ""){
                const wrapDiv = document.createElement("div");
                replyButton.className = "button-23";
                replyButton.innerHTML = "Odgovori";
//                replyButton.setAttribute("id", i);
//                i++;
                replyButton.addEventListener("click", function(e){
                    replyButtonEvent(e, link);
                });
                wrapDiv.className = "wrapper";
                wrapDiv.style.marginLeft = 0;
                document.getElementById("newComment").value = '';
                textBox.classList.add("wrapper-komentar")
                textBox.innerText = commentText;
                wrapDiv.append(textBox, replyButton);
                commentContainer.appendChild(wrapDiv);
                let noviKomentar = {tekst : commentText};
                predstava.komentari = komentari;
                request1.open("POST", firebaseUrl + "/predstave/"+ predstaveID +"/"+ predstavaID +"/komentari.json", true);
                request1.send(JSON.stringify(noviKomentar));
                alert("Uspesno dodat komentar.");
                window.location.reload();
//                window.location.href = "predstava.html?id=" + predstaveID + "&" + predstavaID;
            }
            else{
                alert("Niste uneli komentar!");
                return;
            }
        } else {
            commentText = ev.target.parentElement.firstElementChild.value;
            if(commentText != ""){
                wrapDiv = ev.target.parentElement;
                let indeks = ev.target.id;
                let noviKomentar = {tekst : commentText};
                replyButton.className = "button-23";
                replyButton.innerHTML = "Odgovori";
                replyButton.setAttribute("id", i);
                i++;
                replyButton.addEventListener("click", function(e){
                    replyButtonEvent(e, link);
                });
                textBox.classList.add("wrapper-komentar")
                textBox.innerText = commentText;
                wrapDiv.innerText = "";
                wrapDiv.append(textBox, replyButton);
                predstava.komentari = komentari;
                request1.open("POST", firebaseUrl + "/predstave/"+ predstaveID +"/"+ predstavaID + link + "/komentari.json", true);
                request1.send(JSON.stringify(noviKomentar));
                alert("Uspesno dodat komentar.");
                window.location.reload();
//                 window.location.href = "predstava.html?id=" + predstaveID + "&" + predstavaID;
            }
            else{
                alert("Niste uneli komentar!");
                return;
            }
        }
    }
 
    function replyButtonEvent(e, link){
        if (hasClass(e.target, "button-23")) {
            const parentDiv = e.target.parentElement;
            const wrapDiv = document.createElement("div");
            wrapDiv.style.marginLeft = (Number.parseInt(parentDiv.style.marginLeft) + 30).toString() + "px";
            wrapDiv.className = "wrapper";
            const textArea = document.createElement("textarea");
            textArea.style.marginRight = "20px";
            textArea.placeholder = "Odgovor na komentar...";
            const addButton = document.createElement("button");
            addButton.classList.add("addReply");
            addButton.innerHTML = "Dodaj";
            addButton.setAttribute("id", e.target.id);
            addButton.addEventListener("click", function(e){
                addComment(e, link);
            });
            const cancelButton = document.createElement("button");
            cancelButton.innerHTML = "Odustani";
            cancelButton.classList.add("cancelReply");
            cancelButton.addEventListener("click", function(e){
                e.target.parentElement.innerHTML = "";
            });
            wrapDiv.append(textArea, addButton, cancelButton);
            parentDiv.appendChild(wrapDiv);
        } else if(hasClass(e.target, "addReply")) {
            addComment(e, link);
        } else if(hasClass(e.target, "cancelReply")) {
            e.target.parentElement.innerHTML = "";
        }
    }    
}
