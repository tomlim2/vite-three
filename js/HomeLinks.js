const linkInfoArrayList = [
  ["p5-form-1", "p5", "form-1", "250131"],
  ["p5-abstract-1", "p5", "abstract-1", "250130"],
  ["p5-abstract-2", "p5", "abstract-2", "250211"],
  ["p5-abstract-3", "p5", "abstract-3", "250302"],
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
  constructor(linkInfoArrayList) {
    this.linkInfoArrayList = linkInfoArrayList;
  }

  createLinkNode(href, displayName) {
    return `<li><a href="${href}">${displayName}</a></li>`;
  }

  createCategoryNode(categoryName, linkNodes) {
    return `<li class="li-category"><span>${categoryName}</span><ul>${linkNodes.join(
      ""
    )}</ul></li>`;
  }

  createHrefInnerPath(linkInfoArray) {
    return `/${linkInfoArray[1]}/${linkInfoArray[2]}/index.html`;
  }

  getSortLinkInfoArray() {
    const categoryLinkStructureList = [];
    for (let i = 0; i < this.linkInfoArrayList.length; i++) {
      const linkInfoArray = this.linkInfoArrayList[i];
      const categoryName = linkInfoArray[1];
      const hasLinkStructure = categoryLinkStructureList.find(
        (categoryLinkStructure) =>
          categoryLinkStructure.categoryName === categoryName
      );

      if (hasLinkStructure) {
        hasLinkStructure.linkList.push(linkInfoArray);
      } else {
        categoryLinkStructureList.push({
          categoryName,
          linkList: [linkInfoArray],
        });
      }
    }

    return categoryLinkStructureList;
  }

  render() {
    const documentLinkList = document.getElementById("work-list");

    if (documentLinkList) {
      const categoryLinkStructureList = this.getSortLinkInfoArray();
      const homeLinkNodes = categoryLinkStructureList.map(
        (categoryLinkStructure) => {
          const categoryName = categoryLinkStructure.categoryName;
          const linkList = categoryLinkStructure.linkList;
          const createdLinkNodes = linkList.map((linkInfoArray) => {
            const displayName = linkInfoArray[0];
            const href = this.createHrefInnerPath(linkInfoArray);

            return this.createLinkNode(href, displayName);
          });

          return this.createCategoryNode(categoryName, createdLinkNodes);
        }
      );

      documentLinkList.innerHTML = homeLinkNodes.join("");
    }
  }
}

export default new LinkMakingTool(linkInfoArrayList);
