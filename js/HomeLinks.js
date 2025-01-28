const linkInfoList = [
  ["p5-divide-box-1", "p5", "divide-box-1", "250118"],
  ["p5-motion-1-fragment", "p5", "motion-1-fragment", "000000"],
  ["p5-motion-1-2025", "p5", "motion-1-2025", "000000"],
  ["p5-rain-splash-1", "p5", "rain-splash-1", "000000"],
  ["p5-rain-splash-2", "p5", "rain-splash-2", "000000"],
  ["p5-rolling-squares-1", "p5", "rolling-squares-1", "250117"],
  ["p5-petal-1", "p5", "petal-1", "000000"],
  ["pokemon-card", "etc", "pokemon-card", "000000"],
];

class LinkMakingTool {
  constructor(linkInfoList) {
    this.linkInfoList = linkInfoList;
  }

  createLinkNode(href, displayName) {
    return `<li><a href="${href}">${displayName}</a></li>`;
  }

  makeHrefInnerPath(linkInfoArray) {
    return `/${linkInfoArray[1]}/${linkInfoArray[2]}/index.html`;
  }

  renderLinks() {
    const documentLinkList = document.getElementById("work-list");
    if (documentLinkList) {
      const toARefList = this.linkInfoList.map((linkInfoArray) => {
        const displayName = linkInfoArray[0];
        const href = this.makeHrefInnerPath(linkInfoArray);
        
        return this.createLinkNode(href, displayName);
      });
      documentLinkList.innerHTML = toARefList.join("");
    }
  }
}

export default new LinkMakingTool(linkInfoList);
