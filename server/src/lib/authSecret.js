// Signing key for admin and student sessions. Read and validated once at
// startup so a misconfigured deploy fails loudly instead of quietly signing
// tokens with a known default that anyone could forge.
const PLACEHOLDERS = ["dev-secret", "change_this_to_a_secure_random_value"];

const secret = process.env.AUTH_SECRET;

if (!secret || PLACEHOLDERS.includes(secret)) {
  throw new Error(
    "AUTH_SECRET is not set (or is still a placeholder). Refusing to start. " +
      "Generate one with: node -e \"console.log(require('crypto').randomBytes(48).toString('hex'))\"",
  );
}

module.exports = secret;
