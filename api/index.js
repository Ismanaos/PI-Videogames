//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Videogame, Genre, Gender} = require('./src/db.js');
const getJson = require('./src/routes/getjson.js')
const {apikey} = process.env
function connectDbModels() {
  var arrayGame = []
  getJson(`https://api.rawg.io/api/genres?key=${apikey}`, async(err, data)=>{
    if(err){
      return err
    }else{
      try {
        for (let i = 0; i < data.results.length; i++) {
          const obj = await Genre.Genre.create({
          id: data.results[i].id,
            name: data.results[i].name
          })
          console.log(obj)
          arrayGame.push(obj)
        }
      } catch (error) {
        return error
      }
    }
  })
}
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
  console.log(Genre)
  try {
    
  } catch (error) {
    
  }
});
