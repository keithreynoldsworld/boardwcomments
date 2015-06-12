var $ = require('jquery');
var _ = require('backbone/node_modules/underscore');
$(document).ready(function(){

	$('#headerSpan').on('click', function(){
    $('#tog').slideToggle('fast');
    });
    $('#cancel').on('click', function(){
    $('#tog').slideToggle('fast');
    });


	var ImageCollection = require('./collections/ImageCollection.js');
	var ImageModel= require('./models/ImageModel.js');
	var ImageRowBuilder = _.template($('#image-row-template').html());
	var ImageList = new ImageCollection();
	var CommentCollection = require('./collections/CommentCollection.js');
	var CommentModel = require('./models/CommentModel.js');

	var CommentList = new CommentCollection();
	var CommentRowBuilder = _.template($('#comment-row-template').html());
	ImageList.fetch({
		success: function(){
			CommentList.fetch();
		}
	}),
	

	$('#add-image-form').on('submit',function(e){
		e.preventDefault();
		console.log("woot");
		var imageToAdd = new ImageModel({
			url: $('#image-url-input').val(),
			caption: $('#image-caption-input').val()
		});
		console.log(imageToAdd);
		ImageList.add(imageToAdd);
		imageToAdd.save();
	});

	ImageList.on('add', function(addedImage){
		var imageHtml = ImageRowBuilder({model: addedImage});
		$('#image-list').append(imageHtml); 
		$('[data-form-cid="'+addedImage.cid+'"]').on('submit', function(e){
			e.preventDefault();
			console.log('comment was sunmitted!', addedImage.get('_id'));
			var $commentInput = $(this).find('.comment-input');
			console.log($commentInput.val());

			var commentToAdd = new CommentModel({
				text: $commentInput.val(),
				imageId: addedImage.cid
			});

			CommentList.add(commentToAdd);
			commentToAdd.save();
		})
	});
	CommentList.on('add', function(addedComment){
		var commentHtml = CommentRowBuilder({model: addedComment});
		var imageId = addedComment.get('imageId');
		var imageModel=ImageList.get(imageId);
		$("[data-cid='"+imageModel.cid+"'] .comment-list").append(commentHtml);
	});
});

//add --poll to watchify if not working