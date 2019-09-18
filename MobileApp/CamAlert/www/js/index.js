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

$(document).ready(function () {

    /*|||||||||||||||||||||||||||||||||||--To-Open-Navbar--|||||||||||||||||||||||||||||||||||||*/
    $("#NavButton").click(function () {
        $("#sideMenu a").show(400);     //fade in effect on open
        $("#sideMenu").animate({
            width:'240px'
        });
        $("#nav-container").css("display","flex");
        
       
    });

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
    /*|||||||||||||||||||||||||||||||||||--close-Navbar-Through-closeButton-|||||||||||||||||||||||||||||||||||||*/
    $(".closebtn").click(function()
    {   $("#sideMenu a").hide(1000); // since the animation effect on close is not smooth so i made the text disappear to make it smooth any better fix is appreciated
        $("#sideMenu").animate({
            width:'0px'
        }, function(){$("#nav-container").hide(1000)}); //To make transition look smooth
    });

    /*|||||||||||||||||||||||||||||||||||--To-Close-Navbar-ByClicking-Outside-|||||||||||||||||||||||||||||||||||||*/
    $("#navback").click(function () {
        $("#sideMenu a").hide(1000);
        $("#sideMenu").animate({
            width:'0px'
        }, function(){$("#nav-container").hide(1000)});
        
    });
    
    /*|||||||||||||||||||||||||||||||||||--To-Goto-HomePage--|||||||||||||||||||||||||||||||||||||*/
    $("#home").click(function(){
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
    });

    /*|||||||||||||||||||||||||||||||||||--To-Goto-RecordPane--|||||||||||||||||||||||||||||||||||||*/
    $("#Record").click(function()
    {
        $("#Rec").animate({
            height:'100vh'
        });
        $("#BackButton").show(200);
        if($("#Mon").css("height")!='0px')
        {
            $("#Mon").animate({
                height:"0vh"
            });
        }
        $("#sideMenu a").hide(1000);
        $("#sideMenu").animate({
            width:'0px'
        }, function(){$("#nav-container").hide(1000)});
    });
    /*|||||||||||||||||||||||||||||||||||--To-Goto-MonitorPane--|||||||||||||||||||||||||||||||||||||*/
    $("#Monitor").click(function()
    {
        $("#Mon").animate({
            height:'100vh'
        });
        $("#BackButton").show(200);
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
    });

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