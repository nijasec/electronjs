const EventEmitter = require('node:events'); 
const WebSocket =require('ws');
const child_process = require('child_process');
const path = require('node:path');


class Stream extends EventEmitter {
  
    constructor(ar) {
      super();

      this.ar=ar;
      this.wss = new WebSocket.Server({ port: ar.wsport });
      //this.urls = ar.url;// ["rtsp://someIPAddress:554/1"];
      //this.urls.map((url) => {
        this.start(ar);
      //});
    }
    start(ar) {
      this.startStream(ar);
    }
    windowskill()
    {
      var spawn = require('child_process').spawn;    
     spawn("taskkill", ["/pid", this.child.pid, '/f', '/t']);
    }
    stop(ar){
     
     
      this.windowskill();
      /*for (let client of this.wss.clients) {
        if (client.readyState === 1) {
         client.send("close")
        } else {
          console.log("Error: Client from remoteAddress " + client.remoteAddress + " not connected.")
        }
      }*/
      this.wss.close();
      
      console.log('Stoped services on port:'+this.ar.wsport);
    }
    setOptions(url) {
 
      //var ffmpegpath='\\node_modules\\ffmpegbin\\ffmpeg.exe';
      //var newpath=__dirname.split('\\src')[0]+ffmpegpath;
   
       const options = {
        "/c":  "ffmpeg",
        "-i": url,
        "-stats": "",
        "-c:v":"copy",
        "-c:a":"copy",
        "-f": "mpegts",
      };
      let params = [];
      for (let key in options) {
        params.push(key);
        if (String(options[key]) !== "") {
          params.push(String(options[key]));
        }
      }
      params.push("-");
      return params;
    }
    startStream(ar) {
        
      this.child = child_process.spawn("cmd.exe", this.setOptions(ar.url));
      this.child.stdout.on("data", (data) => {

        for (let client of this.wss.clients) {
          if (client.readyState === 1) {
           client.send(data)
          } else {
            console.log("Error: Client from remoteAddress " + client.remoteAddress + " not connected.")
          }
        }
     //   console.log('stdout');
      //  wss.clients.forEach((client) => {
        //  client.send(data);
        //});
        return this.emit("data", data);
      });
      this.child.stderr.on("data",(data)=>{
        return this.emit("data", data);
      });
     this.child.on('closed', (code) => {
        alert(`Child exited with code ${code}`);
       });
    }
  }
  
module.exports=Stream;
