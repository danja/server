const express = require('express');
const { exec } = require('child_process');
const basicAuth = require('express-basic-auth');

const app = express();
app.use(express.json());

app.use(basicAuth({
    users: { [process.env.PUNTER || 'john']: process.env.PUNTER_PASS || 'tennants' }
}));

app.post('/cathouse', (req, res) => {
    console.log('Received request:', req.body);  // Debug log

    if (req.body.command !== 'pull') {
        return res.json({ error: 'Invalid command' });
    }

    exec('cd /home/www/danny.ayers.name && git pull', (error, stdout, stderr) => {
        if (error) {
            console.error('Error:', error);
            return res.json({ error: error.message });
        }
        res.json({
            status: 'success',
            output: stdout,
            error: stderr
        });
    });
});

app.listen(3040, '127.0.0.1', () => console.log('Service running on 3040'));