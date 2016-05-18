var HorseRace = {
  racers : [],
  load_racers : function(racer_data){
    this.racers = racer_data;
  },
  init : function(){
    console.log('Preparing for the race');
    // Give everyone a horse

    var distance_between = 25;
    var track_offset = 200;

    $.each( this.racers, function( racer_num, racer ) {
      console.log( racer_num, racer );
      var h = $('#svg_horse').clone();
      console.log(h.css("width"), h.css("height"));

      h.css("width", 200);
      h.css("height", 200);

      h.css({
        height: 200,
        width: 200,
        top: track_offset + distance_between * racer_num,
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
    $("#header").html("Day #"+(day+1));
    if(racer.daily_earn[day] == undefined){
      racer.horse.rocking.pause();
      return;
    }
    racer.position += (racer.daily_earn[day] * max_px_per_day);
    console.log('step', racer);
    TweenLite.to(racer.horse, 4, {left: racer.position, onComplete: function(){ HorseRace.race_step(racer, day + 1); }});
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

var Horse = function(){
  // Color
  // X position
  this.el = $('#svg_horse').clone();
  this.speed = 0;
  this.rocking = false;

  this.trot = function(){ this.speed = 5; };
  this.animate = function(){
    this.rocking = TweenLite.to(horse, speed, {rotation:10, ease: Expo.easeInOut, onComplete: function(){ HorseRace.animate.rocking_back(horse, speed); }});
  }
};


$( document ).ready(function() {
  // HorseRace.load_racers([racer_data[3], racer_data[4]]);
  HorseRace.load_racers(racer_data);
  HorseRace.init();
  HorseRace.lineup()
  setTimeout(HorseRace.race, 5000);
});




var raw_data = ['TARA, Alex Dorado, 0, 0, 0, 0, 0, 0, 0, 0, 0',
  'TARA, Arlene Meza, 2150, 2200, 3350, 700, 1300, 2600, 1550, 1150, 1900',
  'ALYSSA, Bianca Gallardo, 2700, 3200, 2250, 2050, 2250, 1100, 0, 950, 900',
  'TARA, CeCe Love, 4000, 2200, 2550, 2250, 2250, 1750, 2600, 2550, 2400',
  'BRITTANY, Claudia Arechiga, 3100, 1650, 2950, 1400, 3050, 2500, 1800, 2200, 2150',
  'TARA, Cynthia Martinez, 2450, 1600, 850, 1350, 1900, 1950, 1000, 900, 350',
  'ALYSSA, Gisela Lovio, 3050, 2100, 2000, 2450, 2450, 1550, 500, 1000, 2050',
  'MATT, Irene Portillo, 1500, 3100, 1600, 3050, 1500, 3000, 2000, 1600, 1150',
  'TARA, Isaac Gutierrez, 1450, 0, 550, 350, 1500, 0, 1250, 700, 750',
  'TARA, Janette Mora, 0, 0, 0, 0, 0, 0, 0, 0, 0',
  'BRITTANY, Joseph Baca, 0, 0, 0, 0, 0, 0, 0, 0, 0',
  'TARA, Kyle Keich, 1750, 1150, 2000, 2300, 2250, 2250, 2600, 2250, 2750',
  'MATT, Lauryn Silva, 0, 0, 0, 0, 0, 0, 0, 0, 600',
  'BRITTANY, Lena Nixa, 2350, 800, 2700, 2650, 2650, 1400, 3500, 3000, 2350',
  'MATT, Lizeth Bello, 1350, 1900, 3250, 1000, 2400, 900, 0, 250, 900',
  'TARA, Mirza Romo, 1550, 800, 1500, 1900, 2800, 1400, 1250, 1600, 1400',
  'BRITTANY, Myia Nunez, 1650, 650, 0, 1000, 1300, 1000, 1150, 300, 1650',
  'ALYSSA, Nina Hauschild, 2450, 2500, 1650, 2650, 1500, 1300, 2700, 1600, 400',
  'MATT, Sarah Sanchez, 1750, 0, 2100, 1850, 1500, 500, 2100, 3350, 1000',
  'BRITTANY, Selena Robles, 2400, 3000, 1900, 2350, 2250, 3100, 1800, 2650, 1450',
  'BRITTANY, Tao Tran, 1500, 1650, 1500, 1900, 1350, 2500, 2900, 1700, 2350',
  'ALYSSA, Therese Simmons, 1250, 2550, 3700, 1200, 2000, 2400, 1150, 550, 600',
  'MATT, Tima Cook, 3100, 1550, 1950, 550, 1500, 1950, 1550, 1200, 650',
  'TARA, Tirza Vazquez, 2600, 0, 0, 0, 0, 0, 0, 0, 0',
  'ALYSSA, Tony Redrick, 2500, 950, 300, 2250, 1750, 1400, 2350, 1100, 1750',
  'MATT, Valerie Reyes, 0, 1750, 2050, 1150, 650, 2250, 1000, 950, 900',
  'MATT, Whitney Quinley, 2550, 2250, 2400, 2450, 1900, 2000, 2550, 550, 2700',
  'TARA, Yoana Gallardo, 2250, 2850, 2300, 2100, 2050, 2200, 1850, 500, 2200'];

console.log(raw_data);
var racer_data = [];
var max_earn = 0;

$.each( raw_data, function( i, racer ) {
  var obj = {};
  var split = racer.split(', ');
  obj.team = split.shift();
  obj.name = split.shift();
  obj.daily_earn = split.map(Number);
  obj.total = obj.daily_earn.reduce((p,c)=>p+c);

  max_earn = Math.max(max_earn, obj.total);
  racer_data.push(obj);
});

var total_day = racer_data[0].daily_earn.length;
var max_px_per_day = 1000 / (max_earn * 1.1 );