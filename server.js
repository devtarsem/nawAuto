const mongoose = require('mongoose')
// const pandas = require('node-pandas')
// const translate = require('translate')
// const speech = require('simple-speech-recognition')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app')
// connection with our database
const connect = mongoose.connect(process.env.CONNECTION,{
    useNewUrlParser: true,
    
}).then(() => console.log('DB connection successful!'));


// translate.engine = "google";
// translate.key = process.env.DEEPL_KEY;
// const tr = async ()=>{
//   const text = await translate("Tarsem singh", "pn");
//   return text
// }
// console.log(tr)
// const file = pandas.readCsv('sample.csv')
// console.log(file)



const port = 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
