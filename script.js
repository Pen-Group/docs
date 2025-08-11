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

  //Info boxes for displaying warnings or messages
  class infoBox extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.innerHTML = `<p style="margin:0;padding:0;">${this.innerHTML}</p>`;

      this.style.display = "block";
      this.style.padding = "8px";
      this.style.margin = "8px 0";
      this.style.borderRadius = "8px";
      
      if (this.getAttribute("color")) {
        this.style.background = `${this.getAttribute("color")}3e`;
        this.style.border = `1px solid ${this.getAttribute("color")}9a`;
      }
      else {
        this.style.background = "rgba(0, 149, 255, 0.245)";
        this.style.border = "1px solid rgba(0, 149, 255, 0.604)";
      }
    }
  }
  
  customElements.define("info-box", infoBox);

  //Svg that is embedded and can be edited with CSS
  class embeddedSVG extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      console.log("Hello world")
      console.log(this.getAttribute("src"));
      fetch(this.getAttribute("src")).then(response => response.text()).then(text => {
        this.innerHTML = text;
      })
    }
  }
  
  customElements.define("embedded-svg", embeddedSVG);

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
