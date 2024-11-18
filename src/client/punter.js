import fetch from 'node-fetch';
import 'dotenv/config';

const config = {
    hookerURL: process.env.HOOK_URL || 'https://hyperdata.it/cathouse',
    punter: process.env.PUNTER || 'john',
    punterPass: process.env.PUNTER_PASS || 'tennants'
};

async function pullRepo() {
    const credentials = Buffer.from(`${config.punter}:${config.punterPass}`).toString('base64');

    try {
        const response = await fetch(config.hookerURL, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ command: 'pull' })
        });

        const data = await response.json();
        console.log(`Status code: ${response.status}`);
        console.log(data);
        return response.status === 200;
    } catch (error) {
        console.error('Error:', error.message);
        return false;
    }
}

// Command line handling
const command = process.argv[2];
if (command === 'pull') {
    pullRepo();
} else {
    console.log('Usage: node punter.js pull');
}