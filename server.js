const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const knex = require('knex');
const bcrypt = require('bcryptjs');
 

/////////////////////SERVER//////////////////////
const db = knex({
	client: 'pg',
	connection:{
		host : '127.0.0.1',
		user: 'postgres',
		password : 'devgruhk416',
		database : 'smart-brain'
	}
});

db.select('*').from('users').then(data => {
	console.log(data);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());



app.get('/', (req,res)=>{
	res.send(database.users);
})


app.post('/signin',(req,res)=>{
	db.select('email', 'hash').from('login')
	.where('email', '=', req.body.email)
	.then(data => {
		const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
		console.log(isValid);
		if(isValid){
			db.select('*').from('users')
      .where('email', '=', req.body.email)
      .then(user => {
      console.log(user);
      res.json(user[0])
      })
			.catch(err => res.status(400).json('unable to get user'))
		} else{
		res.status(400).json('wrong credentials')
	}})
	
})



app.post('/register',(req,res)=>{
    const {email, name, password} = req.body;
    const hash = bcrypt.hashSync(password);
    db.transaction(trx =>{
    	trx.insert({
    		hash: hash,
    		email: email,
    	})
    	.into('login')
    	.returning('email')
    	.then(loginemail => {
    		return trx('users')
      .returning('*')
      .insert({
    	  email: email,
    	  name: name,
    	  joined: new Date()
    })
      .then(user => {
    	  res.json(user[0]);
    })
      .catch(err => res.status(400).json('Unable to register'))
    	})
    	.then(trx.commit)
    .catch(trx.rollback)
    })

    
})

app.get('/profile/:id',(req,res)=>{
	const {id} = req.params;
	db.select('*').from('users').where({id})
	.then(user => {
		if(user.length){
    res.json(user[0])
  } else {
  	res.status(400).json('Not found')
  }
	})
	.catch(err => res.status(400).json('Not found'))
	
})

app.put('/image',(req,res)=>{
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0])
	})
	.catch(err => res.status(400).json('unable to get entries'))
	
})

/*bcrypt.hash("bacon", hash, function(err,res) {
     //hashing password
});
bcrypt.compare("veggies", hash, function(err,res) {
     //password check --> res = false
});
bcrypt.compare("bacon", hash, function(err,res){
	//password check --> res = false
});
bcryptjs Password Hashing
*/





app.listen(3000, ()=> {
	console.log('working');
});














