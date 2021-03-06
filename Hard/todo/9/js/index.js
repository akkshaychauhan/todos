function addItem (){
	var itemVal = $('.form-control').val();
	var item = '<li class="animated flipInX"><div class="checkbox"><span class="close"><i class="fa fa-times"></i></span><label><span class="checkbox-mask"></span><input type="checkbox" />'+ itemVal +'</label></div></li>';
	var isError = $('.form-control').hasClass('hidden');
	
		if(itemVal === ''){
			$('.err').removeClass('hidden').addClass('animated bounceIn');
		}else{
			$('.err').addClass('hidden');
			$('.todo-list').append(item);
		}
	
	$('.refresh').removeClass('hidden');
	
	$('.no-items').addClass('hidden');
	
	$('.form-control').val('').attr('placeholder', 'Add item...');
	setTimeout(function(){
		$('.todo-list li').removeClass('animated flipInX');
	}, 500);

}

function refresh(){
	
$('.todo-list li').each(function(i) {
	$(this).delay(70*i).queue(function(){
		$(this).addClass('animated bounceOutLeft');
		$(this).dequeue();
	});
		
});
	
	setTimeout(function(){
		$('.todo-list li').remove();
		$('.no-items').removeClass('hidden');
		$('.err').addClass('hidden');
	}, 800);

	
	
}

$(function(){
	
	var err = $('.err'),
			formControl = $('.form-control'),
			isError = formControl.hasClass('hidden');
	
	if(!isError) {
		formControl.blur(function () {
			err.addClass('hidden');
		});
	}

	
	$('.add-btn').on('click', function () {
		addItem();
		formControl.focus();
	});
	
	$('.refresh').on('click', refresh);
	
	$('.todo-list').on('click', 'input[type="checkbox"]', function(){	
			$(this).parent().parent().parent().toggleClass('danger');
			var li = $(this).parent().parent().parent();
			li.toggleClass('animated flipInX');
			setTimeout(function(){
				li.removeClass('animated flipInX');
			}, 500);
			});
	
	$('.todo-list').on('click', '.close', function(){
		var box = $(this).parent().parent();
		
		if($('.todo-list li').length == 1){
					box.removeClass('animated flipInX').addClass('animated 				bounceOutLeft');
					setTimeout(function(){
							box.remove();
							$('.no-items').removeClass('hidden');
							$('.refresh').addClass('hidden');
					}, 500);
		}else{
					box.removeClass('animated flipInX').addClass('animated bounceOutLeft');
		setTimeout(function(){
			box.remove();
		}, 500);
		}
		

		
	});
	
	$('.form-control').keypress(function(e){
		if(e.which == 13){
			addItem();
		}
	});
	
	$('.todo-list').sortable();
	$('.todo-list').disableSelection();
	
	
	
});