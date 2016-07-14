var contactlistController = function (app,db,mongo){

	app.get('/contactlist', function(req,res){

		console.log("Recive a get request");

		db.contactlist.find(function (err,docs){
			console.log(docs);
			res.json(docs);

		});

	});

	app.post('/contactlist',function(req,res){
		console.log(req.body);
		db.contactlist.insert(req.body,function(err,doc){
			res.json(doc);
		});


	});

	app.delete('/contactlist/:id',function(req,res){
		var id = req.params.id;
		console.log(id);
		db.contactlist.remove({_id: mongo.ObjectId(id)}, function(err,doc){
			res.json(doc);
		});

	});

	app.get('/contactlist/:id',function(req,res){

		var id = req.params.id;
		console.log(id);
		db.contactlist.findOne({_id: mongo.ObjectId(id)},function (err,doc){

			res.json(doc);

		});



	});

	app.put('/contactlist/:id',function(req,res){
		var id = req.params.id;
		console.log(req.body.name);
		db.contactlist.findAndModify(
			{query:{_id: mongo.ObjectId(id)}, 
			update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number }},
			new: true}, function(err, doc){
				res.json(doc);
			});


	});


}

module.exports = contactlistController;