const express = require('express');
const { exec } = require('child_process');
const basicAuth = require('express-basic-auth');

const app = express();
app.use(express.json());

console.log('Starting service...'); // Startup log

app.use(basicAuth({
    users: { 'punter': process.env.PUNTER_PASS || 'tennants' },
    challenge: true
}));

app.post('/cathouse', (req, res) => {
    console.log('Request received:', {
        auth: req.headers.authorization,
        body: req.body
    });

    if (req.body.command !== 'pull') {
        console.log('Invalid command');
        return res.json({ error: 'Invalid command' });
    }

    console.log('Executing git pull...');
    exec('cd /home/www/danny.ayers.name && git pull', (error, stdout, stderr) => {
        if (error) {
            console.error('Git error:', error);
            return res.json({ error: error.message });
        }
        console.log('Git output:', stdout);
        res.json({
            status: 'success',
            output: stdout,
            error: stderr
        });
    });
});

const port = 3040;
app.listen(port, '127.0.0.1', () => {
    console.log(`Service running on port ${port}`);
});