const {PythonShell}=require("python-shell");
// const fs = require('fs')
// console.log(fs.readFileSync(`${__dirname}/../python/BadWordDataset.csv`, 'utf-8'))
// const input_types = document.querySelector('.input-types').value
// const language = document.querySelector('.lang').value
// const mic = document.querySelector('.mic').value
// const play = document.querySelector('.play').value
// const message = document.querySelector('.message')

exports.sendingChatData = (req,res,next) =>{
    const {input_types, language, mic, play} = req.body
    console.log(input_types,language,mic,play)
    let options={
        scriptPath:`${__dirname}/../snake`,
        args:[input_types,language,'off']
        // args:["account",'English','off'],
    
    }
    
    PythonShell.run('./../snake/badWord.py',options,(err,res)=>{
        if(err){
            console.log(err);
        }
        if(res){
            console.log(res);
        }
        let options2={
            scriptPath:"${__dirname}/../snake",
            //args:[res[0],'noo',res[1]]
            args:[res[0],'Yes',res[1]]
        
        }
        // message.textContent = options2.args[0]
        // alert(options2.args[0])
        PythonShell.run('./../snake/replyResponse.py',options2,(err,res2)=>{
                if(err){
                    console.log(err);
                }
                if(res2){
                    console.log(res2);
                }
        });
    
    });
    res.status(200).json({
        status : 'ok',
        data : {
            data : 'fucking'
        }
    })
    
    
    

}


