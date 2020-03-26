const express = require('express');
const path    = require('path');
const zxcvbn  = require(path.join(__dirname, 'zxcvbn'));

const router  = express.Router();

const get_strength = async (req, res, next) => {
    try {
        var passwordHex = req.params.passwordHex;
        console.log("###########");
        console.log("Converting Hex to ASCII...");
        var password = "";
        for (let index = 0; index < passwordHex.length - 1; index+=2)
            password += String.fromCharCode(parseInt(passwordHex.substring(index, index + 2), 16));
        console.log("Testing password strength of password...");
        const test_result = zxcvbn(password, user_inputs=[]);
        console.log("Result:");
        if (test_result)
            console.log("Successful!");
        else
            console.log("No data returned!");
        console.log("###########");
        console.log("");
        res.json(test_result);
    } catch (error) {
        console.log("Error while testing: " + error);
        next(error);
    }
};

router
  .route('/api/v1/strength/:passwordHex(*)')
  .get(get_strength);

module.exports = router;
