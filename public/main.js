'use strict';
function salva(){
    let file_xml = document.getElementById("file_xml").value;
    let body={"nome_file":"ciao","testo":file_xml};
    XMLSaveManager.salva_file(body)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
function view_xslt(file_xml){
    controlla_file();
    var xml = JSON.parse(file_xml);
    console.log(xml);
    var html ='<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet ?>'+xml.file_xml;
    var blob = new Blob([html], {type: "text/xml;charset=utf-8"});
    saveAs(blob, "fattura.xml");
}
function reset(){
    let div_anomalie = document.getElementById("file_xml");
    div_anomalie.value = "";
 localStorage.setItem("file_xml","");
 let anomalie = document.getElementById("anomalie");
 anomalie.innerHTML="";
}
function controlla_file(){
    
    let file_xml = document.getElementById("file_xml").value.toString().trim();
    /* viene controllata la valorizzazione del file xml */
    if(!file_xml){
        alert("E' necessario valorizzare il file xml");
    }
    /* se l'utente ha valorizzato il file xml viene inizializzata l'applicazione */
    else{
        localStorage.setItem("form.esempio",JSON.stringify({file_xml:file_xml}));
       let start = new ControlliQuadratura(file_xml);
       let anomalie = start.controlla_file();
       let div_anomalie = document.getElementById('anomalie');

        if(anomalie.length> 0){
            div_anomalie.innerHTML = mostra_anomalie (anomalie);
        }
        else{
            div_anomalie.innerHTML = "Nessun anomalia rilevata nel file xml";
        }
    }

}

function mostra_anomalie(anomalie){
    let conta_warning = 0;
    let conta_error = 0;
  let html = "<ul>";
    for(let i =0;i<anomalie.length;i++){
        if(anomalie[i].hasOwnProperty('error')){
            html+="<li>Errore imprecisato nel calcolo delle anomalie. Dettaglio dell'errore" + anomalie[i]['error']+"</li></ul>";
            return html;
        }
        else{
            if(anomalie[i].hasOwnProperty("warning")){
                        html+="<li style='background-color:lightblue'>"+anomalie[i].warning+"</li>";
                        conta_warning ++;

            }
            if(anomalie[i].hasOwnProperty("blocking")){
                html +="<li style='background-color:red'>"+anomalie[i].blocking + "</li>";
                conta_error++;
            }
        }
    }
    html+="</ul>";
    if(conta_warning >0){
        html+="<h3>Sono presenti " + conta_warning + " avvisi non bloccanti. Sono evidenziati in blu";
    }
    if(conta_error>0){
        html+="<h3>Sono presenti " + conta_error + "errori bloccanti. Sono evidenziati in rosso! Controlla!"
    }
    return html;
}