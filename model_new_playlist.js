var model_new_playlist = (function () {
	var newPlaylist = [];
	return {
		get: index => newPlaylist[index], 
		add_playlist_name: name => {
			newPlaylist.push({
				playlist_name: name
			})
		},
		add_playlist_image: image_playlist => {
			newPlaylist.push({
				playlist_image: image_playlist
			})
		},
		add_songs: song => {
			newPlaylist.push({
				songs: song
			})
			
		}, 
		getAll: () => newPlaylist, 
		get_songs:()=>newPlaylist[0].songs,
		clear_model:()=>newPlaylist= [],
	}
})();