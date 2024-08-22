import express from 'express';
import axios from 'axios';

const myServer = express()
const portUsed = 4500
const apiUrl = 'https://secrets-api.appbrewery.com';


const username = 'elvisnicho'
const password = 'NICHOLAS'
const apikey = '64b7022e-4620-4358-ac7f-221729d107d2'
const bearerToken = '01708048-e530-422f-8555-df7ed8727023'


myServer.use(express.static('public'))


myServer.get('/',(req,res)=>{
    res.render('index.ejs',{ content : "API Response"})
})  

myServer.get('/noAuth', async (req,res)=>{
    try{
        const result = await axios.get(apiUrl + '/random');
        res.render('index.ejs', { content : JSON.stringify(result.data)})
    }catch (error){
        res.status(404).send(error.message);
    }
})

myServer.get('/basicAuth', async(req,res)=>{
    try{
        const result = await axios.get(apiUrl + '/all?page=2',{
            auth: {
                username : username,
                password: password,
            },
        });
        res.render('index.ejs', { content : JSON.stringify(result.data)})
    }catch(error){
        res.status(404).send(error.mesage)
    }
});

myServer.get('/apiKey',async (req,res)=>{
    try{
        const result = await axios.get(apiUrl + '/filter',{
            params:{
                score:3,
                apikey:apikey
            },
        });
        res.render('index.ejs',{content: JSON.stringify(result.data)});
    }catch(error){
        res.status(404).send(error.message)
    }
})

const config = {
    headers : { Authorization : `Bearer ${bearerToken}`}
}

myServer.get('/bearerToken', async (req,res)=>{
    try{
        const result = await axios.get(apiUrl + '/secrets/2', config);
        res.render('index.ejs', { content : JSON.stringify(result.data)});
    }catch (error){
        res.status(404).send(error.message);
    }
});

myServer.listen(portUsed,()=>{
    console.log(`The server is currently running at port ${portUsed}`)
})