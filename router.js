const express = require('express');
const path    = require('path');
const zxcvbn  = require(path.join(__dirname, 'zxcvbn'));

const router  = express.Router();

const get_strength = async (req, res, next) => {
    try {
        const password = req.params.password;
        console.log("###########");
        console.log("Testing password strength of password...");
        const test_result = zxcvbn(password, user_inputs=[]);
        if (test_result){
        	console.log("Successful!");
        }
        else {
        	console.log("No data returned!");
        }
        console.log("###########");
        console.log("");
        res.json(test_result);
    } catch (error) {
        console.log("Error while testing: " + error);
        next(error);
    }
};

router
  .route('/api/v1/strength/:password')
  .get(get_strength);

module.exports = router;