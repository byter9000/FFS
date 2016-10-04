<!DOCTYPE HTML>
 
<html lang="en">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
        <meta charset="utf-8">
		<link rel="StyleSheet" href="css/smArms.css" type="text/css">
        <script type="text/javascript" src="js/jquery-2.2.1.js"></script>
        <script type="text/javascript" src="js/angular.js"></script>
        <script type="text/javascript" src="js/bootstrap.js"></script>
        <script type="text/javascript" src="js/utils.js"></script>
		<script type="text/javascript" src="js/tables.js"></script>
		<script type="text/javascript" src="js/smArms.js"></script>
    </head>  
    <body>
		<div id=mainDiv ng-app='smArmsApp' ng-controller='smArmsCtrl'>
			<div id=weaponPriceDiv>
				Total Weapon Price:
				<label id=weaponPrice value="{{weaponPrice}}">Cr{{weaponPrice}}</label>
			</div>
			<div id=totalAmmoPriceDiv>
				Ammo Price/Round:
				<label id=ammoPrice value="{{rndPrice}}">Cr{{rndPrice}}</label>
			</div>
			<ul>
				<li ng-repeat="tab in tabs"
					ng-click="onTabClick(tab)"
					{{tab.disabled}}>&nbsp{{tab.title}}
				</li>
			</ul>			
			<div id=ammoTab class=tabDiv>
				<div id=ammoInputDiv class=inputDiv>
					<div id=rndTLDiv class=rndTLDiv>
						Tech Level:
						<input type=text id=rndTL style="width:30px;">
					</div>
					<div id=rndTypeDiv class=rndTypeDiv>
						Round Type:
						<select id=rndType></select>
					</div>
					<div id=caseTypeDiv class=caseTypeDiv>
						Case Type:
						<select id=caseType></select>
					</div>
					<div id=diameterDiv class=diameterDiv>
						Bullet Diameter (in mm):
						<input type=text id=diameterInput style="width:30px;">
					</div>
					<div id=lengthDiv class=lengthDiv>
						Cartridge Length (in mm):
						<input type=text id=lengthInput style="width:30px;">
					</div>		
					<div id=rndETCDIv class=rndETCDiv>
						Mass-produced?
						<input type=checkbox name="massProd" id=massProd>
						ETC?
						<input type=checkbox name="etc" id=rndETC>
					</div>
					<div id=rndUpdateBtnDiv class=rndUpdateBtnDiv>
						<button id=rndUdateBtn ng-click="updateAmmo();">Update Ammo</button>
					</div>
				</div>
				<div id=ammoOutputDiv class=outputDiv>
					<div id=trueLenDiv class=trueLenDiv>
						Adjusted Length:
						<label id=trueLen value="{{trueRndLen}}">{{trueRndLen}}mm</label>
					</div>
					<div id=rndWeightDiv class=rndWeigthDiv>
						Round Weight:
						<label id=rndWeight value="{{rndWeight}}">{{rndWeight}} grams</label>
					</div>
					<div id=rndMuzzleVelDiv class=rndMuzzleVelDiv>
						Average Muzzle Velocity:
						<label id=rndMuzzleVel value="{{rndMuzzleVel}}">{{rndMuzzleVel}} joules</label>
					</div>
					<div id=rndPriceDiv class=rndPriceDiv>
						Round Price (Cr):
						<label id=rndPrice value="{{rndPrice}}">Cr{{rndPrice}}</label>
					</div>
				</div>
			</div>
			<div id=barrelTab class=tabDiv style="display:none;">
				<div id=barrelInputDiv class=inputDiv>
					<div id=boreTypeDiv class=boreTypeDiv> 
						Bore:
						<select id=boreType></select>
					</div>
					<div id=barrelTypeDiv class=barrelTypeDiv>
						Barrel Type:
						<select id=barrelType></select>
					</div>
					<div id=barrelLengthDiv class=barrelLengthDiv>
						Barrel Length (in cm):
						<input type=text id=barrelLen style="width:45px;" value="{{barLen}}">
					</div>
					<div id=barrelUpdateBtnDiv class=barrelUpdateBtnDiv>
						<button id=barrelUdateBtn ng-click="updateBarrel();">Update Barrel</button>
					</div>
				</div>
				<div id=barrelOutputDiv class=outputDiv>
					<div id=avgLengthDiv class=avgLengthDiv>
						Average Barrel Length:
						<label id=avgLength value={{avgBarrelLen}}>{{avgBarrelLen}}cm</label>
					</div>
					<div id=minLengthDiv class=minLengthDiv>
						Minimum Barrel Length:
						<label id=minLength value={{minBarrelLen}}>{{minBarrelLen}}cm</label>
					</div>
					<div id=maxLengthDiv class=maxLengthDiv>
						Maximum Barrel Length:
						<label id=maxLength value="{{maxBarrelLen}}">{{maxBarrelLen}}cm</label>
					</div>
					<div id=barrelWeightDiv class=barrelWeightDiv>
						Barrel Weight:
						<label id=barrelWeight value="{{barrelWeight}}">{{barrelWeight}} kilograms</label>
					</div>
					<div id=barrelPriceDiv class=barrelPriceDiv>
						Barrel Price:
						<label id=barrelPrice value="{{barrelPrice}}">Cr{{barrelPrice}}</label>
					</div>
					<div id=barrelEnergyDiv class=barrelEnergyDiv>
						Barrel Energy:
						<label id=barrelEnergy value="{{barrelEnergy}}">{{barrelEnergy}} joules</label>
					</div>
					<div id=barrelDamageDiv class=barrelDamageDiv>
						Barrel Damage:
						<label id=barrelDamage value="{{barrelDamage">{{barrelDamage}}</label>
					</div>
					<div id=barrelPenDiv class=barrelPenDiv>
						Barrel Penetration:
						<label id=barrelPen value="{{barrelPen}}">{{barrelPen}}</label>
					</div>
				</div>
			</div>
			<div id=receiverTab style="display:none;">
				<div id=receiverTypeDiv>
					Reciever Type:
					<select id=receiverType></select>
				</div>
				
			</div>
			<div id=stockTab style="display:none;">
			
			</div>
			<div id=feedSystemTab style="display:none;">
			
			</div>
			<div id=optionsTab style="display:none;">
			
			</div>
			<div id=weaponStatsDiv>
				
			</div>
		</div>
    </body>
</html>