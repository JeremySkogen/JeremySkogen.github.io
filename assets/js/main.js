var HorseRace = {
  racers : [
    {'name': 'Alex', 'daily_earn': [100, 200, 300, 500, 700]},
    {'name': 'Bob', 'daily_earn': [50, 250, 410, 490, 560]},
    {'name': 'Trevor', 'daily_earn': [200, 450, 490, 630, 820]}
  ],

  init : function(){
    console.log('Preparing for the race');
    // Give everyone a horse

    var distance_between = 100;

    $.each( this.racers, function( racer_num, racer ) {
      console.log( racer_num, racer );
      var h = $('#svg_horse').clone();
      console.log(h.css("width"), h.css("height"));

      h.css("width", 200);
      h.css("height", 200);

      h.css({
        height: 200,
        width: 200,
        top: distance_between * racer_num,
        left: -200
      })
      TweenLite.to(h, 0.1, {rotation:-10});

      racer.horse = h;
      $('#track').append(racer.horse);
      racer.horse.show();
    });
  },
  
  // Animate the horses coming out
  lineup : function(){
    $("#header").html("On your marks!");
    $.each( HorseRace.racers, function( racer_num, racer ) {
      var approach = Math.random() * 5;
      var trot = (Math.random() / 4) + 0.35;
      racer.position = 10;
      TweenLite.to(racer.horse, approach, {left: 10, onComplete: function(a,b){ racer.horse.rocking.pause(); }});
      HorseRace.animate.rocking_fwd(racer.horse, trot);
    });
  },

  race : function(){
    $("#header").html("Go!");
    $.each( HorseRace.racers, function( racer_num, racer ) {
      racer.horse.rocking.resume();
      HorseRace.race_step(racer, 0);
    });
  },
  race_step : function(racer, day){
    if(racer.daily_earn[day] == undefined){
      racer.horse.rocking.pause();
      return;
    }
    racer.position += racer.position + (racer.daily_earn[day] / 5);

    TweenLite.to(racer.horse, 4, {left: racer.daily_earn[day], onComplete: function(){ HorseRace.race_step(racer, day + 1); }});
  },

  animate : {
    rocking_fwd : function(horse, speed){
      horse.rocking = TweenLite.to(horse, speed, {rotation:10, ease: Expo.easeInOut, onComplete: function(){ HorseRace.animate.rocking_back(horse, speed); }});
    },
    rocking_back : function(horse, speed){
      horse.rocking = TweenLite.to(horse, speed, {rotation:-10, ease: Circ.easeInOut, onComplete: function(){ HorseRace.animate.rocking_fwd(horse, speed); }});
    }
  }

};

$( document ).ready(function() {
  HorseRace.init();
  HorseRace.lineup()
  setTimeout(HorseRace.race, 5000);
});