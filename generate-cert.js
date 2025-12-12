const selfsigned = require('selfsigned');
const fs = require('fs');

const attrs = [{ name: 'commonName', value: 'localhost' }];
const options = { days: 365 };

(async () => {
    try {
        console.log("Generating certificates...");
        // Try await
        const pems = await selfsigned.generate(attrs, options);
        fs.writeFileSync('key.pem', pems.private);
        fs.writeFileSync('cert.pem', pems.cert);
        console.log('Certificates generated successfully (promise).');
    } catch (err) {
        console.error("Promise generation error:", err);
    }
})();
