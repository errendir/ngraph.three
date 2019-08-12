import createGraphics from './createGraphics'
import createGraph from "ngraph.graph"
import data from "./data-anon.json"
import queryString from 'query-string'
var xArray = [];
var yArray = [];
Object.values(data).map(({x,y,z}) => {
  xArray.push(parseFloat(x));
  yArray.push(parseFloat(y));
})
const XMAX = Math.max(...xArray);
const XMIN = Math.min(...xArray);
const YMAX = Math.max(...yArray);
const YMIN = Math.min(...yArray);

function main () {
  var query = queryString.parse(window.location.search.substring(1));
  // var graph = getGraphFromQueryString(query);
  const graph = createGraph()
  const keyToPos = {}
  Object.entries(data).map(([key, { x, y, z }]) => {
    graph.addNode(key, {x,y});
    keyToPos[key] = { x: parseFloat(x)*10, y: parseFloat(y)*10, z: z*10 + Math.random()/1 }
  })
  const realLayout = {
    step() {},
    dispose() {},
    getNodePosition(nodeId) {
      return keyToPos[nodeId]
    }
  }
  var graphics = createGraphics(graph, realLayout, {interactive: true});
  var THREE = graphics.THREE;
  graphics.createNodeUI(function (d) {
    var size = Math.random() * 10 + 1;
    // var nodeGeometry = new THREE.CircleGeometry(size/2, 32);
    var nodeGeometry = new THREE.SphereGeometry(size/2, 7, 7);
    var nodeMaterial = new THREE.MeshBasicMaterial({ color: getNiceColor(d.data.x, d.data.y) });
    return new THREE.Mesh(nodeGeometry, nodeMaterial);
  })

  graphics.run(); // begin animation loop:
  graphics.camera.position.z = getNumber(query.z, 400);
};

function getNumber(string, defaultValue) {
  var number = parseFloat(string);
  return (typeof number === 'number') && !isNaN(number) ? number : (defaultValue || 10);
}

var niceColors = [
  0x1f77b4, 0xaec7e8,
  0xff7f0e, 0xffbb78,
  0x2ca02c, 0x98df8a,
  0xd62728, 0xff9896,
  0x9467bd, 0xc5b0d5,
  0x8c564b, 0xc49c94,
  0xe377c2, 0xf7b6d2,
  0x7f7f7f, 0xc7c7c7,
  0xbcbd22, 0xdbdb8d,
  0x17becf, 0x9edae5
];
var colorMap = [
[0x00ffff,0x00ffeb,0x00ffd7,0x00ffc3,0x00ffad,0x00ff98,0x00ff81,0x00ff69,0x00ff53,0x00ff3f,0x00ff2c],
[0x00e9ff,0x09efef,0x12f5df,0x17facc,0x17fcb6,0x17fea0,0x17fc84,0x17fa68,0x17f74f,0x17f03b,0x17ea28],
[0x00d3ff,0x12e0f3,0x24ece7,0x2ef5d6,0x2ef9bf,0x2efea8,0x2efa88,0x2ef667,0x2eef4b,0x2ee238,0x2ed624],
[0x00bbff,0x17caf6,0x2ed9ee,0x40e4e0,0x49eac8,0x53efb1,0x52eb8d,0x50e567,0x4edd47,0x4bcd34,0x48be20],
[0x009fff,0x17adfa,0x2ebbf6,0x49c4ea,0x68c9d3,0x87cebd,0x85ca93,0x7ec567,0x77be43,0x6eb030,0x65a21c],
[0x0083ff,0x178ffe,0x2e9cfe,0x53a5f4,0x87a9de,0xbcadc9,0xb7aa9a,0xaca667,0xa09f3f,0x91922c,0x828518],
[0x0064ff,0x176cfb,0x2e75f8,0x527aeb,0x857dd2,0xb77fb9,0xc17d8c,0xc47b5e,0xc07638,0xaa6e26,0x946614],
[0x0046ff,0x1749f7,0x2e4cf0,0x504fdf,0x7e50c2,0xac51a6,0xc4507d,0xda4f53,0xdf4d31,0xc24a20,0xa54710],
[0x002bff,0x172bf3,0x2e2be8,0x4e2bd4,0x772bb5,0xa02b96,0xc02b71,0xdf2b4b,0xeb2b2c,0xd32b1c,0xba2b0c],
[0x0017ff,0x1717ef,0x2e17df,0x4b17c9,0x6e17ab,0x91178d,0xaa176b,0xc21749,0xd3172c,0xd4171a,0xd61708],
[0x0004ff,0x1704ea,0x2e04d5,0x4804bd,0x6504a1,0x820485,0x940466,0xa50446,0xba042b,0xd60418,0xf10405]];

function getNiceColor(x,y) {
  x = Math.floor((x - XMIN)/(XMAX-XMIN)*(colorMap.length -1));
  y = Math.floor((y - YMIN)/(YMAX-YMIN)*(colorMap.length - 1));
  return colorMap[x][y];
  //return niceColors[(Math.random() * niceColors.length)|0];
}


main()