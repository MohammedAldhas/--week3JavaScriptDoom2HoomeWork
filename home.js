let pline = document.querySelector(".left span");
let texFaild = document.querySelector(".tex-faild");
let card = document.querySelector(".card");
let btn10 = document.querySelector(".btn10");

let mainArray = [];
if (window.localStorage.getItem("task")) {
  mainArray = JSON.parse(window.localStorage.getItem("task"));
}

bringDataFromLocal();

// enter Button
texFaild.addEventListener("keypress", function (e) {
  // If the user presses the "Enter" key on the keyboard
  if (e.key === "Enter" && texFaild.value !== "") {
    addToArray(texFaild.value);
    texFaild.value = "";
  }
});

card.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    dleteFromLocal(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
    e.target.parentElement.parentElement.remove();
  }
  if (e.target.classList.contains("fa-check")) {
    savechangesonlocal(
      e.target.parentElement.parentElement.parentElement.getAttribute("data-id")
    );
    e.target.parentElement.classList.toggle("checked");
    e.target.parentElement.nextSibling.classList.toggle("p-line");
  }
});
btn10.style = "display: block;";

//to add data to mainArray
function addToArray(texFaildValue) {
  const toDoList = {
    id: Date.now(),
    task: texFaildValue,
    checked: false,
  };
  mainArray.push(toDoList);
  addToPage(mainArray);
  addToLocal(mainArray);
}

function addToPage(mainArray) {
  card.innerHTML = "";
  mainArray.forEach((e) => {
    let lsts = document.createElement("div");
    lsts.classList =
      "card-body d-flex flex-row align-items-center justify-content-between";

    lsts.setAttribute("data-id", e.id);
    let left = document.createElement("div");
    left.classList = "left d-flex flex-row align-items-center";

    let check = document.createElement("div");
    check.classList = "check me-3 p-2";

    let icon = document.createElement("i");
    icon.classList = "fa-solid fa-check";
    icon.style.color = "#ffffff";

    let txt = document.createElement("span");
    txt.classList = "fw-bold";

    let right = document.createElement("div");
    right.classList = "rigt px-1";

    let rightIcon = document.createElement("i");
    rightIcon.classList = "fa-solid fa-xmark fs-4 delete";

    lsts.appendChild(left);
    lsts.appendChild(right);
    left.appendChild(check);
    left.appendChild(txt);
    check.appendChild(icon);
    txt.innerText = e.task;

    right.appendChild(rightIcon);
    card.appendChild(lsts);

    if (e.checked) {
      check.classList = "checked check me-3 p-2";
      txt.classList.toggle("p-line");
    }
  });
}

function addToLocal(mainArray) {
  window.localStorage.setItem("task", JSON.stringify(mainArray));
}

function bringDataFromLocal() {
  let data = window.localStorage.getItem("task");
  if (data) {
    let task = JSON.parse(data);
    addToPage(task);
  }
}

function dleteFromLocal(id) {
  mainArray = mainArray.filter((el) => el.id != id);
  addToLocal(mainArray);
}

function savechangesonlocal(id) {
  mainArray.forEach((el) => {
    if (el.id == id) {
      el.checked == false ? (el.checked = true) : (el.checked = false);
    }
  });

  addToLocal(mainArray);
}

function clearAllActive() {
  mainArray.map((e) => {
    if (e.checked == true) {
      dleteFromLocal(e.id)
      addToPage(mainArray)
      
    }
  });
}
