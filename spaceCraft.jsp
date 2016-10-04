<!DOCTYPE HTML>
 
<html lang="en">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
        <meta charset="utf-8">
        <link rel="StyleSheet" href="css/spaceCraft.css" type="text/css">
        <script type="text/javascript" src="js/jquery-2.2.1.js"></script>
        <script type="text/javascript" src="js/angular.js"></script>
        <script type="text/javascript" src="js/bootstrap.js"></script>
        <script type="text/javascript" src="js/utils.js"></script>
        <script type="text/javascript" src="js/spaceCraft.js"></script>
    </head>  
    <body onresize='resize()'>
        <div id=mainDiv style='position:absolute;top:15px;' ng-app="shipRowApp" 
          ng-controller="shipRowCtrl">
            <!-- ships Frame -->
            <div>
                <table id=frameBody class=frameBody>
                    <!-- Table Header -->
                    <thead>
                        <tr class=shipHdr>
                            <th class=first_col title='Ship name.'
                              ng-click="reverse=!reverse;sort('Name', reverse)">
                                Ship Name 
                                <span id=NameAsc style='display:none;'>&#9660;</span>
                                <span id=NameDec style='display:none;'>&#9650;</span>
                            </th>
                            <th class=inner_col 
                              title='Model of ship (scout/cruiser/etc)'
                              ng-click="reverse=!reverse;sort('Class', reverse)">
                                Ship Class
                                <span id=ClassAsc style='display:none;'>&#9660;</span>
                                <span id=ClassDec style='display:none;'>&#9650;</span>
                            </th>
                            <th class=inner_col title='Size of the hull (tonnes).'
                              ng-click="reverse=!reverse;sort('Model', reverse)">
                                Ship Model
                                <span id=ModelAsc style='display:none;'>&#9660;</span>
                                <span id=ModelDec style='display:none;'>&#9650;</span>
                            </th>
                            <th class=inner_col title='General hull type.'
                              ng-click="reverse=!reverse;sort('HullSize', reverse)">
                                Hull Size
                                <span id=HullSizeAsc style='display:none;'>&#9660;</span>
                                <span id=HullSizeDec style='display:none;'>&#9650;</span>
                            </th>
                            <th class=last_col title='Status of the ship design. &#13;Complete = Design is finished. &#13;In Progress = Design is missing components or not marked as completed.'
                              ng-click="reverse=!reverse;sort('Status', reverse)">
                                Status
                                <span id=StatusAsc style='display:none;'>&#9660;</span>
                                <span id=StatusDec style='display:none;'>&#9650;</span>
                            </th>
                        </tr>
                    </thead>
                    <!-- ship rows  -->
                    <tbody>
                        <tr id="{{ ship.Name }}" ng-repeat="ship in ships" ng-dblclick="load_ship(ship.Name);">
                            <td ng-if="$odd" class=rowOdd style='width:290px;' 
                              title="{{ship.Name}}">
                                &nbsp;&nbsp;{{ ship.Name }}
                            </td>
                            <td ng-if="$even" class=rowEven style='width:290px;' 
                              title="{{ship.Name}}">
                                &nbsp;&nbsp;{{ ship.Name }}
                            </td>
                            <td ng-if="$odd" class=rowOdd style='width:180px;'>
                                {{ ship.Class }}
                            </td>
                            <td ng-if="$even" class=rowEven style='width:180px;'>
                                {{ ship.Class }}
                            </td>
							<td ng-if="$odd" class=rowOdd style='width:180px;'>
                                {{ ship.Model }}
                            </td>
                            <td ng-if="$even" class=rowEven style='width:180px;'>
                                {{ ship.Model }}
                            </td>
                            <td ng-if="$odd" class=rowOdd style='width:120px;'>
                                {{ ship.HullSize }}
                            </td>
                            <td ng-if="$even" class=rowEven style='width:120px;'>
                                {{ ship.HullSize }}
                            </td>                          
                            <td ng-if="$odd" class=rowOdd style='width:140px;'>
                                {{ ship.Status }}
                            </td>
                            <td ng-if="$even" class=rowEven style='width:140px;'>
                                {{ ship.Status }}
                            </td>
                        </tr>
                    </tbody>
				</table>
            </div>
        </div>
    </body>
</html>



