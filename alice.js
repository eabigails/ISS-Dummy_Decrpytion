const crypto = require("crypto");
const fs = require("fs");

// Load Alice's private key and Bob's public key
const alicePrivateKey = fs.readFileSync("alice_private.pem", "utf8");
const bobPublicKey = fs.readFileSync("bob_public.pem", "utf8");

// Message to be sent
const message = "I want some apples";

// Step 1: Sign the message using Alice's private key
const signer = crypto.createSign("sha256");
signer.update(message);
signer.end();
const signature = signer.sign(alicePrivateKey, "hex");
console.log("Signature:", signature);

// Step 2: Encrypt the message using Bob's public key
const encryptedMessage = crypto.publicEncrypt(
  { key: bobPublicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
  Buffer.from(message)
);
console.log("Message:", encryptedMessage.toString("hex"));

// Save output to a file for Bob to read
fs.writeFileSync("encrypted_message.txt", `${signature}\n${encryptedMessage.toString("hex")}`);
console.log("Message and signature sent to Bob.");
