const data = require("./data.json")
const anon_data = Object.fromEntries(Object.entries(data).map(([_key, value]) => ([Math.floor(Math.random()*100000), value])))

console.log(anon_data)