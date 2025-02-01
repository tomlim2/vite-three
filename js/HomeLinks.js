const linkInfoList = [
  ["p5-form-1", "p5", "form-1", "250131"],
  ["p5-abstract-1", "p5", "abstract-1", "250130"],
  ["p5-divide-box-1", "p5", "divide-box-1", "250118"],
  ["p5-divide-box-brush-1", "p5", "divide-box-brush-1", "250128"],
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
    const categoryLinkStructureList = [];
    if (documentLinkList) {
      for (let i; i < this.linkInfoList.length; i++) {
        const categoryName = i[1];
        const hasLinkStructure = categoryLinkStructureList.find(
          (categoryLinkStructure) =>
            categoryLinkStructure.categoryName === categoryName
        );

        if (hasLinkStructure) {
          hasLinkStructure.linkList.push(i);
        } else {
          categoryLinkStructureList.push({
            categoryName,
            linkList: [i],
          });
        }
      }

      // const toCategoryLinkList = categoryLinkStructureList.map(
      //   (categoryLinkStructure) => {
      //     const categoryName = categoryLinkStructure.categoryName;
      //     const linkList = categoryLinkStructure.linkList;
      //     const toARefList = linkList.map((linkInfoArray) => {
      //       const displayName = linkInfoArray[0];
      //       const href = this.makeHrefInnerPath(linkInfoArray);

      //       return this.createLinkNode(href, displayName);
      //     });

      //     return `<li>${categoryName}<ul>${toARefList.join("")}</ul></li>`;
      //   }
      // );
      console.log(categoryLinkStructureList, "documentLinkList");

      // documentLinkList.innerHTML = toCategoryLinkList.join("");
    }
  }
}

export default new LinkMakingTool(linkInfoList);
