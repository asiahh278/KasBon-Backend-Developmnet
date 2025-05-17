// In-memory token blacklist
const blacklistedTokens = new Set();

class TokenService {
  blacklistToken(token) {
    blacklistedTokens.add(token);
  }

  isBlacklisted(token) {
    return blacklistedTokens.has(token);
  }
}

module.exports = new TokenService(); 