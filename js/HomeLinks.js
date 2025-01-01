const linkInfoList = [
  ["p5-motion-1", "p5", "motion-1"],
  ["p5-motion-1-fragnent", "p5", "motion-1-fragnent"],
  ["pokemon-card", "etc", "pokemon-card"],
];

class LinkMakingTool {
  constructor(linkInfoList) {
    this.linkInfoList = linkInfoList;
  }

  createHTMLNode(href, displayName) {
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
        return this.createHTMLNode(href, displayName);
      });
      documentLinkList.innerHTML = toARefList.join("");
    }
  }
}

export default new LinkMakingTool(linkInfoList);
