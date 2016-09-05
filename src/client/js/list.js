$(function(){

  $('.taskRemoveAdd').click(function(e){
		var target = $(e.target);
		var id = target.data('id');
		var tr = $('.item-id-' + id);
		$.ajax({
			type : 'POST',
			url : '/regular/task/remove_add?id=' + id
		})
		.done(function(result){
			if(result.success === 1 && tr){
				tr.remove();
			}
		});
	});

  $('.taskAdd').click(function(e){
		var target = $(e.target);
		var id = target.data('id');
		var tr = $('.item-id-' + id);

		$.ajax({
			type : 'POST',
			url : '/regular/task/add?id=' + id
		})
		.done(function(result){
			if(result.success === 1 && tr){
				tr.remove();
			}
		});
	});


	$('.taskDel').click(function(e){
		var target = $(e.target);
		var id = target.data('id');
		var tr = $('.item-id-' + id);

		$.ajax({
			type : 'DELETE',
			url : '/admin/task/list?id=' + id
		})
		.done(function(result){
			if(result.success === 1 && tr){
				tr.remove();
			}
		});
	});

});
