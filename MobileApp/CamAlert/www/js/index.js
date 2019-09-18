var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

    
};


/*||||||||||||||||||||||||||||||||--Navbar Menu Animations--||||||||||||||||||||||||||||||||||*/

function navAnimate() {             //Fade in effect on open
    $("#sideMenu a").show(400);     
    $("#sideMenu").animate({
        width:'240px'
    });
    $("#nav-container").css("display","flex");
};

function closeMenu(){
    $("#sideMenu a").hide(1000);
    $("#sideMenu").animate({
        width:'0px'
    },
    function(){$("#nav-container").hide(1000)});
}
/*|||||||||||||||||||||||||||||||||||--Navbar Menu Options--|||||||||||||||||||||||||||||||||||||*/

function navOptionSelect(x) {            //Menu Animations
    
    
    
    if(x==1){                           //to open Home menu
        $("#BackButton").hide();
        if($("#Mon").css("height")!='0px')
        {
            $("#Mon").animate({
                height:"0vh"
            });
        }
        else{
            $("#Rec").animate({
                height:"0vh"
            });
        }
        $("#sideMenu a").hide(1000);
        $("#sideMenu").animate({
            width:'0px'
        }, function(){$("#nav-container").hide(1000)});
    }

    if(x == 2){
    $("#BackButton").show(200);                         //to open Record menu
    $("#Rec").animate({
        height:'100vh'
    });
    }
    
    if(x == 3)                          //to open Monitor menu
    $("#BackButton").show(200);
    $("#Mon").animate({
        height:'100vh'
    });

    
    if($("#Rec").css("height")!='0px')
    {
        $("#Rec").animate({
            height:"0vh"
        });
    }
    
    $("#sideMenu a").hide(1000);
    $("#sideMenu").animate({
        width:'0px'
    }, function(){$("#nav-container").hide(1000)});
};


$(document).ready(function () {

    $("#BackButton").click(function(){
        if($("#Mon").css("height")!='0px')
        {
            $("#Mon").animate({
                height:"0vh"
            });
        }
        else{
            $("#Rec").animate({
                height:"0vh"
            });
        }
        $("#BackButton").hide(200);
    })
    
    
    /*|||||||||||||||||||||||||||||||||||--To-Goto-HomePage--|||||||||||||||||||||||||||||||||||||*/
    $("#home").click(function(){
        
    });

    /*|||||||||||||||||||||||||||||||||||--To-Goto-RecordPane--|||||||||||||||||||||||||||||||||||||*/
    
    /*|||||||||||||||||||||||||||||||||||--To-Goto-MonitorPane--|||||||||||||||||||||||||||||||||||||*/


    /*|||||||||||||||||||||||||||||||||||--To-Open-RecordPane--|||||||||||||||||||||||||||||||||||||*/
    $("#cont1").click(function(){
        $("#Rec").animate({
            height:'100vh'
        });
        $("#BackButton").show(200);
    });
    /*|||||||||||||||||||||||||||||||||||--To-Open-MonitorPane--|||||||||||||||||||||||||||||||||||||*/
    $("#cont2").click(function(){
        $("#Mon").animate({
            height:'100vh'
        }); 
        $("#BackButton").show(200);
    });
    
    
});
  
app.initialize();