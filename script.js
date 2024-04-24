(function(){
  const docSource = "https://raw.githubusercontent.com/Pen-Group/docs/main/";

  const searchParams = new URLSearchParams(window.location.search);

  const page = searchParams.get("page");

  fetch(`${docSource}${page}.html`).then(Response => {Response.text().then((dat) => {
    document.getElementById("documentContents").innerHTML = dat;
  })});

  document.body.className = localStorage.getItem("theme") || "theme-dark";

  document.getElementById("theme-button").onclick = () => {
    switch (document.body.className) {
      case "theme-light":
        document.body.className = "theme-dark";
        break;
    
      default:
        document.body.className = "theme-light";
        break;
    }
    localStorage.setItem("theme", document.body.className)
  }
})();