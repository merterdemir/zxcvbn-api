# zxcvbn-api
Web API for password strength estimation with zxcvbn by Dropbox. Please read [this article](https://dropbox.tech/security/zxcvbn-realistic-password-strength-estimation) by Dan Wheeler. Based on the implementation of [zxcvbn](https://github.com/dropbox/zxcvbn) tool.

**Demo:** [Password Strength Estimation with zxcvbn](https://strength.merterdemir.com/)

## Building
Configure the `config.json` file according to your desired settings. By default, the server runs on 3000 Port, in `development` environment, and without `logging` any request. `yourdomain` should be equal to the domain you provide while creating your SSL signature:

```json
{
    "host": "localhost",
    "port": 3000,
    "env": "development",
    "yourdomain": "localhost",
    "logging": false
}
```

You can check out [this article](https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca) to see how to create SSL certificates with Let's Encrypt and deploy for NodeJS.

To install the dependencies and run the API server:

```bash
npm install
npm start
```

You should see an output like this:

```bash
added 56 packages from 39 contributors and audited 170 packages in 0.792s
found 0 vulnerabilities
```

```bash
> zxcvbn-api@1.0.0 start /path/to/zxcvbn-api
> node index.js

Web API Express Server started on Port 3000 | Environment : development
```

## Retrieving Password Strength Estimation Results

In order to retrieve the results zxcvbn provides, just make a `GET` request to your host. For example you can make your request to your local machine as:

```
https://localhost:3000/api/v1/strength/your_password
```

**Note:** Please note that I advise you to URL encode your password before making a GET request to API. In some cases lke that your password contains 
special characters such as ?, &, %, API might not be able to understand the given password.

API will return an JSON object which contains:

```json
{
	"password":"your_password",
	"guesses":10010000,
	"guesses_log10":7.000434077479318,
	"sequence":
		[
			{
				"pattern":"bruteforce",
				"token":"your_",
				"i":0,
				"j":4,
				"guesses":100000,
				"guesses_log10":5
			},
			{
				"pattern":"dictionary",
				"i":5,
				"j":12,
				"token":"password",
				"matched_word":"password",
				"rank":2,
				"dictionary_name":"passwords",
				"reversed":false,
				"l33t":false,
				"base_guesses":2,
				"uppercase_variations":1,
				"l33t_variations":1,
				"guesses":50,
				"guesses_log10":1.6989700043360185
			}
		],
		"calc_time":6,
		"crack_times_seconds":
		{
			"online_throttling_100_per_hour":360360000,
			"online_no_throttling_10_per_second":1001000,
			"offline_slow_hashing_1e4_per_second":1001,
			"offline_fast_hashing_1e10_per_second":0.001001
		},
		"crack_times_display":
		{
			"online_throttling_100_per_hour":"11 years",
			"online_no_throttling_10_per_second":"12 days",
			"offline_slow_hashing_1e4_per_second":"17 minutes",
			"offline_fast_hashing_1e10_per_second":"less than a second"
		},
		"score":2,
		"feedback":
		{
			"warning":"This is similar to a commonly used password",
			"suggestions":["Add another word or two. Uncommon words are better."]
		}
}
```

## Acknowledgements

Thanks to _Daniel Lowe Wheeler, Dropbox Inc._ for making this amazing work available to everyone. For more detailed information please review this [paper](https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/wheeler).