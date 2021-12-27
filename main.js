img="";
objects=[];
status="";
function back(){
    window.location="index.html";
}
function preload(){
    img = loadImage('bottle.jpg');
  }
function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
  }
  function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(img,gotResult);
  }
  
  function gotResult(error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    objects = results;
  }
  
  
  function draw() {
    image(img, 0, 0, 380, 380);
  
        if(status != "")
        {
          objectDetector.detect(img, gotResult);
          for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          }
        }
  }