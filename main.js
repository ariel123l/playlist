'use strict'

get_all_playlists('api/playlist').then(data=>{
	var n = 0;
	for (var i in data.data) {
		//console.log(data.data.id)
	//	console.log(i)
/*		console.log(data.data)
		console.log(data.data[n].id)
		console.log(data.data[n].name)
		console.log(data.data[n].image)*/
		$('<div>',{
			class: 'content_playlist_get container_span_imag_in_list_get'+n,
		}).appendTo('.container_get_all_playlist')
		$('<span>',{
			class: 'name_list_playlist',
			text: data.data[i].name,
			}).appendTo('.container_span_imag_in_list_get'+n)
		$('<img>',{
			class: 'image_list_playlist',
			src: 'images/'+ data.data[i].image,
			click: get_songs_from_playlist,
			}).attr("data-id", data.data[i].id).appendTo('.container_span_imag_in_list_get'+n)
		console.log($('.image_list_playlist').data('id'))
		n++
	}


})

function get_all_playlists(url){
	return new Promise(function(resolve){
		$.get(url , function(data) {
			console.log(data)
			resolve(data)
		});
		
	})
}

$('#button_header_add').click(function(e){
 	var my_new_playlist = new PopupNew('Add new playlist');
})	

function get_songs_from_playlist(e){
	//console.log(e)
	//console.log(e.target.dataset.id)
	$('.audio_play_now').remove()
	$('.list_ol_songs').remove()
	model_playlist_worke.clear_model()
	//$('.img_editor_playlist_work_now img').removeClass('opacity_image_one')
	var id_song = e.target.dataset.id
	get_all_playlists('api/playlist/'+id_song)
		.then(playlist=>{
			model_playlist_worke.add_id(playlist.data.id)
			model_playlist_worke.add_playlist_name(playlist.data.name)
			//console.log(playlist.data.name)
			model_playlist_worke.add_playlist_image(playlist.data.image)
			//console.log(playlist.data.image)
			$('.image_play_now').remove()
			$('<img>',{
				class: 'image_play_now big_imag_in_play_now',
				src: 'images/'+ playlist.data.image,
			}).appendTo('.container_image_play_now')
		})
	get_all_playlists('api/playlist/'+id_song+'/songs')
	.then(data=>{
		var id_song = e.target.dataset.id
		get11(data,id_song)

	})
	
}

$('#edit_playlist').click(function(data) {
	//var id_playlist = $('.audio_play_now')[0].dataset.play

	creat_list_playlist(data)
})

var songs_update = []
function update_worke_playlist(e){

	model_playlist_worke.clear_songs()
	$('.song_edit_low_width').each(function(i) {
		console.log($(this).val())
		console.log($(this).data().url)
		
		if (!$(this).val()){

		}else{
			songs_update.push({
				//name_song:$('.add_song_to_playlist').val(),
				name:$(this).val(),
				url:$(this).data().url
			})
			
		}
		
	})
	model_playlist_worke.add_songs(songs_update)
	update_db_post()
	
}

function update_db_post(e){
	var id_playlist = ($('.audio_play_now').data().play)
	console.log(id_playlist)
	$.post('api/playlist/'+id_playlist+'/songs',
		{
			'songs':model_playlist_worke.get_songs()
		}, function(status){
			model_playlist_worke.clear_model()
			$('.button_edit_playlist_post').remove()
			$('.list_ol_songs').remove()
			$('.audio_play_now').remove()
			console.log('secsee')
			get_all_playlists('api/playlist/'+id_playlist+'/songs')
			.then(data=>{
				//var id_playlist = e.target.dataset.id
				get11(data,id_playlist)
			})
		})
}



function creat_list_playlist(data){
	console.log(model_playlist_worke.getAll())
	$('.list_ol_songs').remove()
	$('.button_edit_playlist_post').remove()
	
	$('<ol>',{
		class:'list_ol_songs',
	}).appendTo('.container_playlist_songs_from_get_play_now')

	for(var i in model_playlist_worke.get_songs()){
		//var name_song = model_playlist_worke.get_songs()[i];
		console.log(model_playlist_worke.get_songs()[i].name)
		console.log(model_playlist_worke.get_songs()[i].url)
		var x = model_playlist_worke.get_songs()[i].name
/*		$('<li>',{
			class: 'songs_in_playlist_work_now',
			text: x,
		}).appendTo('.list_ol_songs')*/

		$('<input>',{
			//type: 'checkbox',
			class: 'songs_in_playlist_work_now song_edit_low_width',
			value: x,
		}).attr('data-idSong', i).attr('data-url', model_playlist_worke.get_songs()[i].url).appendTo('.list_ol_songs')
		$('<img>',{
			src: "images/delete.png",
			id: "delete_song",
			click: delete_song,
		}).attr('data-deleteIdSong', i).appendTo('.list_ol_songs')

	}
	$('<button>',{
		class: 'button_edit_playlist_post',
		text: 'Update',
		click: update_worke_playlist,
	}).appendTo('.img_editor_playlist_work_now')	
}

function delete_song(e){
	var index_input_of_remove = e.target.dataset.deleteidsong
	$(this).remove()
	$('[data-idsong='+index_input_of_remove+']').remove()
}


function get11(data, id_song){
		console.log(data.data.songs)
			$('<audio>',{
				class: 'audio_play_now',
				type: 'audio/mpeg',
				autoplay : 'autoplay',
			}).attr('controls', 'controls').attr('data-play', id_song).appendTo('.container_playlist_songs_from_get_play_now')

			$('.audio_play_now').click(function(event) {
				console.log($(event))
			});
/*			var audio = $('.audio_play_now')
			if (audio.paused){
				console.log('Ariel')
			}else{
				console.log('notAriel')

			}*/

			$('<ol>',{
				class:'list_ol_songs',
			}).appendTo('.container_playlist_songs_from_get_play_now')

		var songs_in_worke_playlist = []	
		for(var i in data.data.songs){
			if (i === '1') {
			
			}
			//console.log(data.data.songs[i])
			songs_in_worke_playlist.push({
				url:data.data.songs[i].url,
				name:data.data.songs[i].name
			})
			console.log(data.data.songs[i].url)
			console.log(data.data.songs[i].name)
			$('.audio_play_now').attr('src', 'songs/'+data.data.songs[i].url);

			$('<li>',{
				class: 'songs_in_playlist_work_now',
				text: data.data.songs[i].name,
			}).appendTo('.list_ol_songs')

		}
		model_playlist_worke.add_songs(songs_in_worke_playlist)
}

function aaa(e){
	console.log('e')
}