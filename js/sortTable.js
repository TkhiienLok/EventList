function sortTable(id) { 
    var i, x, y; 
    // Run loop until no switching is needed 
    var rows = $('table tbody').find('tr');    
    // Loop to go through all rows 
    for (var j = 0; j < (rows.length - 1); j++){
        rows = $('table tbody').find('tr');
        for (i = 0; i < (rows.length - 1); i++) { 
            // Fetch 2 elements that need to be compared 
            x = new Date(rows[i].cells[1].children[0].value); 
            y = new Date(rows[i + 1].cells[1].children[0].value);
            
            // Check if 2 rows need to be switched 
            if (x > y){ 
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]); 
                
                break; 
            } 
            
        } 
        
    }

} 