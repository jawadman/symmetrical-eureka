// OOP Inheritance


function setup() {
  createCanvas(windowWidth, windowHeight);
  speedy  = new Vehicle("Maserati", "Car")
  console.log(speedy.getName())
  console.log(speedy.getType())

}

function draw() {
  background(220);
}

let speedy = new Car("Maserati");




class Vehicle {
  constructor(type, name){
    this.name = name;
    this.type = type;
  }

  getName(){
    return this.name;
  }

  getType(){
    return this.type;
  }
}

class Car extends Vehicle{
  constructor(name) {
    super(name, "car");
  }

  getName(){
    return ("This is a " + super.getName() + "brokie");
  }
}

