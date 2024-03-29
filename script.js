//1. grid layout
  //2. creating 81 boxes is too much of a work
  //3. Use js to create boxes/inputs

  //syntax - the way to define the code

  //my name is shakti

  var suduko = [[], [], [], [], [], [], [], [], []];

  function createGrid() {
    var myContainer = document.getElementById("container");

    //var myInput = document.createElement('input')

    //myContainer.append(myInput)

    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        var myInput = document.createElement("input");

        if(j==3||j==6){                                                 //for 3X3 borders
           myInput.style.borderLeft= "2px solid";
        }
        if(j==2||j==5){
          myInput.style.borderRight= "2px solid";
       }
        if(i==2||i==5){
          myInput.style.borderBottom= "2px solid";
        }
        if(i==3||i==6){
          myInput.style.borderTop= "2px solid";
        }                                                                   

        myInput.id = `${i}${j}`;
        myInput.type = "number";
        var number = Math.ceil(Math.random() * 9);
        myInput.row = i;
        myInput.col = j;
        if (isSafe(suduko, i, j, number)) {
          myInput.value = number;
          myInput.readOnly = true;
        } else {
          number = 0;
          myInput.value = "";
        }
        suduko[i][j] = number;
        myContainer.appendChild(myInput);

        myInput.oninput = function (e) {
          if(e.target.value > 9 || e.target.value<0){
            alert("GREATER THAN 9 AND LESS THAN 1 is Not Allowed")
            e.target.value = "";
            e.target.style.backgroundColor = "white";
          }else{
            checkAnswer(suduko, e);
          }
          if(e.target.value === "") {
            e.target.style.backgroundColor = "white";
            e.target.style.border =" 3px solid #58575791" ;
          }
        };
      }
    }
    console.log("suduko:", suduko);
  }

  createGrid();

  function isSafe(grid, row, col, num) {
    //column-check
    for (var x = 0; x < 9; x++) {
      if (grid[row][x] == num) {
        return false;
      }
    }
    //row-check
    for (var y = 0; y < 9; y++) {
      if (grid[y][col] == num) {
        return false;
      }
    }
    //mini grid
    var startRow = row - (row % 3);
    var startCol = col - (col % 3);
    for (var m = 0; m < 3; m++) {
      for (var n = 0; n < 3; n++) {
        if (grid[m + startRow][n + startCol] == num) return false;
      }
    }

    return true;
  }

  function checkAnswer(grid, e) {
    var row = e.target.row;
    var col = e.target.col;
    var num = Number(e.data);
    var id = e.target.id;

    for (var x = 0; x < 9; x++) {
      if (grid[row][x] == num) {
        showcolors("red", id);
        return false;
      }
    }

    for (var y = 0; y < 9; y++) {
      if (grid[y][col] == num) {
        showcolors("red", id);
        return false;
      }
    }

    var startRow = row - (row % 3);
    var startCol = col - (col % 3);
    for (var m = 0; m < 3; m++) {
      for (var n = 0; n < 3; n++) {
        if (grid[m + startRow][n + startCol] == num) {
          showcolors("red", id);
          return false;
        }
      }
    }
    if(grid[row][col] == ""){
      showcolors("white",id);
    }
    showcolors("green", id);
    return true;
  }

  function showcolors(color, id) {
    var inp = document.getElementById(id);

    if (color == "red") {
      inp.style.backgroundColor = "red";
      inp.style.border="1px solid"                  //decrease the size of border
    } 
    if(color == "green") {
      inp.style.backgroundColor = "green";
      inp.style.border="1px solid"                  //decrease the size of border
    }
    if(color == "white") {
        inp.style.backgroundColor = "white";
        inp.style.border="1px solid"                //decrease the size of border
    }
  }