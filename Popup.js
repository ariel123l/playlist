class Popup{
	
	constructor(title) {
		this.title = title
		this.build(title)
	}
	
	build(title){
	
	$('<div>',{
		id:'popup_container',
		class:'container',
	}).appendTo('body');


	$('<form>',{
		id:'popup_content',
		class:'content',
	}).appendTo('#popup_container')
	
	$('<spen>',{
		text: title,
		class:'title'
	}).appendTo('#popup_content')
	
	$('#popup_container').click(function(e){ remove_popup(e)})
		}
	}
	
	function remove_popup(e){
/*	
	console.log(e)
	console.log(e.target)
	console.log(e.currentTarget)*/

	if((e.currentTarget)===(e.target)){
		model_new_playlist.clear_model();
		$('#popup_container').remove()

		}
	
}
	