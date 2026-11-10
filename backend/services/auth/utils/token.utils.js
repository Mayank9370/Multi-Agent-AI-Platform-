/**
 * @file utils/token.utils.js
 * @deprecated
 *
 * This file has been superseded by the services layer. Its responsibilities
 * have been redistributed as follows:
 *
 *   generateRefreshToken() → services/token.service.js (issueTokenPair)
 *   hashToken()            → services/token.service.js (internal — not exported)
 *   generateSessionId()    → services/token.service.js (internal — not exported)
 *
 * This file is no longer imported by anything and will be deleted in a
 * future cleanup pass.
 */