class linkInfo {
  constructor(displayName, categoryName, projectName) {
    this.displayName = displayName;
    this.categoryName = categoryName;
    this.projectName = projectName;
  }
  getLinkInfo() {
    return {
      displayName: this.displayName,
      linkPath:
        "/" + this.categoryName + "/" + this.projectName + "/index.html",
    };
  }
}

const linkInfoList = [
  new linkInfo("p5-motion-1", "p5", "motion-1").getLinkInfo(),
  new linkInfo("pokemon-card", "etc", "pokemon-card").getLinkInfo(),
];

function main() {
  const homeNav = document.createElement("div");
  homeNav.innerHTML =
    '<nav id="nav"><ul class="links"><li><a class="home" href="/index.html">home</a></li><li><a class="main" href="index.html">go to portfolio</a></li></ul></nav>';
  document.body.appendChild(homeNav);

  const documentLinkList = document.getElementById("work-list");
  if (documentLinkList) {
    const toARefList = linkInfoList.map((linkInfo) => {
      const innerHTML = `<li><a href="${linkInfo.linkPath}">${linkInfo.displayName}</a></li>`;
      return innerHTML;
    });
    documentLinkList.innerHTML = toARefList.join("");
  }
}
main();
