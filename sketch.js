//description: this is my version of a clock in which each arc represents an hour in the 24 hours of the day. The drawing starts from the inside to the outside and the bright pink outer arc represents the current hour being drawn every minute. The big dot is the current hour in the position it is in traditional analogue clocks.

let colorpalette = [
  "CB8589",
  "C88F83",
  "C6987D",
  "C3A277",
  "C0AB70",
  "BEB56A",
  "BBBE64",
];
let c = 0; //index of the colorpalette array
let H = 0; //counts how many arcs are drawn
let w; //diameter of outer arc
let r; //radius of outer arc
let a; //angle used in rotation of the outer arc

function setup() {
  createCanvas(500, 600);
  angleMode(DEGREES);
}

function draw() {
  background("#f5f5e1"); //v light green

  let h = hour();
  let mins = minute();

  let w = 208 + 8 * h; //this counts the diameter of the outer arc being drawn

  for (d = 208; d <= w; d = d + 8) {
    //d is the variable of diameters of the arcs
    noFill();
    strokeWeight(8);

    if (h == 0) {
      //makes sure nothing is drawn at 00:00
      stroke("#d54c77"); //rose petant
      push();
      translate(width / 2, -30 + height / 2);
      conventional();
      let end = map(mins, 0, 60, 0, 360);
      arc(0, 0, 208, 208, 0, end);
    } else {
      stroke("#" + colorpalette[c]);
      c++;
      if (c >= colorpalette.length) {
        c = 0;
      }

      //draws all the arcs representing the hours before the current hour
      arc(width / 2, -30 + height / 2, d, d, 0, 360);

      H++; //counts how many arcs are drawn
      if (H > 24) {
        H = 0;
      }

      push();
      translate(width / 2, -30 + height / 2);
      conventional(); //function that rotates the outer arc

      let r = (w + 8) / 2; //radius of outer arc

      if ((H = h)) {
        //used to make sure outer arc is drawn only for the current hour
        strokeWeight(8);
        stroke("#d54c77"); //rose petant
        let end = map(mins, 0, 60, 0, 360);
        arc(0, 0, w + 8, w + 8, 0, end);
        //draws the arc that represents the current hour being drawn as min go by
      }
      pop();

      //segment of code that draws a dot at conventional hour placement of current hour
      let cx = width / 2; //x coordinate of center of clock
      let cy = -30 + height / 2; //y coordinate of center of clock
      strokeWeight(30);
      stroke("#d54c77"); //rose petant
      point(cx + sin(a + 90) * r, cy - cos(a + 90) * r); //trigonometric calculations to get coordinates of dot
    }
    print("current hour:" + h + " H:" + H);
  }
  c = 0; //resets the counter for color so it doesn't flash as draw() loops

  noStroke();
  textSize(10);
  textFont("Helvetica");
  fill("#d54c77");
  text("click anywhere to display digital clock", -80 + width / 2, 20);

  if (mouseIsPressed) {
    //displays hour:minute:second
    noStroke();
    textSize(30);
    textFont("Helvetica");
    fill("#d54c77");
    text(hour() + ":" + minute() + ":" + second(), 200, 550);
  }
}

function conventional() {
  //so that the arc of the current hour starts where the hour number is on a traditional analogue clock
  let h = hour();
  a = (h % 12) * 30 - 90; //adds 30 degrees in the rotation every hour
  rotate(a);
}
