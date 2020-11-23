const objmap = {"-1" : ":regional_indicator_o:", "1":":regional_indicator_x:","0":":blue_square:"}
function display(g){
    sendstr = ""
    gameboard = g.toString().split(",");
    for (let i=0;i<9;i++){
        sendstr+=objmap[gameboard[i]]
        if (i==2 || i==5 || i==8){sendstr+='\n'}
    }
    return(sendstr);

}

module.exports = {display}