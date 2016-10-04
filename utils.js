/*
 * utils.js
 *
 * A collection of utility functions used by various screens.
 */
 
// *************************************************
// validate_data()
//
// Parameters: Data returned from server.
//
// Return: Server data with all invalid characters
//         removed. 
//
// Purpose:  Validates the response information to 
//           ensure it contains only interface 
//           information.  It will strip any 
//           invalid characters.
// *************************************************
function validate_data(data) {
    if(data != undefined) {
        return data.replace(/^#%<>[]]{}*$@&!/g, '');
    } else {
        return undefined;
    }
}

// *****************************************************
// check()
//
// Paramaters: The array being sorted.
//             If accending or decending.
//             The index of the two elements.
//             The values of the two elements.
//             Flag if it is a numeric value.
//
// Return: The array with the given positions swapped if
//         required.
//
// Purpose: Compares the two values and will swap their
//          positions if requried.
// ********************************************************
function check(array, reverse, i, j, pos_i, pos_j, is_num) {
    
    if(reverse) {
        if(is_num) {
            if( (pos_i - pos_j) < 0 ) {
                swap(array, i, j);
            }
        } else {
            if(pos_i.localeCompare(pos_j) == -1) {
                swap(array, i, j);
            }
        }
    } else {
        if(is_num) {
            if( (pos_i - pos_j) > 0 ) {
                swap(array, i, j);
            }
        } else {
            if(pos_i.localeCompare(pos_j) == 1) {
                swap(array, j, i);
            }
        }
    }
    
    return array;
}

// ******************************************************
// swap()
//
// Parameters: The array being sorted.
//             The two indexes needing to be swapped.
//
// Return: Altered array.
//
// Purpose: Swaps the data in the two locations within
//          the given array.
// *********************************************************
function swap(array, first, second) {
    var tmp = array[first];
    array[first] = array[second];
    array[second] = tmp;
    return array;
}

// *********************************************************
// check_data()
// 
// Parameters: List of interfaces.
//
// Return: The modified list.
//
// Purpose: Converts fields containing null to appropriate
//          values for the console.  Also validates the 
//          data received.
// *********************************************************
function check_data(list) {
    for(i = 0; i < list.length; i++) {
        if( (list[i].LastRecord == null) || (list[i].LastRecord == "") ||
          (list[i].LastRecord == "no data") ) {
            list[i].LastRecord = "no data";
        }
        if( (list[i].Queued == null) || (list[i].Queued == "") || 
          (list[i].Queued == "-") ) {
            list[i].Queued = "-";
        }
        list[i].Name = validate_data(list[i].Name);
        list[i].Alias = validate_data(list[i].Alias);
        list[i].Status1 = validate_data(list[i].Status1);
        list[i].LastRecord = validate_data(list[i].LastRecord);
        list[i].Queued = validate_data(list[i].Queued);
        list[i].LastTrans = validate_data(list[i].LastTrans);
        list[i].Inactivity = validate_data(list[i].Inactivity);
        list[i].UpTime = validate_data(list[i].UpTime);
        list[i].Status2 = validate_data(list[i].Status2);
        list[i].LocalHost = validate_data(list[i].LocalHost);
        list[i].RemoteHost = validate_data(list[i].RemoteHost);
        list[i].Direction = validate_data(list[i].Direction);
    }
    return list;
}

// **********************************************************
// convert_times()
//
// Parameters: List of intefaces.
// 
// Returns: List of interfaces with corrected times.
//
// Purpose: Convert interface last transaction and uptime 
// from DJ and seconds to readable date and 
// DDD - HH:MM:SS format
// **********************************************************
function convert_times(interfaces) {
    for(i = 0; i < interfaces.length; i++) {
        var month;
        var days;
        var hours;
        var minutes;
        var seconds;
        if( (interfaces[i].LastTrans != null) && (interfaces[i].LastTrans != "") &&
          (interfaces[i].LastTrans != "-") ) {
            interfaces[i].ConvertedLastTrans = convert_dj(interfaces[i].LastTrans);
        } else {
            interfaces[i].ConvertedLastTrans = "-";
        }
        
        if( (interfaces[i].UpTime != "") && (interfaces[i].UpTime != null) && (interfaces[i].UpTime != "-") ) {
            days = parseInt(interfaces[i].UpTime / 86400);
            hours = parseInt( (interfaces[i].UpTime % 86400) / 3600);
            minutes = parseInt( ((interfaces[i].UpTime % 86400) % 3600) / 60);
            seconds = parseInt( (((interfaces[i].UpTime % 86400) % 3600) % 60) ) ;
            if(minutes < 10) {
                minutes = "0" + minutes;
            }
            if(seconds < 10) {
                seconds = "0" + seconds;
            }
            interfaces[i].ConvertedUpTime = days + "d - " + hours + ":" + minutes + ":" + seconds ; 
        } else {
            interfaces[i].ConvertedUpTime = "-";
        }
    }
    
    return interfaces;
}

function convert_expire(dj) {
    // need to know how data for expiration is stored, by # hours left or the date/time of 
    // expiration.
    return dj;
}

// **********************************************************
// set_disabled()
//
// Parameters: List of html element ids.
// 
// Returns: Nothing.
//
// Purpose: Change the .disabled setting for all provided 
// elements to the given status. 
// **********************************************************
function set_disabled(elements, status) {
    for(i = 0; i < elements.length; i++) {
        document.getElementById(elements[i]).disabled = status;
    }
}

// **********************************************************
// set_readOnly()
//
// Parameters: List of html element ids.
//             Either true or false for on or off. 
//           
// Returns: Nothing.
//
// Purpose: Turn on or off readonly to the list of given
//          elements.
// **********************************************************
function set_readOnly(elements, on) {
    for(i = 0; i < elements.length; i++) {
        document.getElementById(elements[i]).readOnly = on;
    }
}


// **********************************************************
// set_display()
//
// Parameters: List of html element ids.
// 
// Returns: Nothing.
//
// Purpose: Change the style.display setting for all provided 
// elements to the given status. 
// **********************************************************
function set_display(elements, status) {
    for(i = 0; i < elements.length; i++) {
        document.getElementById(elements[i]).style.display = status;
    }
}

// **********************************************************
// set_value()
//
// Parameters: List of html element ids.
//             List of values the elements should be set to.
// 
// Returns: Nothing.
//
// Purpose: Change the .value setting for all provided 
// elements to the given value. 
// **********************************************************
function set_values(elements, values) {
    for(i = 0; i < elements.length; i++) {
        if(values[i] === undefined) {
            values[i] = "";
        }
        if(values[i] === "--Optional--") {
            document.getElementById(elements[i]).value = "0";
        } else if( (values[i] === undefined) || (values[i] === "") || (values[i] === null) ) {
            document.getElementById(elements[i]).value = "";
        } else {
            document.getElementById(elements[i]).value = values[i];
        }
    }
}
 
// **********************************************************
// set_checked()
//
// Parameters: List of html element ids.
// 
// Returns: Nothing.
//
// Purpose: Change the checked status for all provided 
// elements to the given status. 
// **********************************************************
function set_checked(elements, status) {
    for(i = 0; i < elements.length; i++) {
        document.getElementById(elements[i]).checked = status;
    }
}

// **************************************************
// set_option()
//
// Paramaters: Element ID which the options are to be added.
//             List of options to be set.
//             What option should be set, if any.
//
// Purpose: Sets the given options to the .
// **************************************************
function set_options(elID, options, set) {
    var element = document.getElementById(elID);
    var selected;
    
    for(i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.text = options[i];
        if(options[i] === set) {
            selected = i;
        }
        element.value = set;
        element.add(option);
    }
    element.selectedIndex = selected;    
}
 
// **************************************************
// get_data()
//
// Paramaters: The delimited line.
//             The piece needed from the line.
//             The delimiter used in the line.
//
// Purpose: Return the piece needed from the delimited 
//          line.
// **************************************************
function get_data(line, piece, delim) {
    var rtn;
    if(line === undefined) {
        return null;
    }
    rtn = line.split(delim);
    return rtn[piece];
}

function remove_select_options(element) {
    while(element.options.length > 0) {
        element.remove(0);
    }
}

// ********************************************************************
// isNum()
//
// Checks if the value is numeric. Returns true if numeric, else false
// ********************************************************************
function isNum(value) {
    if(isNaN(value)) {
        return false;
    } else {
        return true;
    }
}








