const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const History = require('../Models/History')
const User = require('../Models/User')
const fetchuser = require('../middleware/fetchtoken');
const { body, validationResult } = require("express-validator");



router.post("/SaveHistory",
body("name", "You can Use English Alphabets only in Name").isAlpha('en-US', {ignore: ' '}).isLength({ min: 5 }),
body("amount", "invaild amount").isNumeric(),
fetchuser , async (req, res) => {

	try {

			// checking user input fileds

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
			return res.status(403).json({ ValidationErrors: errors.array() , "error":"True" , "msg":" Syntax error" });
			};

			const usersId = req.data.Userinfo.id;

			const dem = await User.findOne({_id:usersId});
			if(dem.type !== "Bill-Generator"){return res.status(401).json({"error":"true","msg":"Authentication error"})}; 

			// save data of user

			const userid = req.data.Userinfo.id;

			const { name, amount, due , generate } = req.body;

			const billdata = { user: userid , name, amount, due , generate  };

			await History.create(billdata);
			return res.json({ "error": "false", "msg": "Data added succesfully" });

	} catch (error) {
		return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
	};


});


// endpoints for  get history of financial yaer 

router.post("/GetHistory",
fetchuser , async (req, res) => {

	try {
			const start_date_of_the_year = req.body.start;
			const end_date_of_the_year = req.body.end;
			const filter_stage = {
				$match: {
					generate: {
					$gte: new Date(start_date_of_the_year),
					$lte: new Date(end_date_of_the_year),
				},
				},
			};
			const timeline = [filter_stage];
			const response = await History.aggregate(timeline);

			if(response.length > 0 ){
				return res.json({"error":"false", response , "msg":"" });
			} else {
				return res.json({"error":"false", response , "msg":"No data avilable" });
			}


	} catch (error) {
		return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
	}

});

router.get("/LastHistory",
fetchuser , async (req, res) => {

	try {
				const response = await History.find({}).sort({ data:1}).limit(1);
			    return res.json({"error":"false", "data": response[0] });

		} catch (error) {
			return res.status(500).json({ "error": error.message, "msg": "Intarnal server error" });
		}
		
});

module.exports = router