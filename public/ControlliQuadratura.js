'use strict';

class ControlliQuadratura {
  constructor(file_xml) {
    this.lista_anomalie = [];
    this.file_xml = file_xml;
    
  }
  controlli_per_dettaglio(){
    let an = new ControlliPerDettaglio(this.file_xml);
    return an.controlla();
   
  }
  controlli_per_totale(){
    let an = new ControlliTesta(this.file_xml);
    return an.controlla();
    
  }
  controlla_file(){
    let anomalie_dettaglio = this.controlli_per_dettaglio();
    let anomalie_totale = this.controlli_per_totale();

    return anomalie_dettaglio.concat(anomalie_totale);

  }
}

