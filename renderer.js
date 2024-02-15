


const settings=null;

async function startstreaming(ar)
{

await window.startstream.startstream(ar)
window.startstream.ondataavailable((event,reply) => {
console.log(reply);
/*
// Setup the jsmpeg player
var player = new JSMpeg.Player('ws://localhost:'+reply.wsport, {
canvas: document.getElementById('jsplayer'),
decodeFirstFrame: true,
//	disableWebAssembly: !parseInt(q.get('wasm')),
throttled: false,
//chunkSize: 4 * 1024 * 1024,
//disableGl: !parseInt(q.get('webgl')),
//audio: !!parseInt(q.get('audio')),
onVideoDecode: function(decoder, elapsedTime) {
graph.add(elapsedTime*1000);
}
});
player.play();
return;*/

if(reply.vidid!=ar.vidid){
  console.log('Not for me '+ar.vidid);
return;
}
switch(reply.vidid)
{
  case 'diver1':
    setTimeout(()=>{
      if (mpegts.getFeatureList().mseLivePlayback) {
      var vidid=document.getElementById(ar.vidid);
      if(ar.player){
        ar.player.destroy();
        console.log('player resources cleaned');
      }
      
      ar.player = new mpegts.MSEPlayer ({
      type: 'mse',  // could also be mpegts, m2ts, flv
      isLive: true,
      enableStashBuffer:false,
      liveBufferLatencyChasing:true,
      url: 'ws://localhost:'+reply.wsport
      });
      ar.player.attachMediaElement(vidid);
      ar.player.load();
      ar.player.play();
     
      }
      },2000);
      
  break;
  case 'diver2':
    setTimeout(()=>{
      if (mpegts.getFeatureList().mseLivePlayback) {
      var vidid=document.getElementById(ar.vidid);
      if(ar.player){
        ar.player.destroy();
        console.log('player resources cleaned');
      }
      
      ar.player = new mpegts.MSEPlayer ({
      type: 'mse',  // could also be mpegts, m2ts, flv
      isLive: true,
      enableStashBuffer:false,
      liveBufferLatencyChasing:true,
      url: 'ws://localhost:'+reply.wsport
      });
      ar.player.attachMediaElement(vidid);
      ar.player.load();
      ar.player.play();
     
      }
      },2000);
  break


}
});
}
window.onload=function()
{
getDefault();
var player1,player2,player3,player4;
player1=document.getElementById('diver1');

player1.addEventListener('timeupdate',()=>{
  document.getElementById('timeupdate1').innerHTML=toHHMMSS(player1.currentTime);
  })
  player2=document.getElementById('diver2');

player2.addEventListener('timeupdate',()=>{
  document.getElementById('timeupdate2').innerHTML=toHHMMSS(player2.currentTime);
  })
  player3=document.getElementById('diver3');

player3.addEventListener('timeupdate',()=>{
  document.getElementById('timeupdate3').innerHTML=toHHMMSS(player3.currentTime);
  })
  player4=document.getElementById('diver4');

player4.addEventListener('timeupdate',()=>{
  document.getElementById('timeupdate4').innerHTML=toHHMMSS(player4.currentTime);
  })
}
async function getDefault()
{
const settings=await window.getStoreValue.getStoreValue('appsettings');
console.log(settings);
}
async function getUrl(key)
{
  var a=await window.getStoreValue.getStoreValue('appsettings.'+key);
  console.log(a);
  return a;
}
document.getElementById("diver1reloadbtn").addEventListener('click',()=>{
startLive({vidid:'diver1'});

});
document.getElementById("diver2reloadbtn").addEventListener('click',()=>{
  startLive({url:document.getElementById('diver2url').value,vidid:'diver2'});
});
document.getElementById("diver3reloadbtn").addEventListener('click',()=>{
  startLive({url:document.getElementById('diver3url').value,vidid:'diver3'});
  });
  document.getElementById("diver4reloadbtn").addEventListener('click',()=>{
    startLive({url:document.getElementById('diver4url').value,vidid:'diver4'});
    });
function toHHMMSS(t) {
var sec_num = parseInt(t, 10); // don't forget the second param
var hours   = Math.floor(sec_num / 3600);
var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
var seconds = sec_num - (hours * 3600) - (minutes * 60);
if (hours   < 10) {hours   = "0"+hours;}
if (minutes < 10) {minutes = "0"+minutes;}
if (seconds < 10) {seconds = "0"+seconds;}
return hours+':'+minutes+':'+seconds;
}
document.getElementById('diver2stopbtn').addEventListener('click',()=>{

  var vidid=document.getElementById('diver2');
  stopStreaming('diver2');
  //vidid.pause() ;
  //vidid.currentTime=0;

 

})
async function stopStreaming(x)
{
 
await window.stopstreaming.stopstreaming(x)


}

async function startLive(ar)
{

const reply=await window.electronAPI.startLive(ar)
console.log(reply);
if (mpegts.getFeatureList().mseLivePlayback) {
  var vidid=document.getElementById(ar.vidid);
    
  
  
  ar.player = new mpegts.MSEPlayer ({
  type: 'mse',  // could also be mpegts, m2ts, flv
  isLive: true,
  enableStashBuffer:false,
  liveBufferLatencyChasing:true,
  url: 'ws://localhost:'+reply.wsport
  });
  ar.player .attachMediaElement(vidid);
  ar.player .load();
  ar.player .play();
 

 }


}