  
//var ships_data = "servlet/ps.commands.DisplayInf";
var ships = [{
	"Name"		:	"Ave Maria",
	"Class"		:	"Empress Marva",
	"Model"		:	"Far Trader",
	"HullSize"	:	"200",
	"Status"	: 	"In Progress"
},
{
	"Name"		:	"INS Rhodes",
	"Class"		:	"Lunshaar Kilaalum",
	"Model"		:	"Patrol Cruiser",
	"HullSize"	:	"400",
	"Status"	: 	"Complete"
},
{
	"Name"		:	"INS Register",
	"Class"		:	"Gazelle",
	"Model"		:	"Close Escort",
	"HullSize"	:	"300",
	"Status"	: 	"Complete"
},
{
	"Name"		:	"Bangor",
	"Class"		:	"Akkigish",
	"Model"		:	"Subsidized Merchant",
	"HullSize"	:	"400",
	"Status"	: 	"Complete"
},
{
	"Name"		:	"Grand Isle",
	"Class"		:	"Lady of Shallot",
	"Model"		:	"Yacht",
	"HullSize"	:	"200",
	"Status"	: 	"Complete"
},
{
	"Name"		:	"Runner",
	"Class"		:	"Beowulf",
	"Model"		:	"Free Trader",
	"HullSize"	:	"200",
	"Status"	: 	"In Progress"
},
{
	"Name"		:	"Far Seeker",
	"Class"		:	"Suleiman",
	"Model"		:	"Scout/Courier",
	"HullSize"	:	"100",		
	"Status"	: 	"Complete"
},
{
	"Name"		:	"Grunt",
	"Class"		: 	"Dragon",
	"Model"		:	"System Defense Boat",		
	"HullSize"	:	"400",
	"Status"	: 	"Complete"
},
{
	"Name"		:	"Magesty",
	"Class"		:	"Kugashin",
	"Model"		:	"Lab",
	"HullSize"	:	"400",
	"Status"	: 	"Complete"
},
{
	"Name"		:	"Belle",
	"Class"		:	"Nishemani",
	"Model"		: 	"Corsair",
	"HullSize"	:	"400",
	"Status"	: 	"Complete"
}	];

// ******************************************************************
// Angular app and controller for requesting the ship information
// and creating ship rows.
// ****************************************************************** 
var shipfile = 'ships.json';
angular.module('shipRowApp', [])
.controller('shipRowCtrl', ['$scope', '$filter', '$http', '$interval', function($scope, $filter, $http, $interval) {
	var orderBy = $filter('orderBy'); 
    var command = "monitor";   
    var my_predicate = null;
    var my_reverse = null; 
	
	$scope.ships = ships;
	
	// First load of ship data 
    // $http.get(access, {params: {host:sessionStorage.getItem("host"), area:sessionStorage.getItem("area"), cmd:command}}).success(function(response)
    // {        
        // interfaces = check_data(response.interfaces);
        // interfaces = convert_times(interfaces);
        // $scope.names = interfaces;
        // $scope.getLast(interfaces);
        // Reset main's refresh timer
        // sessionStorage.setItem("timer", 16);
    // });

	// test data
	//$scope.names = JSON.parse(ships.json);
	
	//Fires on page load complete
	$scope.$watch('$viewContentLoaded',function() {
	    resize();	
	});	
	
	// Sort by column header clicked on.
    $scope.sort = function(predicate, reverse) 
    {   
        if(predicate === null) {
            // No sort has been selected, exit
            return;
        }
        
        if(my_predicate !== null) {
            document.getElementById(my_predicate + "Asc").style.display = "none";
            document.getElementById(my_predicate + "Dec").style.display = "none";
        }
               
        // Check if a new column is clicked, sort ascending.
        if(predicate !== my_predicate) {
            reverse = true;
        } 

        if(reverse) {
            document.getElementById(predicate + "Asc").style.display = "none";
            document.getElementById(predicate + "Dec").style.display = "";
        }
        else {
            document.getElementById(predicate + "Asc").style.display = "";
            document.getElementById(predicate + "Dec").style.display = "none";
        }
        
        $scope.order($scope.ships, predicate, reverse);     
        
    };
    
    $scope.order = function(ships, predicate, reverse) 
    {                
        $scope.ships = sort(ships, predicate, reverse);
        my_predicate = predicate;
        my_reverse = reverse;
    };
	
	$scope.load_ship = function(shipName) {
		var ship;
		for(i = 0; i < $scope.ships.length; i++) {
			if($scope.ships[i] === shipName) {
				ship = $scope.ships[i];
			}
		}
		alert("here");
	}
	
	
	
}]);

function resize() {
    document.getElementById("mainDiv").style.width   = window.innerWidth - 15 + "px";
    document.getElementById("frameBody").style.width = window.innerWidth - 15 + "px";
}

//********************************************************************
//sort()
//
//A basic sort to handle sorting of the interface rows
//********************************************************************
function sort(array, predicate, reverse) 
{  
    for(i = 0; i < array.length; i++) {
        for(j = 0; j < array.length - 1; j++) {
            var pos_i;
            var pos_j;
            
            switch(predicate) {
                case "Status":
                    pos_i = array[i].Status;
                    pos_j = array[j].Status;
                    is_num = false;
                    break;
                case "Class":
                    pos_i = array[i].Class;
                    pos_j = array[j].Class;
                    break;
                case "Model":
                    pos_i = array[i].Model;
                    pos_j = array[j].Model;
                    break;
                case "HullSize":
                    pos_i = array[i].HullSize;
                    pos_j = array[j].HullSize;
                    break;
                default: // Sort by Name
                    pos_i = array[i].Name;
                    pos_j = array[j].Name;
                    break;
            }
    
            if( (pos_i === "no data") || (pos_i === "-") || (pos_i === "") || (pos_i === "undefined") ) {
                pos_i = -1;
            }
             
            if( (pos_j === "no data") || (pos_j === "-") || (pos_j === "") || (pos_j === "undefined") ) {
                pos_j = -1;
            }
             
            // If same, sort by Name
            if(pos_i === pos_j) {
                pos_i = array[i].Name;
                pos_j = array[j].Name;
                is_num = false;
            }
            array = check(array, reverse, i, j, pos_i, pos_j);
         }
    }
 
    return array;
}
