#!/bin/bash

# Generate Alice's RSA key pair
openssl genrsa -out alice_private.pem 2048
openssl rsa -in alice_private.pem -pubout -out alice_public.pem

# Generate Bob's RSA key pair
openssl genrsa -out bob_private.pem 2048
openssl rsa -in bob_private.pem -pubout -out bob_public.pem

echo "RSA keys for Alice and Bob have been generated."
