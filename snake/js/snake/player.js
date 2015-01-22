define(['snake/food'],function(food)
{
	var player_position=new Array();
	var direction;
	var next_direction;
	
	function set_snake(x,y,l,d)
	{
		for(i=0; i<l; i++)
		{
			if(x-i>0)
			{
				player_position[i]=new Array();
				player_position[i]=[x-i,y];
			}
		}
		
		/// drop the rest of the tail
		if(player_position.length>l)
		{
			var dropnum=player_position.length-l;
			
			for(i=0; i<dropnum;i++)
			{
				drop_tail();
			}
		}
		
		direction=d;
		next_direction=d;
	}
	
	
	/// DRAW PLAYER'S SNAKE
	function draw(ctx,board,player_position)
	{
		ctx.save();
		ctx.fillStyle='#00f';
		for(var i = 0; i < player_position.length; i++)
		{
			/// position
			var x=board['block']*player_position[i][0];
			var y=board['block']*player_position[i][1];
			ctx.fillRect(x, y, board['block'], board['block']);
		}
		ctx.restore();
	}
	
	
	/// MOVE PLAYER'S SNAKE
	function move()
	{
		var next_position=player_position[0].slice();
		
		direction=next_direction;
		switch (direction)
		{
			case 'left':
			next_position[0]-=1;
			break;
			case 'up':
			next_position[1]-=1;
			break;
			case 'right':
			next_position[0]+=1;
			break;
			case 'down':
			next_position[1]+=1;
			break;
			default:
			throw('Invalid direction');
		}
		
		player_position.unshift(next_position);
	}
	
	
	/// REMOVE TAIL
	function drop_tail()
	{
		player_position.pop();
	}

	
	/// CHANGE THE DIRECTION OF THE SNAKE
	function change_direction(new_direction)
	{
		var direction_ok;
		
		switch (direction)
		{
			case 'left':
			case 'right':
			direction_ok=['up', 'down'];
			break;
			case 'up':
			case 'down':
			direction_ok=['left', 'right'];
			break;
			default:
			throw('Invalid direction');
		}
		
		if (direction_ok.indexOf(new_direction) > -1)
		{
			next_direction=new_direction;
		}
	}
	
	function crash(board,player_position)
	{
		/// check left and right borders
		if(player_position[0][0]>=board['width']/board['block'] || player_position[0][0]<0)
		{
			return true;
		}
		
		/// check top and bottom borders
		if(player_position[0][1]>=board['height']/board['block'] || player_position[0][1]<0)
		{
			return true;
		}
		
		/// check crash into self
		var headlessSnake=player_position.slice(1);
		var crashed=false;
		
		$.each(headlessSnake, function (index, value)
		{
			if(player_position[0][0]==value[0] && player_position[0][1]==value[1])
			{
				crashed=true;
			}
		});
		
		return crashed;
	}
	
	return{
		set_snake:set_snake,
		draw:draw,
		move:move,
		drop_tail:drop_tail,
		change_direction:change_direction,
		crash:crash,
		player_position:player_position
	}
  
});