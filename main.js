const Discord = require('discord.js');
const Game = require('./gameobj.js');
const {display} = require('./frontend.js');
const Player = require('./player.js');

const client = new Discord.Client();
var waitingqueue = new Map();
var playerobjmap = new Map();
var gamemap = new Map();

client.login("token here");

client.on("ready",()=>{
    console.log("Ready!");

});

client.on("message",async(msg)=>{
    try{
        
        if(msg.content.slice(0,1)!="?") return;
        cmd = msg.content.toLowerCase().slice(1,msg.content.length).split(" ");
        if((cmd[0]=="help"|| cmd[0]=="h") && cmd[1]=="tictactoe"){
            msg.channel.send("TicTacToe commands:\n ?p <command> or ?play <command> to interact with the bot.\n?p @mention to start a new game with someone\n ?p accept to accept a game from someone\n?p start to start a new game.\n?p <number> to interact with the game\n 1 2 3\n 4 5 6\n 7 8 9");
        }
        if(cmd[0]=="play"|| cmd[0]=="p"){
            //X player messages someone to play
                let oplayer = null;
                msg.mentions.users.find(user => oplayer = user);
                if(oplayer!=null){
                    waitingqueue.set(oplayer, msg.author);
                    console.log(`${msg.author.username} has pinged ${oplayer.username}`);
                    return;
                }
            //O player accepts
                if(cmd[1]=="accept"){
                    if(!waitingqueue.has(msg.author)){
                        await msg.reply("No game request found.");
                        return;
                    }
                    console.log(`${msg.author.username} has accepted. ${waitingqueue.get(msg.author).username}`);
                    let playermap = new Player(msg.author,waitingqueue.get(msg.author));
                    playerobjmap.set(msg.author,playermap);
                    playerobjmap.set(waitingqueue.get(msg.author),playermap);
                    waitingqueue.delete(msg.author);
                    return;
                }
            //New game is created
                if(cmd[1]=='start'){
                    if(!playerobjmap.has(msg.author)){
                        msg.reply("You dont have any active games");
                        return;
                    }
                    console.log("Game started");
                    gamemap.set(playerobjmap.get(msg.author),new Game());
                    msg.channel.send(display(gamemap.get(playerobjmap.get(msg.author)).gameobj));
                }

            //Game code depending on the person playing
                if(["1","2","3","4","5","6","7","8","9"].includes(cmd[1])){
                    if(!playerobjmap.has(msg.author)){ msg.channel.send("Please mention someone to play with first"); return;}
                    if(!gamemap.has(playerobjmap.get(msg.author))){ msg.channel.send("Please start the game with ?play start"); return;}
                    let currentgame = gamemap.get(playerobjmap.get(msg.author));
                    let currentplayerobj = playerobjmap.get(msg.author);
                    if(currentplayerobj.getplayer(currentgame.current()) != msg.author){
                        msg.reply("Wait for your turn!");
                        return;
                    }
                    currentgame.makemove(cmd[1]);
                    msg.channel.send(display(currentgame.gameobj));
                    if(currentgame.terminated()){
                            setwinner = currentgame.current()+1 ? -1:1
                            msg.channel.send(`${currentplayerobj.getplayer(setwinner)} won!`);
                            msg.channel.send("To start a game again : ?play start");
                            return;                        
                    }
                    if(currentgame.draw()){
                        msg.channel.send("GAME DRAW!");
                        return;
                    }

                }
            //terminate game command/game over remove them from queues.
        }

        
    }
    catch(err){
        console.warn("on message error:")
        console.warn(err);

    }
});

//command to mention everyone if anybody wants to play

//command to challenge someone
//command to accept challenge
//command to play <position>
