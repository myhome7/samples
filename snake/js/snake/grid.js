define(function()
{
	var canvas;
	
	function set(width,height)
	{
		var $canvas = $('#snake_box');
		$canvas.attr('width', width);
		$canvas.attr('height', height);
		canvas=$canvas[0];
		return canvas.getContext('2d');
	}
	
	return {
		set:set
	}
});