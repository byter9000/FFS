// #####################################################
// Usage: var mod = ammoWeightMod(case);
// 
// Purpose: Returns the ammuntion weight multiplier,
//          which depends on the case type.  This is 
//			used in calculating the weight of the round.
//
// Parameters: Case type of the round.
//
// Returns: The multiplier for the case type.
// #####################################################
function ammoWeightMod(caseType) {
	var ammoWeightMult = [
		{
			type:"Shotgun", 
			awm:.003
		},
		{
			type:"Straight",
			awm:.008
		},
		{
			type:"Necked",
			awm:.01
		}
	];
	for(i = 0; i < ammoWeightMult.length; i++) {
		if(ammoWeightMult[i].type === caseType) {
			return ammoWeightMult[i].awm;
		}
	}
}

// ########################################################
// Usage: var mod = ammoEnergyMod(TL);
//
// Purpose: Determine the tech level modifier for the round.
//			This used in calculating the Average Muzzle
//			Energy of the round.
//
// Parameters: Tech level of the round.
//
// Returns: The modifier for the tech level.
// #########################################################
function ammoEnergyMod(techLevel) {
	var techMod = [
		{
			tl:3,
			tm:.6
		},
		{
			tl:4,
			tm:.7
		},
		{
			tl:5,
			tm:.8
		},
		{
			tl:6,
			tm:.9
		},
		{
			tl:7,
			tm:1
		},
		{
			tl:8,
			tm:1.1
		},
		{
			tl:9,
			tm:1.3
		}
	];

	if(techLevel < 3) {
		return false;
	}
	var i = 0;
	for(; i < techMod.length; i++) {		
		if(techMod[i].tl === techLevel * 1) {
			return techMod[i].tm;
		}
	}
	// if here, techLevel > 8 so return 1.3
	return techMod[i].tm;
}

// ########################################################
// Usage: var mod = ammoCartMod(case, ETC);
//
// Purpose: Determine the cartridge modifier.  This is used
//			in calculating the Average Muzzle Energy of the
//			round.
//
// Parameter: Casetype of the round.
//			  If round is an ETC round.
//
// Returns: The modifier for the case type. 
// #########################################################
function ammoCartMod(caseType, ETC) {
	var caseMod = [
		{
			caseType:"Shotgun",
			cm:.2
		},
		{
			caseType:"Shotgun ETC",
			cm:.3
		},
		{
			caseType:"Straight",
			cm:.4
		},
		{
			caseType:"Straight ETC",
			cm:.8
		},
		{
			caseType:"Necked",
			cm:1.6
		}
	];
	
	if(ETC) {
		caseType += " ETC";
	}
	for(i = 0; i < caseMod.length; i++) {
		if(caseType === caseMod[i].caseType) {
			return caseMod[i].cm;
		}
	}
	
	// if here, case type is necked ETC
	return 3.2
}

// ###################################################
// Usage: var mod = ammoPriceMod(case, energy, massProduced);
//
// Purpose: Determine the price modifier of the round. This
//			is used in the calculation of the price/round.
//
// Parameters: Case type.
//			   Energy of the round.
//             If the round is mass produced.
//
// Returns: The price modifier for the round.
//########################################################
function ammoPriceMod(caseType, energy, massProd) {
	if(massProd) {
		return .02;
	}
	if(energy > 9999) {
		return .05;
	}
	if(caseType === "Shotgun") {
		return .01;
	}
	return .04;
}

// ############################################################
// Usage: var mod = barrelBoreMod(bore, ETC);
//
// Purpose: Determine rifling modifier for the barrel.  This is
//			used in Average Barrrel Length.
//
// Parameters: Barrel type, rifled or smoothbore.
//			   If designed for fire an ETC round.
//
// Returns: The rifling modifier for the barrel.
// ############################################################
function barrelBoreMod(barrelType, ETC) {
	if(ETC) {
		if(barrelType === "Rifled") {
			return .5;
		}
		else {
			return 3;
		}
	}
	else {
		if(barrelType === "Rifled") {
			return 1;
		}
		else {
			return 4
		}
	}
}

// #####################################################
// Usage: var mod = barrelTypeMod(bore, barrelWeight);
//
// Purpose: Determine the barrel type modifier. This is 
//			used in calculating the weight of the
//			barrel.
//
// Parameters: The bore used in the barrel.
//			   The type of barrel, heavy or light.
//
// Returns: The barrel type modifier.
// #####################################################
function barrelTypeMod(boreType, barrelType) {
	if(boreType === "Smoothbore") {
		return 100;
	}
	else if(barrelType === "Light") {
		return 200;
	}
	else {
		return 400;
	}
}

