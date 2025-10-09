const linkDefinitions = [
  { displayName: "just wander", path: ["three", "projects", "just-wander"], lastUpdated: "251008" },
  { displayName: "basic", path: ["three", "boiler-plates", "basic"], lastUpdated: "250130" },
  { displayName: "shader", path: ["three", "boiler-plates", "shader"], lastUpdated: "250130" },
  { displayName: "bezierCurves", path: ["three", "bezierCurves"], lastUpdated: "250417" },
  { displayName: "shaders", path: ["three", "shaders", "1-shaders"], lastUpdated: "250403" },
  { displayName: "shader-patterns-1", path: ["three", "shaders", "2-shader-patterns"], lastUpdated: "250406" },
  { displayName: "three-setup", path: ["three", "glsl", "setup"], lastUpdated: "250130" },
  { displayName: "typo-1", path: ["three", "projects", "typo-1"], lastUpdated: "250528" },
  { displayName: "coffee-smoke", path: ["three", "projects", "coffee-smoke"], lastUpdated: "250528" },
  { displayName: "p5-form-1", path: ["p5", "form-1"], lastUpdated: "250131" },
  { displayName: "p5-bounce-boxes-1", path: ["p5", "bounce-boxes-1"], lastUpdated: "250420" },
  { displayName: "p5-abstract-1", path: ["p5", "abstract-1"], lastUpdated: "250130" },
  { displayName: "p5-abstract-2", path: ["p5", "abstract-2"], lastUpdated: "250211" },
  { displayName: "p5-abstract-3", path: ["p5", "abstract-3"], lastUpdated: "250302" },
  { displayName: "p5-abstract-4", path: ["p5", "abstract-4"], lastUpdated: "250502" },
  { displayName: "p5-abstract-5", path: ["p5", "abstract-5"], lastUpdated: "250521" },
  { displayName: "p5-abstract-6-random-line", path: ["p5", "abstract-6-random-line"], lastUpdated: "250521" },
  { displayName: "p5-typo-1", path: ["p5", "abstract-5"], lastUpdated: "250528" },
  { displayName: "p5-divide-box-1", path: ["p5", "divide-box-1"], lastUpdated: "250118" },
  { displayName: "p5-divide-box-2", path: ["p5", "divide-box-2"], lastUpdated: "250419" },
  { displayName: "p5-divide-box-brush-1", path: ["p5", "divide-box-brush-1"], lastUpdated: "250128" },
  { displayName: "p5-motion-1-fragment", path: ["p5", "motion-1-fragment"], lastUpdated: "000000" },
  { displayName: "p5-motion-1-2025", path: ["p5", "motion-1-2025"], lastUpdated: "000000" },
  { displayName: "p5-rain-splash-1", path: ["p5", "rain-splash-1"], lastUpdated: "000000" },
  { displayName: "p5-rain-splash-2", path: ["p5", "rain-splash-2"], lastUpdated: "000000" },
  { displayName: "p5-rolling-squares-1", path: ["p5", "rolling-squares-1"], lastUpdated: "250117" },
  { displayName: "p5-petal-1", path: ["p5", "petal-1"], lastUpdated: "000000" },
  { displayName: "pokemon-card", path: ["etc", "pokemon-card"], lastUpdated: "000000" },
];

class LinkMakingTool {
  constructor(linkDefinitions) {
    this.linkDefinitions = linkDefinitions.map((definition) => ({ ...definition }));
  }

  buildHref(pathSegments) {
    return `/pages/${pathSegments.join("/")}/index.html`;
  }

  createLinkNode({ displayName, path }) {
    const href = this.buildHref(path);
    return `<li><a href="${href}">${displayName}</a></li>`;
  }

  createCategoryNode(categoryName, linkNodes) {
    return `<li class="li-category"><span>${categoryName}</span><ul>${linkNodes.join("")}</ul></li>`;
  }

  groupLinksByCategory() {
    return this.linkDefinitions.reduce((groups, definition) => {
      const [categoryName] = definition.path;
      if (!groups.has(categoryName)) {
        groups.set(categoryName, []);
      }
      groups.get(categoryName).push(definition);
      return groups;
    }, new Map());
  }

  render() {
    const documentLinkList = document.getElementById("work-list");
    if (!documentLinkList) {
      return;
    }

    const groupedLinks = this.groupLinksByCategory();
    const homeLinkNodes = Array.from(groupedLinks.entries()).map(
      ([categoryName, definitions]) => {
        const linkNodes = definitions.map((definition) =>
          this.createLinkNode(definition)
        );
        return this.createCategoryNode(categoryName, linkNodes);
      }
    );

    documentLinkList.innerHTML = homeLinkNodes.join("");
  }
}

export default new LinkMakingTool(linkDefinitions);