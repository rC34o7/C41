class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4img);
    cars = [car1, car2, car3, car4];
    obstacleGroup=new Group();
    this.spawnObstacle(); 
    passedFinish = false;
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.GetCarsAtEnd();

    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("black");
      image(trackimg,0, -displayHeight*4, displayWidth, displayHeight *5 );

      //index of the array
      var index = 0;
      
      //x and y position of the cars
      var x = 250;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + allPlayers[plr].x ;
        x = x+200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].y;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){

          fill("red");
          ellipse(x,y,170,170);

          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
      
    }

    if(player.distance<4200){
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.y +=10
      player.update();
    } 
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.y -=10
      player.update();
    } 
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
     // player.distance +=10
     player.x -=10 ;
      player.update(); 
      
    } 
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
     // player.distance +=10
     player.x += 10;
      player.update();
     // cars[index-1].x = x+10;
    } 
    
  }
    else if(passedFinish === false) {
     
      // CarsAtEnd = player.rank;
       Player.updateCarsAtEnd();
       player.rank = CarsAtEnd;
      // CarsAtEnd = player.rank;
       player.update();   
       passedFinish = true;   
     }
  
    drawSprites();
  }

end(){
  camera.position.x=0;
  camera.position.y=0; 

  imageMode(CENTER);

  Player.getPlayerInfo();

  image(bronze, displayWidth/-4, -100 + displayHeight/9, 200, 240);
  image(silver, displayWidth/4, -100 + displayHeight/10, 225, 270);
  image(gold, 0, -100, 250, 300);

  textAlign(CENTER);
  textSize(50);
  for(var plr in allPlayers){
      if(allPlayers[plr].rank === 1){
          text("1st: " + allPlayers[plr].name, 0, 85);
      }else if(allPlayers[plr].rank === 2){
          text("2nd: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73);
      }else if(allPlayers[plr].rank === 3){
          text("3rd: " + allPlayers[plr].name, displayWidth/-4, displayHeight/10 + 76);
      }
      /*else{
          textSize(30);
          text("Honorable Mention: " + allPlayers[plr].name, 0, 225);
      }*/
  }

  
}

spawnObstacle(){
  for(var i = 0; i<15; i++)
  {
    obstacle=createSprite(Math.round(random(300,displayWidth-300)),Math.round(random(10,900)));


    var rand = Math.round(random(1,2));
    switch(rand){
      case 1:obstacle.addImage("ob1",obstacle1); break;
      case 2:obstacle.addImage("ob2",obstacle2); break; 
      default: break; 

      

    }

    obstacle.scale=0.03;

    obstacleGroup.add(obstacle)
  }
  
  
  
}

      



}
