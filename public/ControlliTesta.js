'use strict';

class ControlliTesta extends ControlliAbstract{
    constructor(file_xml){
        super(file_xml)
    }
    controlla(){
        
        if(!this.xml_manager.valida_file()){
            return false
        }
        else{
            return this.lista_anomalie;
        }
    }
    controlla_riepilogo(){
        return this.xml_manager.return_somma_imponibili_riepilogo();
    }
}