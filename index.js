let hashing = require('./hashing');
let BlockClass = require('./block.js');
const block = new BlockClass.Block('Test Block');
const data1 = "Blockchain Rock!";
const dataObject = {
	id: 1,
  	body: "With Object Works too",
  	time: new Date().getTime().toString().slice(0,-3)
};

hashing.sha(data1);
hashing.sha(dataObject);
block.generateHash().then((result)=>{
console.log(`Block Hash: ${result.hash} \n`);
console.log(`Block: ${JSON.stringify(result)} \n`);
}
).catch(
(error)=>{
console.log(error);
}
);
