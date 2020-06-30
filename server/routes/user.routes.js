const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('.././models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');
const requireLogin = require('../middleware/middleware')
router.get('/',(req,res)=>{
	res.send('hello');
})

router.get('/protected',(req,res)=>{
	res.send('hello world');
})

router.post('/signup',(req,res)=>{
	const {name,email,password}=req.body;
	if(!email || !password || !name){
		return res.status(422).json({error:"please add all the field"})
	}
	User.findOne({email:email})
	.then((savedUser)=>{
		if(savedUser){
			return res.status(422).json({error:'User already exist'});
		}
		bcrypt.hash(password,13)
			.then(hashedpassword=>{
			const user = new User({email,password:hashedpassword,name});
			user.save()
			.then((user)=>{
				res.json({message:"Saved successfully"});
			})
			.catch(err=>{
					console.log(err);
			})
		})
		
	})
	.catch((err)=>{
		console.log(err);
	})
})

router.post('/signin',(req,res)=>{
	const {email,password}=req.body;
	if(!email ||!password){
		return res.status(422).json({error:"Please provide email or password"});
	}
	User.findOne({email:email})
	.then(savedUser=>{
		if(!savedUser){
			return res.status(422).json({error:"Invalid Email or password"});
		}
		bcrypt.compare(password, savedUser.password)
		.then((match)=>{
			if(match){
			const token   = jwt.sign({_id:savedUser._id},JWT_SECRET);
			const {_id,name,email} = savedUser;
			return res.json({token,user:{_id,name,email}});
				//return res.json({message:"Successfully Sign in"});
			}
			return res.status(422).json({error:"Invalid Email or password"});
		})
		.catch(err=>{
			console.log(err);
		})
	})
})
module.exports = router;
