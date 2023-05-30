$(function () {
  //general time variables available to the full function
  var nameEl = $("#welcome");
  var dayEl = $("#currentDay");
  var timeEl = $("#currentTime");
  var currentHour = dayjs().hour();
  // var currentHour = 13;

  //changes styling based on current hour
  var timeBlocks = $(".time-block");
  var blockText = $(".description");

  //sanity checks are commented out
  // console.log(timeBlocks);
  // console.log(currentHour);
  for (var i = 0; i < timeBlocks.length; i++) {
    var boxHour = Number(timeBlocks[i].id);
    // console.log(boxHour);

    if (boxHour < currentHour) {
      // console.log("I'm past!");
      blockText[i].classList.add("past");
    } else if (boxHour === currentHour) {
      // console.log("Im present!");
      blockText[i].classList.add("present");
    } else {
      // console.log("I'm future!");
      blockText[i].classList.add("future");
    }
  }

  renderSaved();

  // saves input into local storage as specified by hour
  var saveEl = $(".saveBtn");
  saveEl.on("click", function () {
    var parentID = this.parentElement.id;
    var input = this.previousElementSibling.value;
    // console.log(parentID);
    // console.log(input);
    window.localStorage.setItem(parentID, input);
  });

  function renderSaved() {
    for (var i = 0; i < timeBlocks.length; i++) {
      var boxHour = Number(timeBlocks[i].id);
      timeBlocks[i].children[1].value = window.localStorage.getItem(boxHour);
    }
  }

  //handles name banner
  if (window.localStorage.getItem("name") == null) {
    var name = window.prompt("Hello! What's Your Name?");
    window.localStorage.setItem("name", name);
  }

  nameEl.text("Welcome Back, " + window.localStorage.getItem("name"));
  dayEl.text("Today is " + dayjs().format("dddd, MMMM DD, YYYY"));
  timeEl.text("-- it is  " + dayjs().format("hh:mm a --"));
});
