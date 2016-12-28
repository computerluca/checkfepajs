'use strict';

class ControlliAbstract{
    constructor(file_xml){
        this.file_xml= file_xml;
        this.xml_manager = new FatturaXML(file_xml);
        this.lista_anomalie = [];
    }
}