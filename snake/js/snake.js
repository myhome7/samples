/// bust the cache
require.config({
    urlArgs: "bust=" + (new Date()).getTime()
  });

/// set up the game
require(['jquery', 'underscore', 'snake/game', 'snake/player', 'snake/food'], function ($,underscore,game,player,food)
{
    game.init();
});