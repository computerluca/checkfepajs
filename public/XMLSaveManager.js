'use strict'
let XMLSaveManager={
    
    salva_file:function(body){
     
        return axios.post('/file_xml', body);

  

    },
    get_lista_file:function(){
        return axios.get('/file_xml');
  


    },
    get_file_per_nome:function(id){
            return axios.get('/file_xml/'+id);
  
    }
    
};
