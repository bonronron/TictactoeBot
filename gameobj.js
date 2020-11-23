class Game{
    constructor(){
        this.gameobj = [[0,0,0],[0,0,0],[0,0,0]];
        
    }
    //1 is X, -1 is O
    

    terminated(){
        let go = this.gameobj.toString().split(",").map((i)=>{return parseInt(i)});
        if ((go[0]==go[1]&&go[1]==go[2])&&(go[0]!=0) ||
        (go[3]==go[4]&&go[4]==go[5])&&(go[5]!=0) ||
        (go[6]==go[7]&&go[7]==go[8])&&(go[8]!=0) ||
        (go[0]==go[3]&&go[3]==go[6])&&(go[6]!=0) ||
        (go[1]==go[4]&&go[4]==go[7])&&(go[7]!=0) ||
        (go[0]==go[4]&&go[4]==go[8])&&(go[8]!=0) ||
        (go[2]==go[4]&&go[4]==go[6])&&(go[6]!=0) ||
        (go[2]==go[5]&&go[5]==go[8])&&(go[8]!=0)) {return true;}
        return false;
    }
    draw(){
        if (this.terminated){return false}
        let go = this.gameobj.toString().split(",").map((i)=>{return parseInt(i)});
        let check0 = 0; 
        for(let i=0;i<9;i++){
            if (go[i]==0) check0+= 1;
        }
        if (!check0) return true;
        return false;
    }

    action(){
        var row,cell;
        var actioncells = []
        this.gameobj.forEach((row,indexr) => {
          row.forEach((cell,indexc)=>{
            if (cell === 0){
                actioncells.push([indexr,indexc]);
            }
          });
        }); 
        return actioncells;
    }
    current(){
        let sum =0;
        this.gameobj.forEach(row=>{
            row.forEach(cell=>{
                sum+=cell;
            })
        });
        return sum ? -1:1;

    }
    result(actioncell){
        if(!this.terminated()){
            let actions = this.action();
            if (JSON.stringify(actions).includes(JSON.stringify(actioncell))){
                this.gameobj[actioncell[0]][actioncell[1]] = this.current();
                //console.log(this.gameobj);
            }
            else console.log("action not possible");
        }
        else(console.log("Game is already over!"));
    }
    makemove(move){
        const movemap =  {1:[0,0],2:[0,1],3:[0,2],4:[1,0],5:[1,1],6:[1,2],7:[2,0],8:[2,1],9:[2,2]};
        this.result(movemap[parseInt(move)])
    }
}


module.exports = Game;