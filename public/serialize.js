(function() {
        'use strict';
        
        // Set the name of the "hidden" property and the change event for visibility
        var hidden, visibilityChange; 
        if (typeof document.hidden !== "undefined") {
          hidden = "hidden";
          visibilityChange = "visibilitychange";
        } else if (typeof document.mozHidden !== "undefined") { // Firefox up to v17
          hidden = "mozHidden";
          visibilityChange = "mozvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") { // Chrome up to v32, Android up to v4.4, Blackberry up to v10
          hidden = "webkitHidden";
          visibilityChange = "webkitvisibilitychange";
        }
        

       function serialize(){
         var form = document.getElementsByTagName("form");
            var nome = form[0].attributes.name.nodeValue;
            var oggetto = {};
            if(form[0].attributes.serialize){
                var inputo = undefined;
                for(var inputo of form[nome]){
                  
                    if(inputo.name){
                    oggetto[inputo.name]=inputo.value;
                    }
                }
            }
                        localStorage.setItem("form."+nome,JSON.stringify(oggetto));

       }
       
        function handleVisibilityChange() {
          if (document[hidden]) {
            
            serialize();
            
          } 
        }
                  document.addEventListener(visibilityChange, handleVisibilityChange, false);
                  document.addEventListener('change', serialize);



       
          

    })();
        (function(){
                    'use strict';

        var form = document.getElementsByTagName("form");
            var nome = form[0].attributes.name.value;
          
            
                var deserialize = JSON.parse(localStorage.getItem("form."+nome));
                for (var property in deserialize) {
                        form[nome][property].value = deserialize[property];

                }
                
                
            
        
        })();