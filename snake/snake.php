<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<title>Snake Game - Gary Reiss</title>

<meta name="robots" content="noindex,nofollow">
<script type="text/javascript">
  
</script>
<script src="js/require.js" data-main="js/snake"></script>

<link rel="stylesheet" href="styles/main.css" />

</head>

<body style="background-color:#CCCCCC;">
  <div id="snake_game_player">
    <div id="snake_game_player_container">
      <div id="snake_game_player_stats">
        <div style="float:left; margin-left:20px;">
          <div>
            TIME: <span id="snake_time"></span>
          </div>
          <div>
            SCORE: <span id="snake_score"></span>
          </div>
          <div>
            GRID: <span id="snake_grid"></span>
          </div>
        </div>
        <div style="float:right; width:150px;">
          <div id="snake_high_score_display">
            <span id="snake_high_score_text">HIGH SCORE: </span>
            <span id="snake_high_score"></span>
          </div>
          <div>
            SET: <span id="snake_high_score_date"></span>
          </div>
          <div>
            <input class="game_level" type="button" value="Slower" /><input class="game_level" type="button" value="Faster" />
          </div>
        </div>
      </div>
      <div id="snake_box_container">
	    <canvas id="snake_box"></canvas>
      </div>
    </div>
    <img id="game_drag" src="images/drag.png" title="Click to change grid size" />
  </div>
 
  <div id="snake_positions" style="float:right; width:100px;"></div>
</body>
</html>