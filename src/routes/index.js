const { response, request } = require('express');
const express = require('express');
const router = express.Router();

const dangerRegex = /[{<!'¡¿?"#$*+-/=%&()>}]+/;

const pool = require('../database');




router.get('/', async (req, res) => {
    const count = await pool.query('SELECT COUNT(*) FROM users');
    var jugadores = Object.values(count[0]);
    
    res.render('home', {jugadores});
});

router.post('/', async (req, res)=>{
    const { name , profession, password } = req.body;
    const newUser = {
        name,
        profession,
        password
    };

    if(dangerRegex.test(newUser.name) == true || newUser.name.length >20){
        console.log("NOT PASS LENGTH: " + newUser.name.length);
        console.log("DISAPPROVED: " + newUser);
        res.redirect('/');
    }
    else{
        res.redirect('/');
        console.log("PASSED: " + newUser);
        await pool.query('INSERT INTO users set ?', [newUser]);
    }
});



module.exports = router;

