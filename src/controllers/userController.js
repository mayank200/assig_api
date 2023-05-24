
const db = require('../models/index')
var jwt = require("jsonwebtoken");
const utils = require('../utils/index');
const path = require('path');
const e = require('express');
const login = require('../JsonObjects/logindetails.json')


exports.login = async (req, res) => {
  try {

    const {name, id, pass} = req.body;

    login_status = false;

    login.map(el=>{
      if(el.user == id && el.pass == pass){
        login_status = true;
      }
    })

   user_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
   user_browser = req.useragent.browser;

  if(login_status && name!=undefined && name!=''){

    token = jwt.sign({
      name: name,
      userid: id,
      permision: 'W',
      language: 'EN',
    }, process.env.Secret, {                 
      expiresIn: 3600 // 1 hours
    });
    res.status(200).send({
      status: login_status,
      token: token
    });

  }
     
    // end of then
  } catch (error) {
    console.log(error)
    res.status(200).send({ 'status': false, 'msg': error });
  }
};

exports.crud_operation = async (req, res) => {
  try {

    const body = req.body;

    let action = body.action;

    // let user_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // let user_browser = req.useragent.browser;

    if(action='create'){

      db.sequelize.query(`INSERT INTO public.products(name, category, cost, description, createdon) VALUES ( ?, ?, ?, ?, now()::timestamp);` ,
      { replacements: [body.name.toSting(), body.category.toSting(), body.cost.toString(), body.description.toString()] }, { type: db.sequelize.QueryTypes.SELECT })
      .then(temp => {
        result = JSON.parse(JSON.stringify(temp[0]));

        res.status(200).send({ 'status': true, 'msg': 'Product Inserted' });

      }).catch(e=>{
        console.log(e)
      })

    } else if(action='update'){

      db.sequelize.query(`UPDATE public.products SET name=?, category=?, cost=?, description=? WHERE id=?;` ,
      { replacements: [body.name, body.category, body.cost.toString(), body.description, Number(body.id)] }, { type: db.sequelize.QueryTypes.SELECT })
      .then(temp => {
        result = JSON.parse(JSON.stringify(temp[0]));

        res.status(200).send({ 'status': true, 'msg': 'Product has been updated.' });

      }).catch(e=>{
        console.log(e)
      })

    } else if(action='get'){

      db.sequelize.query(`SELECT * from public.products WHERE id=?;` ,
      { replacements: [Number(body.id)] }, { type: db.sequelize.QueryTypes.SELECT })
      .then(temp => {
        result = JSON.parse(JSON.stringify(temp[0]));

        res.status(200).send({ 'status': true, 'data': result });

      }).catch(e=>{
        console.log(e)
      })

    } else if(action='getall'){

      db.sequelize.query(`SELECT * from public.products;` ,
      { replacements: [Number(body.id)] }, { type: db.sequelize.QueryTypes.SELECT })
      .then(temp => {
        result = JSON.parse(JSON.stringify(temp[0]));

        res.status(200).send({ 'status': true, 'data': result });

      }).catch(e=>{
        console.log(e)
      })

    } else if(action='delete'){

      db.sequelize.query(`DELETE FROM public.products WHERE id=?;` ,
      { replacements: [Number(body.id)] }, { type: db.sequelize.QueryTypes.SELECT })
      .then(temp => {
        result = JSON.parse(JSON.stringify(temp[0]));

        res.status(200).send({ 'status': true, 'msg': 'Product has been deleted.' });

      }).catch(e=>{
        console.log(e)
      })

    }
  
     

    // end of then
  } catch (error) {
    // console.log(error)
    res.status(200).send({ 'status': false, 'msg': error.msg, 'browser': user_browser });
  }
};


function generateOTP() {
  // Generate a random 6-digit number
  const otp = Math.floor(100000 + Math.random() * 900000);

  return otp.toString();
}
