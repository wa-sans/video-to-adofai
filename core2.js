var ctx=canvas.getContext('2d');

var bjson={
	"pathData": "RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRDLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLDRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRDLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLDRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRDLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLDRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRDLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLDRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRDLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLDRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRDLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLDRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRDLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLDRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRDLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLDRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRDLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLDRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRDLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLDRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRDLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLDRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRDLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL", 
	"settings":
	{
		"version": 2, 
		"artist": "아티스트", 
		"specialArtistType": "None", 
		"artistPermission": "", 
		"song": "곡", 
		"author": "와샌즈아시는구나", 
		"separateCountdownTime": "Enabled", 
		"previewImage": "", 
		"previewIcon": "", 
		"previewIconColor": "003f52", 
		"previewSongStart": 0, 
		"previewSongDuration": 10, 
		"seizureWarning": "Disabled", 
		"levelDesc": "레벨에 대해 말해보세요!", 
		"levelTags": "", 
		"artistLinks": "", 
		"difficulty": 1,
		"songFilename": "", 
		"bpm": 100, 
		"volume": 100, 
		"offset": 0, 
		"pitch": 100, 
		"hitsound": "Kick", 
		"hitsoundVolume": 100, 
		"countdownTicks": 4,
		"trackColorType": "Single", 
		"trackColor": "000000", 
		"secondaryTrackColor": "ffffff", 
		"trackColorAnimDuration": 2, 
		"trackColorPulse": "None", 
		"trackPulseLength": 10, 
		"trackStyle": "Gems", 
		"trackAnimation": "None", 
		"beatsAhead": 3, 
		"trackDisappearAnimation": "None", 
		"beatsBehind": 4,
		"backgroundColor": "000000", 
		"bgImage": "", 
		"bgImageColor": "ffffff", 
		"parallax": [100, 100], 
		"bgDisplayMode": "FitToScreen", 
		"lockRot": "Disabled", 
		"loopBG": "Disabled", 
		"unscaledSize": 100,
		"relativeTo": "Global", 
		"position": [15, -9], 
		"rotation": 0, 
		"zoom": 450,
		"bgVideo": "", 
		"loopVideo": "Disabled", 
		"vidOffset": 0, 
		"floorIconOutlines": "Disabled", 
		"stickToFloors": "Disabled", 
		"planetEase": "Linear", 
		"planetEaseParts": 1
	},
	"actions":
	[
	]
};


function start(copy)
{
  var frame=1/24;
  var time=0;
  var st=0;
  var et=st+10;
  canvas.width=32;
  canvas.height=24;
  bjson.settings.bpm=60/(et-st)/2;//60/video.duration;
  //var limc=Array(32*24).fill('000000');
  video.onseeked=function()
  {
    loop();
  };
  time=st/frame;
  function loop()
  {
    var p=(time-st/frame)*frame/(et-st)/2;//time*frame/video.duration;
    if(time*frame<=video.duration&&time*frame<et)
    {
      video.currentTime=time*frame;
      ctx.drawImage(video,0,0,video.videoWidth,video.videoHeight,0,0,32,24);
      var im=ctx.getImageData(0,0,canvas.width,canvas.height).data;
      var imc=[];
      for(var y=0;y<24;y++)
      {
        var t=[];
        for(var x=0;x<32;x++)
        {
          var r=Math.min(im[(x+y*32)*4],255);
          var g=Math.min(im[(x+y*32)*4+1],255);
          var b=Math.min(im[(x+y*32)*4+2],255);
          var a=Math.min(im[(x+y*32)*4+3],255);
          var hex=r.toString(16).padStart(2,'0')+g.toString(16).padStart(2,'0')+b.toString(16).padStart(2,'0');
          t.push(hex);
        }
        if(y%2==1)
        {
          t=t.reverse();
        }
        imc.push(...t);
      }
      var lc=[];
      for(var i=0;i<imc.length;i++)
      {
        if(i==0)
        {
          lc=[i,imc[i]];
        }
        /*
        if(limc[i]==imc[i])
        {
          if(lc[0]!=undefined)
          {
            lc=[];
          }
        }
        else if(lc[0]==undefined)
        {
          lc=[i,imc[i]];
        }
        */
        if(lc[1]!=imc[i]||i==imc.length-1/*||(limc[i]==imc[i]&&lc[0]!=undefined)*/)
        {
          bjson.actions.push({ "floor": 1, "eventType": "RecolorTrack", "startTile": [lc[0], "Start"], "endTile": [i-1, "Start"], "trackColorType": "Single", "trackColor": lc[1], "secondaryTrackColor": "ffffff", "trackColorAnimDuration": 2, "trackColorPulse": "None", "trackPulseLength": 10, "trackStyle": "Gems", "angleOffset": p*180, "eventTag": "" });
          //if(limc[i]!=imc[i])
          {
            lc=[i,imc[i]];
          }
        }
      }
      time++;
    }
    else
    {
      console.log('end');
      copy(JSON.stringify(bjson));
      return;
    }
    
  }
  loop();
}
















