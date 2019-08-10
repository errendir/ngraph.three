const createThree = require('../../');
const graphGenerators = require('ngraph.generators');
const createGraph = require("ngraph.graph")
const data = require("../../data-anon.json")

function main () {
  var query = require('query-string').parse(window.location.search.substring(1));
  // var graph = getGraphFromQueryString(query);
  const graph = createGraph()
  const keyToPos = {}
  Object.entries(data).map(([key, { x, y, z }]) => {
    graph.addNode(key);
    keyToPos[key] = { x: parseFloat(x), y: parseFloat(y), z: z + Math.random()/1 }
  })
  const realLayout = {
    step() {},
    dispose() {},
    getNodePosition(nodeId) {
      return keyToPos[nodeId]
    }
  }
  var graphics = createThree(graph, realLayout, {interactive: true});
  var THREE = graphics.THREE;
  graphics.createNodeUI(function () {
    var size = Math.random() * 10 + 1;
    var nodeGeometry = new THREE.CircleGeometry(size/2, 32);
    var nodeMaterial = new THREE.MeshBasicMaterial({ color: getNiceColor() });
    return new THREE.Mesh(nodeGeometry, nodeMaterial);
  })

  graphics.run(); // begin animation loop:
  graphics.camera.position.z = getNumber(query.z, 400);
};

function getGraphFromQueryString(query) {
  var createGraph = graphGenerators[query.graph] || graphGenerators.grid;
  return createGraph(getNumber(query.n), getNumber(query.m), getNumber(query.k));
}

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

function getNiceColor() {
  return niceColors[(Math.random() * niceColors.length)|0];
}


main()