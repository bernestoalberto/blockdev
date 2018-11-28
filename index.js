let hashing = require('./hashing');
const data1 = "Blockchain Rock!";
const dataObject = {
	id: 1,
  	body: "With Object Works too",
  	time: new Date().getTime().toString().slice(0,-3)
};

hashing.sha(data1);
hashing.sha(dataObject);