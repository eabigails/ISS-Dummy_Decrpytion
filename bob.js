const crypto = require("crypto");
const fs = require("fs");

// Load Bob's private key and Alice's public key
const bobPrivateKey = fs.readFileSync("bob_private.pem", "utf8");
const alicePublicKey = fs.readFileSync("alice_public.pem", "utf8");

// Read the encrypted message and signature from file
const [signature, encryptedMessageHex] = fs.readFileSync("encrypted_message.txt", "utf8").split("\n");
const encryptedMessage = Buffer.from(encryptedMessageHex, "hex");

// Step 1: Decrypt the message using Bob's private key
const decryptedMessage = crypto.privateDecrypt(
  { key: bobPrivateKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
  encryptedMessage
);
console.log("Message:", decryptedMessage.toString("utf8"));

// Step 2: Verify the signature using Alice's public key
const verifier = crypto.createVerify("sha256");
verifier.update(decryptedMessage);
verifier.end();
const isVerified = verifier.verify(alicePublicKey, signature, "hex");
console.log("Signature Verification:", isVerified);
