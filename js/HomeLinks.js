const linkInfoArrayList = [
	["basic", ["three", "boiler-plates", "basic"], "250130"],
	["shader", ["three", "boiler-plates", "shader"], "250130"],
	["bezierCurves", ["three", "bezierCurves"], "250417"],
	["shaders", ["three", "shaders", "1-shaders"], "250403"],
	["shaders", ["three", "shaders", "2-shader-patterns"], "250406"],
	["three-setup", ["three", "glsl", "setup"], "250130"],
	["typo-1", ["three", "projects", "typo-1"], "250528"],
	["p5-form-1", ["p5", "form-1"], "250131"],
	["p5-bounce-boxes-1", ["p5", "bounce-boxes-1"], "250420"],
	["p5-abstract-1", ["p5", "abstract-1"], "250130"],
	["p5-abstract-2", ["p5", "abstract-2"], "250211"],
	["p5-abstract-3", ["p5", "abstract-3"], "250302"],
	["p5-abstract-4", ["p5", "abstract-4"], "250502"],
	["p5-abstract-5", ["p5", "abstract-5"], "250521"],
	["p5-abstract-6-random-line", ["p5", "abstract-6-random-line"], "250521"],
	["p5-typo-1", ["p5", "abstract-5"], "250528"],
	["p5-divide-box-1", ["p5", "divide-box-1"], "250118"],
	["p5-divide-box-2", ["p5", "divide-box-2"], "250419"],
	["p5-divide-box-brush-1", ["p5", "divide-box-brush-1"], "250128"],
	["p5-motion-1-fragment", ["p5", "motion-1-fragment"], "000000"],
	["p5-motion-1-2025", ["p5", "motion-1-2025"], "000000"],
	["p5-rain-splash-1", ["p5", "rain-splash-1"], "000000"],
	["p5-rain-splash-2", ["p5", "rain-splash-2"], "000000"],
	["p5-rolling-squares-1", ["p5", "rolling-squares-1"], "250117"],
	["p5-petal-1", ["p5", "petal-1"], "000000"],
	["pokemon-card", ["etc", "pokemon-card"], "000000"],
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

  createHrefInnerPath([, dirStructure,]) {
    let path = "";
    for (let i = 0; i < dirStructure.length; i++) {
		path += `${dirStructure[i]}/`;
    }
	console.log(path);
    return `/pages/${path}index.html`;
  }

  getSortLinkInfoArray() {
    return this.linkInfoArrayList.reduce((acc, linkInfoArray) => {
      const path = linkInfoArray[1];
      const categoryName = path[0];
      const category = acc.find((cat) => cat.categoryName === categoryName);

      if (category) {
        category.linkList.push(linkInfoArray);
      } else {
        acc.push({ categoryName, linkList: [linkInfoArray] });
      }

      return acc;
    }, []);
  }

  render() {
    const documentLinkList = document.getElementById("work-list");

    if (documentLinkList) {
      const categoryLinkStructureList = this.getSortLinkInfoArray();
      const homeLinkNodes = categoryLinkStructureList.map(
        ({ categoryName, linkList }) => {
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