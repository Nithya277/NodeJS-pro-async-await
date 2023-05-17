const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve,reject) => {
        fs.readFile(file,(err,data) =>{
            if (err) reject('can not find file');
            resolve(data);
        });
    });
}

const writeFilePro = (file,data) =>{
    return new Promise((resolve,reject) =>{
        fs.writeFile(file,data,err=>{
            if (err) reject(err);
            resolve('sucess');
        });
    });
}

const getDogPic = async () =>{
    try{
        const data = await readFilePro('dog.txt');
        console.log(`breed ${data}`);

        const res1Pro =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2Pro =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3Pro =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const all = await Promise.all([res1Pro,res2Pro,res3Pro]);
        const img = all.map(e1 => e1.body.message);
        console.log(img);
        //console.log(res.body);

        await writeFilePro('dog-img.txt',img.join('\n'));
        console.log('File writtemn with new image');
    }
    catch (err){
        console.log(err);
        throw err;
    } 
    return 'Step 2:Image read'  
}

(async ()=>{
    try{
    console.log('Step 1:will read img');
    const x = await getDogPic();
    console.log(x);
    console.log('Step 3: Done');
    }
    catch (err){
        console.log('ERROR 💥');
    }
})();
/*console.log('Step 1:will read img');
getDogPic().then( (res)=>{
    console.log(res);
    console.log('Step 3: Done');
})
.catch (err => {
    console.log('ERROR 💥');
});*/


/*readFilePro('dog.txt')
.then(data =>{
    console.log(`breed ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
})
.then(res => {
    console.log(res.body);
    return writeFilePro('dog-img.txt',res.body.message);
})
.then( () =>{
    console.log('File writtemn with new image');
})
.catch(err => {
    console.log(`msg from catch block: ${err.message}`);
});*/