// #################################################
// Usage: var pen = barrelPenetration(energy);
//
// Purpose: Determine the round penetration.  This is
//			used in the final definition of the weapon.
//
// Parameters: Energy of the barrel/round combined.
//
// Returns: The penetration rating.
// #################################################
function barrelPenetration(energy) {
	if((energy > 600) && (energy < 2001)) {
		return "1-Nil";
	}
	if((energy > 2000) && (energy < 3001)){
		return "2-Nil";
	}
	if((energy > 3000) && (energy < 5001)) {
		return "2-3-Nil";
	}
	if((energy > 5000) && (energy < 10001)) {
		return "2-4-6";
	}
	if((energy > 10000) && (energy < 20001)) {
		return "2-3-4";
	}
	if((energy > 20000) && (energy < 50001)) {
		return "2-2-3";
	}
	if(energy > 50000) {
		return "2-2-2";
	}
	return "Nil";
}

// ################################################
// Usage: if(verifyReceiver(action, receiverTL, barrelWeight)) {}
//
// Purpose: Verifies of the receiver chosen is a 
//			valid receiver for the tech level of
//			the weapon.
//
// Parameter: Receiver action type.
//			  Tech level of the weapon.
//			  Weight of the barrel.
//
// Returns: True if the receiver is valid for the 
//          tech level, false if not.
// ################################################
function verifyReciever(action, tl, weight) {
	if(tl < 3) {
		return false;
	}
	if(tl === 3) {
		if( (action === "Bolt-action") ||
			(action === "Pump-Action") ||
			(action === "Heavy self-loading") ||
			(action === "Light self-loading") ) {
				return false;
			}
	}
	if(tl === 4) {
		if(action === "Light self-loading") {
			return false;
		}
	}
	return true;
}

// ##################################################
// Usage: var mod = receiverLenMod(TL);
//
// Purpose: Determine the modifier for the receiver
//			length.  Used to calculate the true length
//			of the weapons's receiver assembly.
//
// Parameters: The tech level of the weapon.
//
// Returns: The length modifier base on TL.
// ##################################################
function receiverLenMod(tl) {
	if(tl < 4) {
		return 1;
	}
	if( (tl > 3) && (tl < 6) ) {
		return .55;
	}
	if( (tl > 5) && (tl < 8) ) {
		return .5;
	}
	if( (tl > 7) && (tl < 10) ) {
		return .45;
	}
	return .4;
}

// ##########################################################
// Usage: var mult = receiverActionMult(action, fireControl);
//
// Purpose: Determine the price multiplier for the receiver.
//			This is used in calculating the cost of the
//			receiver.
//
// Parameters: The action type of the receiver.
//			   The firing type, ie: Automatic, Semi-automatic.
//
// Returns: The price multiplier for the receiver.
// ###########################################################
function receiverActionMult(action, fireControl) {
	if(action === "Individually loading") {
		return 50;
	}
	if(action === "Revolver") {
		return 150;
	}
	if(action === "Self-loading") {
		if(fireControl === "SA") {
			return 200;
		}
		return 250;
	}
	return 300;
}

// ##############################################################
// Usage var lenMod = stockMods(stockType).len;
//
// Purpose: Determine the modifiers for the weapon for the weapon's
//			stock type.
//
// Parameters: The stock type.
//
// Returns: The appropriate JSON object containing the min tech 
//			level, the length in cm, the mass in kg, and the 
//			cost of the stock.
// ##############################################################
function stockMods(stock) {
	var lenMod = [
		{
			stock:"Wood pistol grip",
			tl:4,
			len:0,
			mass:.2,
			cr:5
		},
		{
			stock:"Hollow pistol grip",
			tl:5,
			len:0,
			mass:.1,
			cr:25
		},
		{
			stock:"Wooden stock",
			tl:4,
			len:25,
			mass:1,
			cr:25
		},
		{
			stock:"Carbine stock",
			tl:4,
			len:25,
			mass:.7,
			cr:20
		},
		{
			stock:"Folding stock",
			tl:6,
			len:5,
			mass:.5,
			cr:50
		},
		{
			stock:"Plastic stock",
			tl:7,
			len:25,
			mass:.5,
			cr:10
		},
		{
			stock:"Bullpup",
			tl:7,
			len:5,
			mass:.1,
			cr:10
		}
	];
	for(i = 0; i < lenMod.length; i++) {
		if(stock === lenMod[i].stock) {
			return lenMod[i];
		}
	}
	return false;
}

// ##################################################################
// Usage: var range = rangeConfigMod(stock, action, handed, bore);
//
// Purpose: Determine the configuration modifier for the
//			range.  This is used to calculating the short
//			range of the weapon.
//
// Parameters:	One-handed or two-handed weapon.
//				Stock type.
//				Action of the receiver.
//				Bore of the barrel.
//
// Returns: The short range modifier.
// ###################################################################
function rangeConfigMod(stock, action, handed, bore) {
	var mod = 0;
	
	if(stock === "Bullpup") {
		mod += .9;
	}
	
	if(action === "Bolt-action") {
		mod += 1.1;
	}
	
	if(handed === "One-Handed") {
		mod += .4;
	}
	else {
		mod += 1.3;
	}
	
	if(bore === "Smoothbore") {
		mod += .5;
	}
	
	return mod;
}