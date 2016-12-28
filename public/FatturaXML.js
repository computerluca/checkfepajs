'use strict';

class FatturaXML {
  constructor(file_xml){
    this.file_xml = file_xml;
     this.x2js = new X2JS();
    this.xml_json =  this.x2js.xml_str2json(file_xml);
   

  }
  valida_file(){  
    
    return this.xml_json;
  }
  get_righe_dettaglio(){
    let righe_dettaglio_lista = [];
    if(this.valida_file()){
   let righe_dettaglio = this.xml_json.FatturaElettronica.FatturaElettronicaBody.DatiBeniServizi.DettaglioLinee;
   if(!righe_dettaglio.length){
     righe_dettaglio_lista.push(righe_dettaglio);
   }
   else{
     righe_dettaglio_lista = righe_dettaglio;
   }
   return righe_dettaglio_lista;
    }

  }
  get_riga_dettaglio(dett){
    let righe_dettaglio = this.xml_json.FatturaElettronica.FatturaElettronicaBody.DatiBeniServizi.DettaglioLinee;
    if(righe_dettaglio.length){
    let riga = righe_dettaglio.filter(function(detto){
      return detto.NumeroLinea === dett;
    })
    return riga[0];
    }
    else{
      return righe_dettaglio;
    }
    
  }
  round(num){
    return Math.round(num * 100) / 100;
  }

  somma_sconti_dettaglio(dett){
    let somma = 0.00;
    let riga_dettaglio = this.get_riga_dettaglio(dett);
    let sconti = [];
    let sconto;
    if(riga_dettaglio && riga_dettaglio.hasOwnProperty("ScontoMaggiorazione")){
          if(!riga_dettaglio.ScontoMaggiorazione.length){
            
            sconti.push(riga_dettaglio.ScontoMaggiorazione);
          }
          else{
            sconti=riga_dettaglio.ScontoMaggiorazione;
          }
    }
    for (sconto of sconti){
      
      if(sconto.Tipo==="SC"){
        
             if(sconto.Importo){
        somma+=this.round(sconto.Importo*riga_dettaglio.Quantita);
        }
        else{
          somma+=this.round((riga_dettaglio.PrezzoUnitario*riga_dettaglio.Quantita)*(sconti[i].Percentuale));
        }
      }
    }
          
      
     
      
   
    return  somma;
  }
 
  
 
