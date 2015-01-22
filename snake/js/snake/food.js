define(['snake/grid','snake/player'],function(grid,player)
{
	var food_position;
	var food_border_padding=1;
	var food_snake_padding=6;
	
	function draw(ctx,board)
	{
		ctx.save();
		ctx.fillStyle = '#f00';
		ctx.beginPath();
		var radius = board['block'] / 2;
		var x = food_position[0] * board['block'] + radius;
		var y = food_position[1] * board['block'] + radius;
		ctx.arc(x, y, radius, 0, Math.PI * 2, true);
		ctx.fill();
		ctx.restore();
	}
	
	/// set new position for food
	function move(board,player_position)
	{
		var overlap=true;
		
		while(overlap)
		{	
			/// select new coordinates
			var newx=Math.floor(Math.random()*((board['width']/board['block'])-(2*food_border_padding))+food_border_padding);
			var newy=Math.floor(Math.random()*((board['height']/board['block'])-(2*food_border_padding))+food_border_padding);
			
			overlap=false;
			
			/// check for overlap of snake
			$.each(player_position, function (index, value)
			{
				if(newx==value[0] && newy==value[1])
				{
					overlap=true;
				}
				
			});
			
			/// check for overlap of padding around snake head
			if(Math.abs(player_position[0][0]-newx)<food_snake_padding || Math.abs(player_position[0][1]-newy)<food_snake_padding)
			{
				overlap=true;
			}
		}
		
		food_position=[newx,newy];
	}
	
	
	/// check snake head to see if on food
	function eat(player_position)
	{
		if(food_position[0]==player_position[0][0] && food_position[1]==player_position[0][1])
		{
			return true;
		}
		return false;
	}
	
	return{
		draw: draw,
		move:move,
		eat:eat
	}
});