
const https = require('https');

// Allow self-signed certs
const agent = new https.Agent({
    rejectUnauthorized: false
});

function post(path, data) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            },
            agent: agent
        };

        const req = https.request(options, res => {
            let body = '';
            res.on('data', d => body += d);
            res.on('end', () => resolve(JSON.parse(body)));
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

function get(path, token) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            agent: agent
        };

        const req = https.request(options, res => {
            let body = '';
            res.on('data', d => body += d);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(JSON.parse(body));
                } else {
                    resolve({ error: res.statusCode, body });
                }
            });
        });

        req.on('error', reject);
        req.end();
    });
}

(async () => {
    console.log("1. Logging in...");
    const loginData = JSON.stringify({ email: "admin@gmail.com", password: "123456" });
    const loginRes = await post('/api/login', loginData);

    if (loginRes.token) {
        console.log("Login Success! Token received.");
        console.log("Token:", loginRes.token.substring(0, 20) + "...");

        console.log("\n2. Accessing Profile...");
        const profileRes = await get('/api/profile', loginRes.token);
        console.log("Profile Response:", profileRes);

        if (profileRes.user && profileRes.user.email === "admin@gmail.com") {
            console.log("\nSUCCESS: Verification complete.");
        } else {
            console.log("\nFAILED: Profile did not return expected user.");
        }
    } else {
        console.log("Login Failed:", loginRes);
    }
})();
