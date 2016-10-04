
var app = angular.module('smArmsApp', []);
app.controller('smArmsCtrl', ['$scope', '$filter', '$http', '$interval', function($scope, $filter, $http, $interval) {
	

	var roundTypes = ["Ball", "HE", "DS", "HEAP", "Tranq"]
	var ammoCasings = ["Shotgun", "Necked", "Straight"];
	var boreTypes = ["Smooth", "Rifled"];
	var barrelTypes = ["Light", "Heavy"];
	var roundTL;
	var roundType;
	var caseType;
	var rndDiameter;
	var rndLength;
	var ETC = false;

	set_options("rndType", roundTypes, "Ball");
	set_options("caseType", ammoCasings, "Shotgun");
	set_options("boreType", boreTypes, "Smooth");
	set_options("barrelType", barrelTypes, "Light");
	
	$scope.weaponPrice = 0;
	
	
	// ammo tab
	$scope.trueRndLen = 0;
	$scope.rndWeight = 0;
	$scope.rndMuzzleVel = 0;
	$scope.rndPrice = 0;
	$scope.barrelWeight = 0;

	$scope.updateAmmo = function() {
		var massProd      = document.getElementById("massProd").checked;
		var el            = document.getElementById("rndType");
		ETC               = document.getElementById("rndETC").checked;		
		roundType         = el.options[el.selectedIndex].value;
		el                = document.getElementById("caseType");
		caseType          = el.options[el.selectedIndex].value;
		roundTL           = document.getElementById("rndTL").value;
		rndDiameter       = document.getElementById("diameterInput").value;
		rndLength         = document.getElementById("lengthInput").value;	
		$scope.trueRndLen = Math.round(rndLength);
		
		if(caseType === "Necked") {
			$scope.trueRndLen = Math.round(rndLength * 1 + rndDiameter * 2);
		}
		
		if(caseType === "Straight") {
			$scope.trueRndLen += Math.round(rndDiameter * 1);
		}
					
		var energyMod = ammoEnergyMod(roundTL * 1);
		if(energyMod === false) {
			alert("A tech level of " + roundTL + " is below the minimum TL of 3. Please enter TL 3 or above.");
			document.getElementById("rndTL").value = "";
			document.getElementById("rndTL").focus();
			return;
		}
		
		$scope.rndWeight    = Math.round(ammoWeightMod(caseType) * rndLength * Math.pow((rndDiameter / 2), 2) * Math.PI);
		alert(ammoWeightMod(caseType));
		$scope.rndMuzzleVel = Math.round(energyMod.tm * ammoCartMod(caseType, ETC) * rndLength * Math.pow((rndDiameter / 2) * 1, 2) * Math.PI); 
		$scope.rndPrice     = Math.round($scope.rndWeight * ammoPriceMod(caseType, $scope.rndMuzzleVel) * 100) / 100;
		if( (roundType === "HE") ||
			(roundType === "DS") ||
			(roundType === "Tranq") ) {
			$scope.rndPrice *= 2;
		}
		if(roundType === "HEAP") {
			$scope.rndPrice += 3;
		}
	}
	
	
	
	// Barrel tab
	$scope.updateBarrel = function() {
		var boreType   = "Rifled";
		var barrelType = "Light";
		var barrelLen  = document.getElementById("barrelLen").value;		
		
		if(barrelLen < $scope.minBarrelLen) {	
			document.getElementById("barrelLen").focus();
			alert("Actual barrel length cannot be less than the minimum barrel length");
			return;
		}
		if(barrelLen > $scope.maxBarrelLen) {
			document.getElementById("barrelLen").focus();
			alert("Actual barrel length cannot exceed the maximum barrel length");
			return;
		}
		
		if(barrelType === "Light") {
			$scope.barrelWeight = barrelLen * .02;
		}
		else {
			$scope.barrelWeight = barrelLen * .03;
		}

		$scope.barrelPrice  = $scope.barrelWeight * 1 * ammoPriceMod(caseType, $scope.rndMuzzleVel, document.getElementById("massProd").checked);
		$scope.weaponPrice += $scope.barrelPrice * 1;
		$scope.barrelEnergy = $scope.rndMuzzleVel * (1 + (.5 * ((barrelLen / $scope.avgBarrelLen) - 1)));
		$scope.barrelDamage = Math.round(Math.sqrt($scope.barrelEnergy) / 15);
		$scope.barrelPen    = barrelPenetration($scope.barrelEnergy);
	}

	
	// Tab code
    $scope.onTabClick = function (tab) {
		if($scope.currentTab !== null) {
			document.getElementById($scope.currentTab.div).style.display = "none";
		}
		if(tab.div === "barrelTab") {
			$scope.avgBarrelLen = Math.round(($scope.rndMuzzleVel / Math.pow(rndDiameter, 2)) * barrelBoreMod(boreType, ETC));
			$scope.minBarrelLen = Math.round($scope.avgBarrelLen * .2);
			$scope.maxBarrelLen = Math.round($scope.avgBarrelLen * 2.3);
		}
        $scope.currentTab = tab;
		document.getElementById(tab.div).style.display = "";
    }
    
    $scope.isActiveTab = function(tab) {
        return tab == $scope.currentTab;
    }

	$scope.receiver = function() {
		
	}
	
	$scope.tabs = [
	   {
		   title    : 'Ammunition',
		   div      : 'ammoTab',
		   disabled : false
	   },
	   {
		   title    : 'Barrel',
		   div      : 'barrelTab',
		   disabled : false
	   },
	   {
		   title    : 'Receiver',
		   div      : 'receiverTab',
		   disabled : false
	   },
	   {
		   title    : 'Stock',
		   div      : 'stockTab',
		   disabled : false
	   },
	   {
		   title    : 'Feed System',
		   div      : 'feedSystemTab',
		   disabled : false
	   },
	   {
		   title    : 'Options',
		   div      : 'optionsTab',
		   disabled : false
	   }
    ];
	$scope.currentTab = $scope.tabs[0];
}]);	

var ammoWeightMult = '{"Shotgun":".003", "Straight":".008","Necked":".01"}';