  return_somma_imponibili_dettaglio(){
      let righe_dettaglio = this.get_righe_dettaglio();
      let sum =0;
      let prezzi_totali;
     for(let prezzi_totali of righe_dettaglio){
        sum+=prezzi_totali.PrezzoTotale;
      }
      return this.round(sum);
  }
  check_aliquota(aliquota){
    return (aliquota===0.00 || aliquota < 1.00)
  }
  return_somma_dett_per_aliquota(aliquota){
  
    let righe_dettaglio = this.get_righe_dettaglio();
          let sum =0;

          for(let i=0;i<righe_dettaglio.length;i++){
            if(parseFloat(righe_dettaglio[i].AliquotaIVA)==aliquota){
              sum+=parseFloat(righe_dettaglio[i].PrezzoTotale);
            }
          }
        
        return this.round(sum);
  }
  return_somma_iva_dett_per_aliquota(aliquota){
    var righe_dettaglio = this.get_righe_dettaglio();
    var somma = 0;
    for (var i=0;i<righe_dettaglio[i].length;i++){
      if(parseFloat(righe_dettaglio[i].AliquotaIVA) == aliquota){
        somma+=this.round(parseFloat(righe_dettaglio[i].ImponibileImporto)*parseFloat(righe_dettaglio[i].Aliquota)/100);
      }
    }
  }
  return_lista_dett_per_aliquota(aliquota){
    var righe_dettaglio = this.get_righe_dettaglio();
    function filtra_per_aliquota(oggetto){
      return (parseFloat(oggetto.AliquotaIVA) == aliquota);
    }
    
    return righe_dettaglio.filter(filtra_per_aliquota);
  }
  return_somma_imponibili_riepilogo(){
    var lista_riepilogo = this.return_lista_riepilogo();
    var somma = 0;
    for(var i =0;i<lista_riepilogo.length;i++){
      somma+=parseFloat(lista_riepilogo[i].ImponibileImporto);
    }
    return somma;
  }
  return_somma_maggiorazioni_dettaglio(dett){
     let somma = 0.00;
    let riga_dettaglio = this.get_riga_dettaglio(dett);
    let maggiorazioni = [];
    if(riga_dettaglio.hasOwnProperty("ScontoMaggiorazione")){
          if(!riga_dettaglio.ScontoMaggiorazione.length){
            maggiorazioni.push(riga_dettaglio.ScontoMaggiorazione);
          }
          else{
            maggiorazioni=riga_dettaglio.ScontoMaggiorazione;
          }
    }
    for(let i=0;i<maggiorazioni.length;i++){
      if(maggiorazioni[i].Tipo==="MG"){
             if(maggiorazioni[i].Importo){
        somma+=this.round(maggiorazioni[i].Importo*riga_dettaglio.Quantita);
        }
        else{
          somma+=this.round((riga_dettaglio.PrezzoUnitario*riga_dettaglio.Quantita)*(maggiorazioni[i].Percentuale));
        }
      }
    }
          
      
     
      
   
    return  somma;
  }
  return_somma_imponibili_riepilogo_per_aliquota(aliquota){
var lista_riepilogo = this.return_lista_riepilogo();
    var somma = 0;
    for(var i =0;i<lista_riepilogo.length;i++){
      if(parseFloat(lista_riepilogo[i].AliquotaIVA) == aliquota){
      somma+=parseFloat(lista_riepilogo[i].ImponibileImporto);
      }
    }
    return somma;
  }
  return_lista_imponibili_riepilogo_per_aliquota(aliquota){
     var righe_dettaglio = this.return_somma_imponibili_riepilogo();
    function filtra_per_aliquota(oggetto){
      return (parseFloat(oggetto.AliquotaIVA) == aliquota);
    }
    
    return righe_dettaglio.filter(filtra_per_aliquota);
  }
  return_somma_iva_riepilogo(){
     var righe_dettaglio = this.return_lista_riepilogo();
    var somma = 0;
    for (var i=0;i<righe_dettaglio[i].length;i++){
        somma+=this.round(parseFloat(righe_dettaglio[i].Importo));
     
    }
  }
  return_somma_iva_riepilogo_per_aliquota(aliquota){
 var righe_dettaglio = this.return_lista_riepilogo();
    var somma = 0;
    for (var i=0;i<righe_dettaglio[i].length;i++){
      if(parseFloat(righe_dettaglio[i].AliquotaIVA) == aliquota){
        somma+=this.round(parseFloat(righe_dettaglio[i].Importo));
      }
    }
  }
  return_lista_riepilogo(){
    let riepilogo_lista = [];
    if(this.valida_file()){
      
   let righe_dettaglio = this.xml_json.FatturaElettronica.FatturaElettronicaBody.DatiBeniServizi.DatiRiepilogo;
   if(!righe_dettaglio.length){
     riepilogo_lista.push(righe_dettaglio);
   }
   else{
     riepilogo_lista = righe_dettaglio;
   }
   return riepilogo_lista;
    } 
  }
  return_lista_aliquote_imponibili(){
    let lista_imponibili = this.return_lista_riepilogo();
    let lista_aliquote =[];
     for(let i =0;i<this.get_righe_dettaglio();i++){
       if(lista_imponibili[i].AliquotaIVA.indexOf(lista_aliquote)===-1){
         lista_aliquote.push(lista_imponibili[i].AliquotaIVA);
       }
     }
  }
  return_lista_aliquote_dett(){
    let righe_dettaglio = this.get_righe_dettaglio();
    let lista_aliquote =[];
     for(let i =0;i<this.get_righe_dettaglio();i++){
       if(righe_dettaglio[i].AliquotaIVA.indexOf(lista_aliquote)===-1){
         lista_aliquote.push(righe_dettaglio[i].AliquotaIVA);
       }
     }
  }

}

