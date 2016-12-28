'use strict';
let ElaborazioniManager = {
    crea_elaborazione:function(elaborazione){
        return axios.post('/elaborazione',elaborazione);
    },
    visualizza_elaborazioni:function(){
        return axios.get('/elaborazione');
    },
    visualizza_elaborazione:function(id){
        return axios.get('/elaborazione/'+id);
    }
}