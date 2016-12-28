'use strict';

class Anomalia {
  constructor(rif_linea, campo, valore1, valore2,severity,tipo_anomalia) {

    this.rif_linea = rif_linea;
    this.tipo_anomalia = tipo_anomalia;
    this.campo = campo;
    this.valore1 = valore1;
    this.valore2 = valore2;
    this.severity = severity;
  }
  
  
  crea_anomalia_senza_dettaglio() {

    return this.severity + " di " + this.tipo_anomalia + " sul campo " + this.campo + ". Dovrebbe essere di importo " + this.valore1 + " mentre risulta di " + this.valore2;
  }
  crea_anomalia_con_dettaglio() {
    return this.severity + " di " + this.tipo_anomalia  + " sul campo " + this.campo + " alla riga dettaglio " + this.rif_linea + " Dovrebbe essere di importo " + this.valore1 + " mentre risulta di " + this.valore2;
  }
  crea_anomalia_con_dettaglio_campo_mancante(){
    return "Manca il campo "+ this.campo + " alla riga dettaglio " + this.rif_linea;
  }
  crea_anomalia(){
    if(!this.rif_linea){
      return this.crea_anomalia_senza_dettaglio();
    }
    else{
      return this.crea_anomalia_con_dettaglio();
    }
  }
  toString() {
    let anomalia = {};

        if(this.severity){
        if(this.severity === 'Avviso'){
        return {warning:this.crea_anomalia()};
        }
        else if(this.severity === 'Errore') {
          return {blocking:this.crea_anomalia()};
        }
        }
      
    return anomalia;
  }
}
