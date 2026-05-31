import { verifyToken } from '../midleware/auth.middleware.js';

// Mock Firebase auth
jest.mock('../firebase.js', () => ({
  auth: {
    verifyIdToken: jest.fn(),
  },
}));

import { auth } from '../firebase.js';

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('verifyToken', () => {
    it('should call next() when token is valid', async () => {
      const mockUser = { uid: 'test-user-123', email: 'test@example.com' };
      const mockToken = 'valid-jwt-token';

      req.headers.authorization = `Bearer ${mockToken}`;
      auth.verifyIdToken.mockResolvedValue(mockUser);

      await verifyToken(req, res, next);

      expect(auth.verifyIdToken).toHaveBeenCalledWith(mockToken);
      expect(req.user).toEqual(mockUser);
      expect(next).toHaveBeenCalled();
    });

    it('should return 403 when no token is provided', async () => {
      req.headers.authorization = undefined;

      await verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith('No token');
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 when authorization header is empty', async () => {
      req.headers.authorization = '';

      await verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith('No token');
    });

    it('should return 401 when token is invalid', async () => {
      const mockToken = 'invalid-token';
      req.headers.authorization = `Bearer ${mockToken}`;

      auth.verifyIdToken.mockRejectedValue(new Error('Invalid token'));

      await verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith('Invalid token');
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle tokens without Bearer prefix', async () => {
      const mockToken = 'valid-token-without-prefix';
      req.headers.authorization = mockToken;

      auth.verifyIdToken.mockResolvedValue({ uid: 'user123' });

      await verifyToken(req, res, next);

      // Token is split by space, so without "Bearer" it becomes empty or malformed
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should handle expired tokens', async () => {
      const mockToken = 'expired-token';
      req.headers.authorization = `Bearer ${mockToken}`;

      auth.verifyIdToken.mockRejectedValue(new Error('Token expired'));

      await verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith('Invalid token');
    });

    it('should correctly extract token from Authorization header', async () => {
      const mockToken = 'extracted-token-123';
      const mockUser = { uid: 'user123' };

      req.headers.authorization = `Bearer ${mockToken}`;
      auth.verifyIdToken.mockResolvedValue(mockUser);

      await verifyToken(req, res, next);

      expect(auth.verifyIdToken).toHaveBeenCalledWith(mockToken);
      expect(req.user).toEqual(mockUser);
      expect(next).toHaveBeenCalled();
    });

    it('should handle malformed Authorization header', async () => {
      req.headers.authorization = 'BearerInvalidFormat';

      await verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
    });
  });
});
