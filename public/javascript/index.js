const header = document.getElementById("pagination");
const btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    const current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

function selectRow() {
  const url = document.getElementById("limit").value;
  console.log(url);
  window.location.href = url;
}
