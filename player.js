class Player{
    constructor(pl1,pl2){
        this.player1 = pl1;
        this.player2 = pl2;
    }
    getplayer(player){
        if (player == -1){ return this.player1 }
        if (player == 1) { return this.player2 }
    }
    getbothplayer(){
        return([this.player1,this.player2]);
    }
}




module.exports = Player;