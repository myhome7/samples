define(['snake/grid','snake/player','snake/food'],function(grid,player,food)
{
	var board={
		width:$('#snake_box').width(),
		height:$('#snake_box').height(),
		block:10};
	
	var directions_keys={
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	
	var direction;
	var pause;
	var rate;
	var speed;
	var score;
	var start_time;
	var paused_time;
	var high_score;
	var	high_score_date;
	var drag_start;
	var drag_stop;
	var track_drag=false;
	var game_width=$('#snake_game_player').width();
	var game_height=$('#snake_game_player').height();
	var new_width;
	var new_height;
	
	var snake=_.extend({},grid,player);
	
	var ctx=grid.set(board['width'],board['height']);
	
	user_input();
	get_high_score();
	
	function init()
	{
		$('#snake_box').removeClass('game_over');
		$('#snake_game_player_stats').removeClass('snake_game_player_stats_high_score');
		$('#snake_high_score_text').html('HIGH SCORE: ');
		$('#snake_high_score_display').removeClass('snake_game_player_stats_high_score_text');
		
		
		direction='right';
		pause=false;
		rate=200;
		speed=1;
		score=0;
		start_time=new Date();
		paused_time=0;
		
		set_stats();
		player.set_snake(6,6,3,direction);
		food.move(board,snake['player_position']);
		
		run_game();
	}

 
	
	function run_game()
	{
		/// calculate next move
		player.move();
		
		/// check to see if eating food
		if(food.eat(snake['player_position']))
		{
			/// mmmmm... ate some food
			up_score();
			food.move(board,snake['player_position']);
		}
		
		/// remove tail from hungry snake
		else
		{
			player.drop_tail();
		}
		
		/// game over
		if(player.crash(board,snake['player_position']))
		{
			$('#snake_box').addClass('game_over');
			pause=true;
			
			/// check for high score
			if(score>=high_score)
			{
				set_high_score(score);
			}
		}
		
		/// animate game
		else
		{
			set_stats();
			
			ctx.clearRect(0, 0, board['width'], board['height']);
			player.draw(ctx,board,snake['player_position']);
			food.draw(ctx,board);
		
			if(!pause)
			{
				setTimeout(function()
				{
					requestAnimationFrame(run_game);
				},
				rate*speed);
			}
		}
	}
  
  
  	/// set stats
	function set_stats()
	{
		$('#snake_time').html(get_elapsed_time());
		$('#snake_score').html(score);
		$('#snake_high_score').html(high_score);
		$('#snake_grid').html(grid_dimensions());
		
		/// high score date
		var d = new Date(high_score_date);

		$('#snake_high_score_date').html((d.getMonth()+1)+'/'+d.getDate()+'/'+d.getFullYear());
	}
	
	function grid_dimensions()
	{
		return board['width']/10+' X '+board['height']/10;
	}
	
	function get_high_score()
	{
		high_score=localStorage.getItem('snake_high_score');
		high_score_date=localStorage.getItem('snake_high_score_date');
	}
	
	function set_high_score(new_score)
	{
		var time = new Date();
		localStorage.setItem('snake_high_score', new_score);
		localStorage.setItem('snake_high_score_date', time);
	}
	
	/// get elapsee seconds
	function get_elapsed_time()
	{
		var time = new Date();
		var seconds=Math.floor((time-start_time-paused_time)/1000);
		var minutes=Math.floor(seconds/60);
		var seconds=seconds-(minutes*60);
		
		if(seconds<10)
		{
			return minutes+':0'+seconds;
		}
		
		return minutes+':'+seconds;
	}
	
	
	function user_input()
	{
		$(document).keydown(function (event)
		{
			
			var key = event.which;
			var direction = directions_keys[key];
			
			/// direction change
			if (direction)
			{
				player.change_direction(direction);
				event.preventDefault();
			}
			
			else if(key==32)
			{
				if(pause)
				{
					pause=false;
					
					var time=new Date();
					paused_time+=time-pause_start;
					run_game();
				}
				else
				{
					pause=true;
					pause_start=new Date();
				}
			}
		});
		
		/// reset game
		$('#snake_box').click(function (event)
		{
			if(pause)
			{
				init();
			}
		});
		
		/// change game level - speed
		$('.game_level').click(function (event)
		{
			if(this.value=='Slower')
			{
				speed=1;
			}
			
			if(this.value=='Faster')
			{
				speed*=.75;
			}
		});
		
		/// drag game		
		$('#game_drag').click(function (event)
		{
			if(track_drag)
			{
				game_width=new_width;
				game_height=new_height;
				track_drag=false;
			}
			
			else
			{
				drag_start=[event.pageX,event.pageY];
				track_drag=true;
			}
		});
		
		
		$(document).mousemove(function (event)
		{
			if(track_drag)
			{
				var drag_pos = [event.pageX,event.pageY];
				var change_width=game_width+(drag_pos[0]-drag_start[0])*2;
				var change_height=game_height+(drag_pos[1]-drag_start[1]);

				/// change if greater than minimum
				if(change_width>329)
				{
					new_width=change_width;
				}
				
				if(change_height>367)
				{
					new_height=change_height;
				}
				
				$('#snake_game_player').width(new_width);
				$('#snake_game_player').height(new_height);
				
				board['width']=Math.floor((new_width-30)/board['block'])*board['block'];
				board['height']=Math.floor((new_height-108)/board['block'])*board['block'];
				
				$('#snake_box').width(board['width']);
				$('#snake_box').height(board['height']);
				
				ctx.clearRect(0, 0, board['width'], board['height']);
				ctx=grid.set(board['width'],board['height']);
				
				set_stats();
			}
		});
	}
	
	
	/// increase score
	function up_score()
	{
		score++;
		speed*=.99;
		

		if(score>high_score)
		{
			high_score=score;
			$('#snake_game_player_stats').addClass('snake_game_player_stats_high_score');
			$('#snake_high_score_text').html('NEW HIGH SCORE: ');
			$('#snake_high_score_display').addClass('snake_game_player_stats_high_score_text');
			
			high_score_date=new Date();
			
			
		}
		
		set_stats();
	}
		
	return{
		init: init
	}
});