'use strict';

class ControlliPerDettaglio extends ControlliAbstract {
    constructor(file_xml){
               super(file_xml);
                this.righe_dettaglio = this.xml_manager.get_righe_dettaglio();


    }
    controlla(){
    	if(!this.xml_manager.valida_file()){
    		this.lista_anomalie.push({error:"Errore nel calcolo delle anomalie! File xml non corretto"});	
    	}
    	else{
                this.controlla_aliquota_iva_dettagli();
                this.controlla_prezzo_totale();
    	}
                return this.lista_anomalie;
    }
    controlla_riepilogo_dettagli(){
        let righe_dettaglio = this.xml_manager.get_righe_dettaglio();
        let ive_dettaglio =[];
        let ive_riepilogo = this.xml_manager.return_lista_riepilogo();
        if(ive_riepilogo){
            ive_riepilogo = ive_riepilogo.length;
        }
        for(var i=0;i<righe_dettaglio.length;i++){
            if (ive_dettaglio.indexOf(righe_dettaglio[i].AliquotaIVA)){
                ive_dettaglio.push(righe_dettaglio[i].AliquotaIVA);
            }
        }
        if(ive_riepilogo<ive_dettaglio.length){
            
        this.lista_anomalie.push({blocking:'Nel riepilogo imponibile + iva non sono presenti tutte le aliquote ive dei dettagli. In particolare nelle righe_dettaglio sono presenti le seguenti aliquote'});
        
            
        }
    }
    controlla_aliquota_iva_dettagli(){
        
        for(var i =0;i<this.righe_dettaglio.length;i++){
            if(parseFloat(this.righe_dettaglio[i].AliquotaIVA)==0.00 && !(this.righe_dettaglio[i].Natura)){
                this.lista_anomalie.push({blocking:' Il campo Natura non presente nel dettaglio di fattura elettronica ' + this.righe_dettaglio[i].NumeroLinea + ' a fronte di 2.2.1.12 <AliquotaIVA> pari a zero'});
            }
            else{
                if(this.righe_dettaglio[i].Natura && parseFloat(this.righe_dettaglio[i].AliquotaIVA)!==0.00){
                this.lista_anomalie.push({blocking:' Il campo Natura presente nel dettaglio di fattura elettronica ' + this.righe_dettaglio[i].NumeroLinea + ' a fronte di Aliquota iva  diversa da zero'});
                }
            }
        }
        
    }
    round(num){
    return Math.round(num * 100) / 100;
  }

    controlla_prezzo_totale(){
        for(var i=0;i<this.righe_dettaglio.length;i++){
        	let somma_sconti_dettaglio=parseFloat(this.xml_manager.somma_sconti_dettaglio(this.righe_dettaglio[i].NumeroLinea));
        	let Quantita = parseFloat(!this.righe_dettaglio[i].Quantita?1:this.righe_dettaglio[i].Quantita);
        	let PrezzoTotale = parseFloat(this.righe_dettaglio[i].PrezzoTotale);
        	let PrezzoUnitario = parseFloat(this.righe_dettaglio[i].PrezzoUnitario);
        	let PrezzoTotaleCalcolato = this.round((PrezzoUnitario - somma_sconti_dettaglio)*Quantita);
        	if(PrezzoTotale !=PrezzoTotaleCalcolato){
        		this.lista_anomalie.push(new Anomalia(this.righe_dettaglio[i].NumeroLinea,'PrezzoTotale',PrezzoTotaleCalcolato,PrezzoTotale,'Errore','Quadratura').toString());
        	}

        }


    }
    
}