var model_playlist_worke = (function () {
	var workePlaylist = [];
	return {
		get: index => workePlaylist[index], 
		add_id: id=> {
			workePlaylist.push({
				id:id
			})
		},
		add_playlist_name: name => {
			workePlaylist.push({
				playlist_name: name
			})
		},
		add_playlist_image: image_playlist => {
			workePlaylist.push({
				playlist_image: image_playlist
			})
		},
		add_songs: song => {
			workePlaylist.push({
				songs: song
			})
			
		}, 
		update_songs:update=>{
			for(var i in workePlaylist){
							if (workePlaylist[i].songs){
								workePlaylist[i].songs = update
							}	
					} 
		},
		getAll: () => workePlaylist, 
		get_img_playlist:()=>{for(var i in workePlaylist){
					if (workePlaylist[i].playlist_image){
						return (workePlaylist[i].playlist_image) 
						break
					}	
			} 
		},		
		get_songs:()=>{for(var i in workePlaylist){
							if (workePlaylist[i].songs){
								return (workePlaylist[i].songs) 
								break
							}	
					} 
				},
		clear_songs:()=>{for(var i in workePlaylist){
							if (workePlaylist[i].songs){
								delete workePlaylist[i].songs
								//break
							}	
					} 
				},
		clear_model:()=>workePlaylist= [],
	}
})();