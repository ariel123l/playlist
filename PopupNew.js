class PopupNew extends Popup{
	
	constructor(title) {
		super(title)
 	
		super.build(title);
		this.build();
	}
	
	build(){
	$('<input>',{
		placeholder: 'name new plalist',
		id: 'name_new_playlist',
		class:'container_name_and_url'
	}).appendTo('#popup_content')
	
	$('<input>',{
		placeholder: 'image url',
		id: 'image_new_playlist',
		class:'container_name_and_url',
	}).appendTo('#popup_content')
	
	$('<button>',{
		text: 'next',
		class: 'popupNew_button_next'
	}).appendTo('#popup_content')
	$('<button>',{
		text: 'cancel',
		class: "popupNew_button_cancel",
	}).appendTo('#popup_content')	

	
	this.build_songse_new_playlist()
		}
	
	build_songse_new_playlist(){		
		$('.popupNew_button_cancel').click(function(){$('#popup_container').remove()});

		
		$('.popupNew_button_next').click(function(e){
			//var a = (e.target.innerText)
			//window.history.pushState({page: a},'','/'+a)
			model_new_playlist.add_playlist_name($('#name_new_playlist').val())
			model_new_playlist.add_playlist_image($('#image_new_playlist').val())
			$('.container_name_and_url').remove()
			$('.popupNew_button_cancel').remove()
			$('.popupNew_button_next').remove()
			
			$('<button>',{
				class:'Finish_and_Save',
				text: 'Finish&Save'
			}).appendTo('#popup_content')
			$('<button>',{
				class:'add_another_songs',
				text: '➕ add another songs',
			}).appendTo('#popup_content')


			$('.Finish_and_Save').click(function(e) {
				e.preventDefault()
				add_songs_to_model()
				var name = model_new_playlist.get(2)
				var image = model_new_playlist.get(1)
				var songs = model_new_playlist.get(0)
				//var x = JSON.stringify()
				$.post('api/playlist', {
					'name': model_new_playlist.get(0).playlist_name,
					'image':model_new_playlist.get(1).playlist_image,
				  	'songs':model_new_playlist.get(2).songs
				}, function(data, status) {
					/*optional stuff to do after success */
					model_new_playlist.clear_model();
					//console.log(data)
					//console.log(status)
				});
			})

		add_another_songs()
		});

	}

}




function add_another_songs(){
		$('<div>',{
			class: 'container_add_songs_to_new_playlist'
		}).appendTo('#popup_content')
		for (var i = 0; i<3; i++) {
			$('<span>',{
				class: 'title_new_song_to_playlist',
				text: 'song URL :'
			}).appendTo('.container_add_songs_to_new_playlist')
			$('<input>',{
				class: 'add_song_to_playlist',
				placeholder: 'add url'
			}).appendTo('.container_add_songs_to_new_playlist')

			$('<span>',{
				class: 'title_new_song_to_playlist',
				text: 'name song :'
			}).appendTo('.container_add_songs_to_new_playlist')
			$('<input>',{
				class: 'add_name_to_playlist',
				placeholder: 'name'
			}).appendTo('.container_add_songs_to_new_playlist')


		}
	}

var songs_in_new_playlist = []

function add_songs_to_model() {
	$('.add_song_to_playlist').each(function(){
		console.log('wwww')
		if (!$(this).val()){
			console.log('asas')
		}else{
			songs_in_new_playlist.push({
				//name_song:$('.add_song_to_playlist').val(),
				url:$(this).val()
			})
			
		}
		
	})
	add_name_to_model()
}

function add_name_to_model() {
	$('.add_name_to_playlist').each(function(i){
		console.log('qqq')
		if (!$(this).val()){
			//console.log('asas')
		}else{
			songs_in_new_playlist[i].name = $(this).val()
		}
			
		
	})
	model_new_playlist.add_songs(songs_in_new_playlist)
	//model_new_playlist.clear_model();
	$('#popup_container').remove();
}

