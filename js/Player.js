class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank=null
    this.x = 0;
    this.y = 0;

  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      x: this.x,
      y:this.y,

      rank:this.rank


    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  static updateCarsAtEnd(){
    database.ref("/").update({
      CarsAtEnd:CarsAtEnd+1
    })

    this.rank+=1;
  }

  GetCarsAtEnd(){
    database.ref("CarsAtEnd").on("value",(data)=>{
      CarsAtEnd=data.val();
    
    })
  }


}
