const express = require('express');
const { exec } = require('child_process');
const basicAuth = require('express-basic-auth');

const app = express();
app.use(express.json());

// Basic auth middleware
app.use(basicAuth({
    users: { 'webhook': process.env.PUNTER_PASS || 'tennants' },
    challenge: true
}));

const REPO_PATH = '/home/www/danny.ayers.name';

app.post('/cathouse', (req, res) => {
    if (req.body.command !== 'pull') {
        return res.status(400).json({ error: 'Invalid command' });
    }

    exec(`cd ${REPO_PATH} && git pull`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            return res.status(500).json({ error: 'Command execution failed' });
        }
        res.json({ status: 'success', output: stdout });
    });
});

app.listen(3040, '127.0.0.1');