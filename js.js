
$(document).ready(function(){
	// variables
	const input = $('#inputLine');
	const butt = $('#inputButton');
	const list = $('#places');
	let deg = 0;
	let zipArray = [];
	let zipUrl = "http://api.zippopotam.us/us/";

	//functions

	function formURL(data){
		if(data.length < 5 || data.length > 5){
			alert('Please, enter five numbers, starting from 00210 to 99950');
			input.val('');
			return;
		}else{
			return zipUrl + data;
		}
	};

	function addItem(place, state, zipcode){
		let listItem = $('<li id='+zipcode+' class=\'li-item\'></li>');
		let placeDiv = $('<div>'+place+'</div>');
		let stateDiv = $('<div>'+state+'</div>');
		let lItem = $('li');
		lItem.removeClass('li-item--selected');
		listItem.addClass('li-item--selected');
		listItem.append(placeDiv, stateDiv);
		list.append(listItem);
	};

	function background(){
		$('body').css('background-image', 'linear-gradient('+deg+'deg, #45769B, #D78126)');
		deg++;
		console.log(deg);
		setTimeout(background, 500);
	}

	//triggers

	$(document).click(function(e){
		let _ = $(e.target);
		let lItem = $('li');
		if(_.hasClass('li-item--selected')){
			input.val(_.attr('id'));
			return;
		}else if(_.hasClass('li-item')){
			lItem.removeClass('li-item--selected');
			_.addClass('li-item--selected');
			input.val(_.attr('id'));
		}else{
			lItem.removeClass('li-item--selected');
		}
	})

	butt.on('click', function(){
		let newUrl = formURL(input.val());
		$.ajax({
		type: 'GET',
		headers: {
	        'Content-Type': 'application/x-www-form-urlencoded'
	    },
		url: newUrl,
		contentType: 'json',
		success: function(data){
			placeName = data.places[0]["place name"];
			stateName = data.places[0]["state abbreviation"];
			zipCode = data["post code"];
			if(zipArray.includes(zipCode)){
				alert("This item is already present!")
				return;
			}else{
				addItem(placeName, stateName, zipCode);
				zipArray.push(zipCode);
				input.val('');
			}
		},
		error: function(xhr, error, message){
			console.log(message);
		},
		statusCode:{
			404: function(){
				alert('This code does not exist.');
				input.val('');
			}
		}
	});
	});
	$('.form').removeClass('form--transparent');
	background();
});
