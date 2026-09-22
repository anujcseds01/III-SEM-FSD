const fs=require('fs');
//file create
fs.writeFile('example.txt','Hello World i am ankit singer ',(err)=>{
    if(err) throw err;
    console.log('File created');
});

//sync file create
fs.writeFileSync('example2.txt','Hello World 2');
console.log('File created synchronously');

//file read
fs.readFile('example.txt','utf8',(err,data)=>{
    if(err) throw err;
    console.log(data);
});

//sync file read
const data=fs.readFileSync('example2.txt','utf8');
console.log(data);

//replace file content
fs.readFile('example.txt','utf8',(err,data)=>{
    if(err) throw err;
    const newData=data.replace('World','Node.js');
    fs.writeFile('example.txt',newData,(err)=>{
        if(err) throw err;
        console.log('File content replaced');
    });
});

//delete file
fs.unlink('example2.txt',(err)=>{
    if(err) throw err;
    console.log('File deleted');
});

//append file content
fs.appendFile('example.txt','\nThis is an appended text.',(err)=>{
    if(err) throw err;
    console.log('File content appended');
});


//modern style promises
const fsPromises=require('fs').promises;