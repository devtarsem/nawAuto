const { PythonShell}=require('python-shell');


exports.searchEngine = async (req, res, next)=>{
    const {input_search} = req.body
    let options={
        scriptPath:"",
        args:[input_search],
    }
    PythonShell.run(`${__dirname}/../snake/pythonSearch.py`,options,(err,output)=>{
        //  var temp_lst=res[0];
        //document.getElementById('ttstravel').value=res[0];
        console.log(output);
        res.status(200).send({
            status : 'ok',
            data : {
                out : output
            }
        })
    }); 
}



// x=searchFunction("b");
