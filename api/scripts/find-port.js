#!/usr/bin/env node

/**
 * Smart Port Finder for Development
 * Finds the first available port starting from a preferred port
 */

const net = require('net');

async function isPortAvailable(port) {
    return new Promise((resolve) => {
        const server = net.createServer();

        server.once('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                resolve(false);
            } else {
                resolve(false);
            }
        });

        server.once('listening', () => {
            server.close();
            resolve(true);
        });

        server.listen(port, '0.0.0.0');
    });
}

async function findAvailablePort(preferredPort, maxAttempts = 10) {
    const occupiedPorts = [];

    for (let i = 0; i < maxAttempts; i++) {
        const port = preferredPort + i;
        const available = await isPortAvailable(port);

        if (available) {
            if (occupiedPorts.length > 0) {
                console.log(`⚠️  Puerto preferido ${preferredPort} ocupado (también: ${occupiedPorts.join(', ')})`);
                console.log(`✓ Usando puerto alternativo: ${port}`);
            } else {
                console.log(`✓ Puerto ${port} disponible`);
            }
            return port;
        }

        occupiedPorts.push(port);
    }

    throw new Error(`No se encontró ningún puerto disponible entre ${preferredPort} y ${preferredPort + maxAttempts - 1}`);
}

// Si se ejecuta directamente
if (require.main === module) {
    const preferredPort = parseInt(process.argv[2] || '3000', 10);

    findAvailablePort(preferredPort)
        .then(port => {
            console.log(port); // Output solo el puerto para que pueda ser capturado
            process.exit(0);
        })
        .catch(err => {
            console.error(`❌ Error: ${err.message}`);
            process.exit(1);
        });
}

module.exports = { findAvailablePort, isPortAvailable };
