prediction_1 = "";

Webcam.set({
  width: 350,
  height: 300,
  image_format: "png",
  png_quality: 90,
});
camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot() {
  Webcam.snap(function (data_uri) {
    document.getElementById("result").innerHTML =
      '<img id="captured_image" src="' + data_uri + '">';
  });
}

console.log("ml5 version:", ml5.version);
classifier = ml5.imageClassifier(
  "https://teachablemachine.withgoogle.com/models/U1ByYb_re/model.json",
  modelLoaded
);

function modelLoaded() {
  console.log("emotion identification model loaded successfuly");
}

function speak() {
  var synth = window.speechSynthesis;
  speak_data_1 = "this is the prediction  " + prediction_1;

  var utterThis = new SpeechSynthesisUtterance(speak_data_1);
  synth.speak(utterThis);
}

function check() {
  img = document.getElementById("captured_image");
  classifier.classify(img);
}

function gotresults() {
  if (error) {
    console.log(error);
} else {
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    prediction_1 = results[0].label;

    speak();
    if (results[0].label == "stop") {
      document.getElementById("update_emoji").innerHTML = "&#9995;";
    }
    if (results[0].label == "write") {
      document.getElementById("update_emoji").innerHTML = "&#9997;";
    }
    if (results.label == "hi") {
      document.getElementById("update_emoji").innerHTML = "&#128075;";
    }
    if (results[0].label == "amazing") {
      document.getElementById("update_emoji").innerHTML = "&#128076;";
    }
    if (results[0].label == "best") {
      document.getElementById("update_emoji").innerHTML = "&#128077;";
    }
    if (results[0].label == "victory") {
      document.getElementById("update_emoji").innerHTML = "&#9996;";
    }
  }
}
