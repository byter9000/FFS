
// ******************************************************************
// Angular app and controller for requesting the ship information
// and creating ship rows.
// ****************************************************************** 
var shipfile = 'ships.json';
angular.module('mainApp', [])
.controller('mainCtrl', ['$scope', '$filter', '$http', '$interval', function($scope, $filter, $http, $interval) {
	//$scope.menuItems = menuItems;
		
	$scope.collapse = function(menu) {
		
    };
	
	$scope.menuItemClicked = function(menuItem) {
		document.getElementById("mainDisplay").src = menuItem.id + ".jsp";
		//alert("here");
	};
	
	
	
	$scope.menuItems = [
          {
              name        : "Aircraft",
              id          : "aircraft",
              isCollapsed : true,
              font_style  : "normal",            
              fields      : [
                       {
                           name        : "New",
                           id          : "aircraftNew",
                           fields      : [],
                           isCollapsed : true,
                           font_style  : "normal"
                       },
                       {
                           name        : "View",
                           id          : "aircraftView",
                           fields      : [],
                           isCollapsed : true,
                           font_style  : "normal"
                       },
					   {
                           name        : "Edit",
                           id          : "aircraftEdit",
                           fields      : [],
                           isCollapsed : true,
                           font_style  : "normal"
                       }
               ],
          }, 		 		 
          {
              name        : "Ground Vehicles",
              id          : "grndVeh",
			  isCollapsed : true,
              font_style  : "normal",
              fields      : [
                       {
                           name        : "New",
                           id          : "grndVehNew",
                           fields      : [],
                           isCollapsed : true,
                           font_style  : "normal"
                       },
                       {
                           name        : "View",
                           id          : "grndVehView",
                           fields      : [],
                           isCollapsed : true,
                           font_style  : "normal"
                       },
                       {
                           name        : "Edit",
                           id          : "grndVehEdit",
                           fields      : [],
                           isCollapsed : true,
                           font_style  : "normal"
                       }
               ]
          }, 
		  {
              name        : "Heavy Weapons",
              id          : "hWeps",
              isCollapsed : true,
              font_style  : "normal",          
              fields      : [
                       {
                           name        : "New",
                           id          : "hWepsNew",
                           fields      : [],
                           isCollapsed : true,
                           font_style  : "normal"
                       },
                       {
                           name        : "View",
                           id          : "hWepsView",
                           fields      : [],
                           isCollapsed : true,
                           font_style  : "normal"
                       },
					   {
                           name        : "Edit",
                           id          : "hWepsEdit",
                           fields      : [],
                           isCollapsed : true,
                           font_style  : "normal"
                       }
               ],
          },
          {
              name        : "Lift Vehicles",
              id          : "liftVeh",
              isCollapsed : true,
              font_style  : "normal",
              fields      : [
                      {
                          name        : "New",
                          id          : "liftVehNew",
                          fields      : [],
                          isCollapsed : true,
                          font_style  : "normal"
                      },
                      {
                          name        : "View",
                          id          : "liftVehView",
                          fields      : [],
                          isCollapsed : true,
                          font_style  : "normal"
                      },
					  {
                          name        : "Edit",
                          id          : "liftVehEdit",
                          fields      : [],
                          isCollapsed : true,
                          font_style  : "normal"
                      }
              ]
          },
		  {
              name        : "Munitions",
              id          : "munitions",
              isCollapsed : true,
              font_style  : "normal",            
              fields      : [
                       {
                           name        : "New",
                           id          : "munitionsNew",
                           fields      : [],
                           isCollapsed : true,
                           font_style  : "normal"
                       },
                       {
                           name        : "View",
                           id          : "munitionsView",
                           fields      : [],
                           isCollapsed : true,
                           font_style  : "normal"
                       },
					   {
                           name        : "Edit",
                           id          : "munitionsEdit",
                           fields      : [],
                           isCollapsed : true,
                           font_style  : "normal"
                       }
               ],
          },
		  {
              name        : "Personal Armor",
              id          : "armor",
              isCollapsed : true,
              font_style  : "normal",           
              fields      : [
                       {
                           name        : "New",
                           id          : "armorNew",
                           fields      : [],
                           isCollapsed : true,
                           font_style  : "normal"
                       },
                       {
                           name        : "View",
                           id          : "armorView",
                           fields      : [],
                           isCollapsed : true,
                           font_style  : "normal"
                       },
					   {
                           name        : "Edit",
                           id          : "armorEdit",
                           fields      : [],
                           isCollapsed : true,
                           font_style  : "normal"
                       }
               ],
          },
          {
              name        : "Small Arms",
              id          : "smArms",
              isCollapsed : true,
              font_style  : "normal",
              fields      : [
						{
						   name        : "New",
						   id          : "smArmsNew",
						   fields      : [],
						   isCollapsed : true,
						   font_style  : "normal"
						},
						{
						   name        : "View",
						   id          : "smArmsView",
						   fields      : [],
						   isCollapsed : true,
						   font_style  : "normal"
						},
						{
						   name        : "Edit",
						   id          : "smArmsEdit",
						   fields      : [],
						   isCollapsed : true,
						   font_style  : "normal"
					   }
              ]
          },          
          {
              name        : "Space Craft",
              id          : "spaceCraft",
              isCollapsed : true,
              font_style  : "normal",
              fields      : [
                      {
                          name        : "New",
                          id          : "spaceCraftNew",
                          fields      : [],
                          isCollapsed : true,
                          font_style  : "normal"
                      },
					  {
                          name        : "View",
                          id          : "spaceCraftView",
                          fields      : [],
                          isCollapsed : true,
                          font_style  : "normal"
                      },
					  {
                          name        : "Edit",
                          id          : "spaceCraftEdit",
                          fields      : [],
                          isCollapsed : true,
                          font_style  : "normal"
                      }
              ]
          }
      ];
		
}]);

















