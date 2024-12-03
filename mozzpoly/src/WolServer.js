import express from 'express';
import wol from 'wake_on_lan';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import winston from 'winston';

const __dirname = dirname(fileURLToPath(import.meta.url));

export class WolServer {
    constructor(port = 3770) {
        this.port = port;
        this.app = express();
        this.targets = new Map();
        this.setupMiddleware();
        this.setupRoutes();

        // Add to constructor:
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
                new winston.transports.Console()
            ]
        });
    }

    setupMiddleware() {
        this.app.use(express.static(join(__dirname, '../public')));
        this.app.use(express.json());
    }

    setupRoutes() {
        this.app.post('/wake', (req, res) => this.handleWakeRequest(req, res));
        this.app.get('/targets', (req, res) => this.getTargets(req, res));
    }

    addTarget(name, macAddress, ip) {
        this.targets.set(name, { macAddress, ip });
    }

    async handleWakeRequest(req, res) {
        const { targetName } = req.body;
        const target = this.targets.get(targetName);

        if (!target) {
            return res.status(404).json({ error: 'Target not found' });
        }

        try {
            await this.sendWakePacket(target);
            res.json({ message: `Wake packet sent to ${targetName}` });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getTargets(req, res) {
        const targetList = Array.from(this.targets.keys());
        res.json({ targets: targetList });
    }

    sendWakePacket(target) {
        return new Promise((resolve, reject) => {
            const options = {
                address: target.ip,
                port: 9
            };

            wol.wake(target.macAddress, options, (error) => {
                if (error) reject(new Error('Failed to send wake packet'));
                else resolve();
            });
        });
    }

    start() {
        return new Promise((resolve) => {
            this.server = this.app.listen(this.port, () => {
                console.log(`Server running on port ${this.port}`);
                resolve();
            });
        });
    }

    stop() {
        return new Promise((resolve) => {
            if (this.server) {
                this.server.close(() => resolve());
            } else {
                resolve();
            }
        });
    }
}