import { WolServer } from './WolServer.js';

const server = new WolServer();
server.addTarget('desktop', '00:e0:4c:d5:70:cf', '192.168.0.10');
server.start();