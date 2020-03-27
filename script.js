$(document).ready(function(){            // when the DOM is ready
    var times;                          // declare global variable
    $.ajax({
        beforeSend: function(xhr){
            if(xhr.overrideMimeType){
                xhr.overrideMimeType('application/json');
            }
        }
    })
})
