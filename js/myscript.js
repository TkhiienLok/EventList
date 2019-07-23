$(document).ready(function($)
{
	//ajax row data
	var ajax_data =
	[
		{id: 0, title:"Event 1", date:"2019-08-02", start:"9:00", end:"12:00"}, 
		{id: 1, title:"Event 2", date:"2019-09-25", start:"15:00", end:"17:00"}, 
		
	]

	var random_id = function  () 
	{
		var id_num = Math.random().toString(9).substr(2,3);
		var id_str = Math.random().toString(36).substr(2);
		
		return id_num + id_str;
    }

    var defineDate = function(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today;
	}
	
	//format date string
    var formatDate = function(str){
        var day = new Date(str);
        var dd = String(day.getDate()).padStart(2, '0');
        var mm = String(day.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = day.getFullYear();

        formattedDay = dd+'.'+mm+'.'+yyyy;
        return formattedDay;
    }


	//--->create data table > start
	var tbl = '';
	tbl +='<table id="#myTable" class="table table-hover sortable sorted">'

		//--->create table header > start
		tbl +='<thead>';
			tbl +='<tr>';
			tbl +='<th>Event</th>';
			tbl +='<th>Date</th>';
			tbl +='<th>Start</th>';
			tbl +='<th>End</th>';
			tbl +='</tr>';
		tbl +='</thead>';
		//--->create table header > end

		
		//--->create table body > start
		tbl +='<tbody id="displayArea">';

			//--->create table body rows > start
			$.each(ajax_data, function(index, val) 
			{
				//you can replace with your database row id
                // var row_id = random_id();
				var row_id = index;
				val.start = new Date(val.date+' '+val.start);	
				val.end = new Date(val.date+' '+val.end);
				var dayStr = val.date;
                val.date = new Date(val.date);
				var startTime = String(val.start.getHours()).padStart(2, '0')+':'+String(val.start.getMinutes()).padStart(2, '0');
				var endTime = String(val.end.getHours()).padStart(2, '0')+':'+String(val.end.getMinutes()).padStart(2, '0');

				//loop through ajax row data
				tbl +='<tr row_id="'+row_id+'">';
					tbl +='<td ><div class="row_data" edit_type="click" col_name="title">'+val['title']+'</div></td>';
					tbl +='<td ><input type="date" min="2018-01-01" max="2025-12-31" class="row_data" edit_type="click" col_name="date" value="'+dayStr+'" readonly></td>';
                    tbl +='<td ><input type="time" min="09:00" max="18:00" class="row_data" edit_type="click" col_name="start" value="'+startTime+'" readonly></td>';
                    tbl +='<td ><input type="time" min="09:00" max="18:00"  class="row_data" edit_type="click" col_name="end" value="'+endTime+'" readonly></td>';

					//--->edit options > start
					tbl +='<td>';
					 
						tbl +='<span class="btn_edit" > <a href="#" class="btn btn-link " row_id="'+row_id+'" > Edit</a> </span>';

						//only show this button if edit button is clicked
						tbl +='<span class="btn_save"> <a href="#" class="btn btn-link"  row_id="'+row_id+'"> Save</a> | </span>';
                        tbl +='<span class="btn_cancel"> <a href="#" class="btn btn-link" row_id="'+row_id+'"> Cancel</a> | </span>';
                        tbl +='<button type="button" class="btn_remove" row_id="'+row_id+'"> Remove </button>';

					tbl +='</td>';
					//--->edit options > end
					
				//fill in select width dates	
				tbl +='</tr>';
				$('#mySelect')
				.append($("<option></option>")
                    .attr("value",index)
					.text(formatDate(val.date)));
			});

			//--->create table body rows > end

		tbl +='</tbody>';
		//--->create table body > end

	tbl +='</table>'	
	//--->create data table > end

	//out put table data
	$(document).find('.tbl_user_data').html(tbl);
	$(document).find('.btn_save').hide();
	$(document).find('.btn_cancel').hide(); 


	//--->make div editable > start
	$(document).on('click', '.row_data', function(event) 
	{
		event.preventDefault(); 

		if($(this).attr('edit_type') == 'button')
		{
			return false; 
		}

		//make div editable
		$(this).closest('div').attr('contenteditable', 'true');
	    $(this).closest('input').attr('readonly', false);
		//add bg css
		$(this).addClass('bg-warning').css('padding','5px');

		$(this).focus();
	})	
	//--->make div editable > end


	//--->save single field data > start
	$(document).on('focusout', '.row_data', function(event) 
	{
		event.preventDefault();

		if($(this).attr('edit_type') == 'button')
		{
			return false; 
		}
		$(this).attr('readonly', true);
		$('.tbl_user_data').attr('contenteditable', 'false');
		var row_id = $(this).closest('tr').attr('row_id'); 
		
		var row_div = $(this)				
		.removeClass('bg-warning') //add bg css
		.css('padding','')
		
	})	
	//--->save single field data > end

 
	//--->button > edit > start	
	$(document).on('click', '.btn_edit', function(event) 
	{
		event.preventDefault();
		var tbl_row = $(this).closest('tr');

		var row_id = tbl_row.attr('row_id');

		tbl_row.find('.btn_save').show();
		tbl_row.find('.btn_cancel').show();

		//hide edit button
		tbl_row.find('.btn_edit').hide(); 

		//make the whole row editable
		tbl_row.find('.row_data')
		.attr('contenteditable', 'true')
		.attr('edit_type', 'button')
		.attr('readonly', false)
		.addClass('bg-warning')
		.css('padding','3px')

		//--->add the original entry > start
		tbl_row.find('.row_data').each(function(index, val) 
		{  
			//this will help in case user decided to click on cancel button
			$(this).attr('original_entry', $(this).html());
		}); 		
		//--->add the original entry > end

	});
	//--->button > edit > end


	//--->button > cancel > start	
	$(document).on('click', '.btn_cancel', function(event) 
	{
		event.preventDefault();

		var tbl_row = $(this).closest('tr');

		var row_id = tbl_row.attr('row_id');

		//hide save and cacel buttons
		tbl_row.find('.btn_save').hide();
		tbl_row.find('.btn_cancel').hide();

		//show edit button
		tbl_row.find('.btn_edit').show();

		//make the whole row editable
		tbl_row.find('.row_data')
		.attr('edit_type', 'click')
		.removeClass('bg-warning')
		.css('padding','') 

		tbl_row.find('.row_data').each(function(index, val) 
		{   
			$(this).html( $(this).attr('original_entry') ); 
		});  
	});
	//--->button > cancel > end

	
	//--->save whole row entery > start	
	$(document).on('click', '.btn_save', function(event) 
	{
		event.preventDefault();
		var tbl_row = $(this).closest('tr');
		var row_id = tbl_row.attr('row_id');

		
		//hide save and cacel buttons
		tbl_row.find('.btn_save').hide();
		tbl_row.find('.btn_cancel').hide();

		//show edit button
		tbl_row.find('.btn_edit').show();


		//make the whole row editable
		tbl_row.find('.row_data')
		.attr('edit_type', 'click')
		.removeClass('bg-warning')
		.css('padding','') 

		//--->get row data > start
		var arr = {}; 
		tbl_row.find('.row_data').each(function(index, val) 
		{   
			var col_name = $(this).attr('col_name');  
			var col_val  =  $(this).html();
			arr[col_name] = col_val;
		});
		//--->get row data > end

		//use the "arr"	object for your ajax call
		$.extend(arr, {row_id:row_id});

		//out put to show
		$('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>')
		 

	});
    //--->save whole row entery > end
    
    //add event from form
    $('#myForm').submit(function(event) {
        event.preventDefault();
        var $inputs = $('#myForm :input');
        var values = {};
        $inputs.each(function() {
		  values[this.id] = $(this).val();		  
        });
		$(this).children("input[type=time]").val(0);
		
		values.start = new Date(values.date+' '+values.start);	
		values.end = new Date(values.date+' '+values.end);
		var dayStr = values.date;
		values.date = new Date(values.date);
		var startTime = String(values.start.getHours()).padStart(2, '0')+':'+String(values.start.getMinutes()).padStart(2, '0');
		var endTime = String(values.end.getHours()).padStart(2, '0')+':'+String(values.end.getMinutes()).padStart(2, '0');	
        
        // var row_id = random_id();
        var row_id = ajax_data.length;
        values.id = row_id;
		ajax_data.push(values);  
		    
        //add the row
        $('#displayArea').append('<tr row_id="'+row_id+'"><td> <div class="row_data" edit_type="click" col_name="title">' + 
        values.title + '</div></td><td><input type="date" min="2018-01-01" max="2025-12-31" class="row_data" edit_type="click" col_name="date" value="' + 
        dayStr + '" readonly></td><td><input type="time" min="09:00" max="18:00" class="row_data" edit_type="click" col_name="start" value="' + 
        startTime + '"readonly></td><td><input type="time" min="09:00" max="18:00" class="row_data" edit_type="click" col_name="end" value="' + 
        endTime + '" readonly></td>'+
        '<td>'+'<span class="btn_edit" > <a href="#" class="btn btn-link " row_id="'+row_id+'" > Edit</a> </span>'+
        '<span class="btn_save"> <a href="#" class="btn btn-link"  row_id="'+row_id+'"> Save</a> | </span>'+
        '<span class="btn_cancel"> <a href="#" class="btn btn-link" row_id="'+row_id+'"> Cancel</a> | </span>'+
        '<button type="button" class="btn_remove" row_id=">'+row_id+'"> Remove </button>'+'</td>'+
		'</tr>');

        $("input[type=text], textarea").val("");
        $(document).find('.btn_save').hide();
		$(document).find('.btn_cancel').hide(); 
		
		//fill in select
		$('#mySelect')
			.append($("<option></option>")
				.attr("value",row_id)
				.text(formatDate(values.date)));
      });
    
    //delete event row and option in select
    $('#displayArea').on('click','.btn_remove', function(){
		var trow = $(this).closest('tr');
		var ind = ajax_data.findIndex(x => x.id == trow.attr('row_id'));
        ajax_data.splice(ind, 1);
		$(this).closest('tr').remove();
		$('#mySelect').children("option")[ind].remove();
    })
	

	$('#date').val(defineDate());
	$('#mySelect').change(function() {
		$('#myTable').show();
		var selection = $(this).val();
		var dataset = $('table tbody').find('tr');
		// show all rows first
		dataset.show();
		var dateInd = ajax_data.findIndex(x => x.id == selection);
		selectedDate = formatDate(ajax_data[dateInd].date);
        // hide rows with another date
		dataset.filter(function(index, item) {
			cellDate = formatDate($(item).find('td').children("input[type=date]")[0].value);
			return cellDate != selectedDate;
		}).hide();
	
	  });
	

}); 
