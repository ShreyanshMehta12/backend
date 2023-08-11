const mongoose = require('mongoose')

const connectdb = ()=>{
    return mongoose.connect(process.env.DB_URL,{
        // useCreateIndex:true,
        // useNewUrlparser:true,
        // useUnifiedTopology:true
    }).then((data)=>{
        console.log(`Mongdb connected with server:${data.connection.host}`);
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = connectdb