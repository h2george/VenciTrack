const crypto = require('crypto');

// Generate a 64-character (32-byte) hex string
const secret = crypto.randomBytes(32).toString('hex');

console.log('---------------------------------------------------');
console.log('✅ Generated Secure Secret (Copy the line below):');
console.log('---------------------------------------------------');
console.log(secret);
console.log('---------------------------------------------------');
console.log('Paste this into your .env file as NEXTAUTH_SECRET');
