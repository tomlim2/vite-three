import HomeLinks from "/js/homeLinks.js";

function main() {
  const homeNav = document.createElement("div");
  homeNav.innerHTML =
    '<nav id="nav"><ul class="links"><li><a class="home" href="/index.html">home</a></li><li><a class="main" href="index.html">go to portfolio</a></li></ul></nav>';
  document.body.appendChild(homeNav);
  HomeLinks.render();
}
main();
