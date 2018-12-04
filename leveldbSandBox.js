/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

let level = require('level');
let chainDB = './chaindata';
let db = level(chainDB);
let  persistent= {
// Add data to levelDB with key/value pair
 addLevelDBData:(key,value)=>{
  return new Promise((resolve,reject)=>{
    db.put(key, value, (err)=> {
      
      if (err) {
        console.log( `Block ${key}  submission failed`, err);
      reject(err);
      }
      resolve(value);
    })
  });

},
getAllBlocks: ()=>{
  let dataArray  = [];
return new Promise((resolve,reject)=>{
  db.createReadStream()
  .on('data', function (data) {
    console.log(`Block # ${data.key} Hash : ${data.value} `)
      dataArray.push(data);
  })
  .on('error', function (err) {
      reject(err)
  })
  .on('close', function () {
      resolve(dataArray);
  });
});
},
// Get data from levelDB with key
 getLevelDBData: (key)=>{
   return new Promise((resolve, reject)=>{
    db.get(key, (err, value)=> {
      if (err) {
        console.log('Not found!', err);
      reject(err);
      }
      resolve(value);
    })
   })
},
// Add data to levelDB with value
 addDataToLevelDB :(block)=> {
    let i = 0;
  return new Promise((resolve,reject)=>{
    db.createReadStream().
    on('data', function(data) {
      i++;
    })
    .on('error', (err)=> {
      console.log('Unable to read data stream!', err);  
      reject(err);
    })
    .on('close', ()=> {
      // console.log(`Block #  ${i}`);
      persistent.addLevelDBData(block.height, block.hash).then((value)=>{
       resolve(value);
      }).catch((err)=>{
        reject(error);
      });
    });

  });
}
};
module.exports = persistent;