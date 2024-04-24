(function(){
  //Just a custom element for retitling the page
  class titleElement extends HTMLElement {
    constructor() {
      super();
      document.title = this.innerText;
      this.style.visibility = "hidden";
      this.style.display = "none";
      this.style.position = "absolute";
    }
    // Element functionality written in here
  }
  
  customElements.define("page-title", titleElement);


  //Get the page path
  window.penPlusPath = window.location.origin + window.location.pathname;
  window.gotoPath = (path) => {
    window.location.href = window.penPlusPath + '?page=' + path.replaceAll("/","%2F");
  }

  //The source page for the documents
  const docSource = window.penPlusPath + "/main/";

  //Search parameters
  const searchParams = new URLSearchParams(window.location.search);

  //The doc to find
  const page = searchParams.get("page") || "main";

  //Fetch the doc info
  fetch(`${docSource}${page}.html`).then(Response => {Response.text().then((dat) => {
    document.getElementById("documentContents").innerHTML = dat;
  })});

  //Get the theme
  document.body.className = localStorage.getItem("theme") || "theme-dark";

  //Retheming
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
