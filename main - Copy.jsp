<!DOCTYPE HTML>
 
<html lang="en">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
        <meta charset="utf-8">
        <link rel="StyleSheet" href="css/main.css" type="text/css">
        <script type="text/javascript" src="js/jquery-2.2.1.js"></script>
        <script type="text/javascript" src="js/angular.js"></script>
        <script type="text/javascript" src="js/bootstrap.js"></script>
        <script type="text/javascript" src="js/utils.js"></script>
        <script type="text/javascript" src="js/main.js"></script>
		<script type="text/json" src="ships.json"></script>
    </head>  
    <body>
		<div id=mainDiv ng-app="mainApp" ng-controller="mainCtrl">
			<table>
				<tr id=logo_header>
					<td id=logo class=left_col>
						LOGO
					</td>
					<td id=header class=right_col>
						HEADER DETAILS
					</td>
				</tr>
				<tr id=nav_body>
					<td id=nav class=left_col>
						<div ng-repeat="menuItem in menuItems" class=fieldDiv>
							<div id=menuItemDiv{{menuItem.name}}>
								&nbsp
								<span class=bold2 style="font-style:{{menuItem.font_style}};" ng-click="menuItem.isCollapsed=!menuItem.isCollapsed;collapse(menuItem);">&nbsp{{menuItem.name}}&nbsp</span>
							</div>
							<div collapse="menuItem.isCollapsed" class=fieldDiv>
								<div ng-show="!menuItem.isCollapsed" ng-repeat="field in menuItem.fields" class=bold2 
								  id=menuItemDiv{{field.name}}>
									<span class=bold2 style="font-style:{{field.font_style}};" ng-click="field.isCollapsed=!field.isCollapsed;addmenuItemClicked(menuItem, field);">&nbsp&nbsp&nbsp&nbsp&nbsp{{field.name}}&nbsp</span>
									<button ng-click="field.isCollapsed=!field.isCollapsed;addmenuItemClicked(menuItem, field);" 
										class=ctrlButton id=addValsBtn{{field.name}} ng-show="field.addBtn">+</button>
									&nbsp
									<button ng-click="field.isCollapsed=!field.isCollapsed;removeVal(menuItem, field, null)" 
										class=ctrlButton id=removeValsBtn{{field.name}} ng-show="field.removeBtn">-</button>
									<div collapse="subfield.isCollapsed" class=fieldDiv>
										<div ng-show="!subfield.isCollpased" ng-repeat="subfield in field.fields" 
										  class=italic id=menuItemDiv{{subfield.name}}>
											<span style="font-style:{{subfield.style}}">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
												{{subfield.name}}&nbsp</span>
											<button ng-click="removeVal(menuItem, field, subfield)" class=ctrlButton
												id=removeValsBtn{{subfield.name}} ng-show="subfield.removeBtn">-</button>
										</div>
									</div>
								</div>                                    
							</div>                                        
						</div>
					</td> 
					
					<td id=body class=right_col>
						<iframe id=mainDisplay class=mainDisplay></iframe>
					</td>
				</tr>
			</table>
		</div>
    </body>
</html>



