// sort table rows
function sortTable(id) { 
    var i, x, y; 
    // Run loop until no switching is needed 
    var rows = $('table tbody').find('tr');    
    // Loop to go through all rows 
    for (var j = 0; j < (rows.length - 1); j++){
        rows = $('table tbody').find('tr');
        for (i = 0; i < (rows.length - 1); i++) { 
            // Fetch 2 elements that need to be compared 
            x = new Date(rows[i].cells[1].children[0].value + ' '+ rows[i].cells[2].children[0].value); 
            y = new Date(rows[i + 1].cells[1].children[0].value + ' '+ rows[i + 1].cells[2].children[0].value);
            
            // Check if 2 rows need to be switched 
            if (x > y){ 
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]); 
                
                break; 
            } 
            
        } 
        
    }

} 

// check time overlap
var checkOverlap = function (x_start, x_end){
    var pre_start, pre_end, nxt_start, nxt_end, rowForEdit = null;
    var rows = $('table tbody').find('tr');
    if(x_end < x_start){
        alert("End should be later then beginning");
        rowForEdit = true;
    } else 
    
    if (rows.length < 3){
        for (i = 1; i < (rows.length); i++) { 
            pre_start = new Date(rows[i - 1].cells[1].children[0].value + ' '+ rows[i - 1].cells[2].children[0].value);
            pre_end = new Date(rows[i - 1].cells[1].children[0].value + ' '+ rows[i - 1].cells[3].children[0].value);
            
        if (pre_end > x_start & x_end > pre_start){
            alert("Overlap!");
            rowForEdit = i;
            break;
        }}
    }else{
    
    for (i = 1; i < (rows.length - 1); i++) { 
        pre_start = new Date(rows[i - 1].cells[1].children[0].value + ' '+ rows[i - 1].cells[2].children[0].value);
        pre_end = new Date(rows[i - 1].cells[1].children[0].value + ' '+ rows[i - 1].cells[3].children[0].value);
        nxt_start = new Date(rows[i + 1].cells[1].children[0].value + ' '+ rows[i + 1].cells[2].children[0].value);
        nxt_end = new Date(rows[i + 1].cells[1].children[0].value + ' '+ rows[i + 1].cells[3].children[0].value);

        if ((pre_end > x_start & x_end > pre_start)||( x_end > nxt_start & x_start < nxt_end)){
            alert("Overlap!");
            rowForEdit = i;
            break;
        };          

    }};
    
    // if (rowForEdit >= 0){
    //     var rows = $('table tbody').find('tr');
    //     rows.eq(rowForEdit).find('.btn_save').show();
    //     rows.eq(rowForEdit).find('.btn_cancel').show();

    //     //hide edit button
    //     // rows.eq(rowForEditting).find('.btn_edit').hide(); 

    //     //make the whole row editable
    //     rows.eq(rowForEdit).find('.row_data')
    //     .attr('contenteditable', 'true')
    //     .attr('edit_type', 'button')
    //     .attr('readonly', false)
    //     .addClass('bg-warning')
    //     .css('padding','3px')

    //     //--->add the original entry > start
    //     rows.eq(rowForEdit).find('.row_data').each(function(index, val) 
    //     {  
    //         //this will help in case user decided to click on cancel button
    //         $(this).attr('original_entry', $(this).html());
    //     }); 		
    //     //--->add the original entry > end
    // };
    return rowForEdit;
    
}