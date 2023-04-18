const elem1 = document.getElementById("box1");
const elem2 = document.getElementById("box2");
const elem3 = document.getElementById("box3");
const elem4 = document.getElementById("box4");

const boxes = [elem1, elem2, elem3, elem4];
const ids = ["box1", "box2", "box3", "box4"];

//this loop makes all the boxes initially draggable (since they are all green at the beginning)
for(let j=0; j<ids.length; j++) {
  $( "#" + ids[j]).draggable();
}

//this function changes the state of all the boxes except for box number k
function changeState(k) {
  for(let i=0; i<boxes.length; i++) {
    if(i!=k) {
      if(boxes[i].style.backgroundColor === "red") {
        boxes[i].style.backgroundColor = "green";
        $( "#" + ids[i]).draggable( "enable" );
      } else {
        boxes[i].style.backgroundColor = "red";
        $( "#" + ids[i]).draggable( "disable" );
      }
    }
  }
}

//every box has an EventListener on double click which calls function changeState
elem1.addEventListener("dblclick", () => { changeState(0); });
elem2.addEventListener("dblclick", () => { changeState(1); });
elem3.addEventListener("dblclick", () => { changeState(2); });
elem4.addEventListener("dblclick", () => { changeState(3); });