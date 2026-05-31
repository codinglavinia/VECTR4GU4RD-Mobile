import { login } from '../controllers/auth.controller.js';

// Mock Firebase auth
jest.mock('../firebase.js', () => ({
  auth: {
    createCustomToken: jest.fn(),
  },
}));

import { auth } from '../firebase.js';

describe('Auth Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: { uid: 'test-user-123' },
    };
    res = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return a token for valid uid', async () => {
      const mockToken = 'mock-jwt-token';
      auth.createCustomToken.mockResolvedValue(mockToken);

      await login(req, res);

      expect(auth.createCustomToken).toHaveBeenCalledWith('test-user-123');
      expect(res.json).toHaveBeenCalledWith({ token: mockToken });
    });

    it('should return 401 error when token creation fails', async () => {
      const errorMsg = 'Firebase error';
      auth.createCustomToken.mockRejectedValue(new Error(errorMsg));

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: errorMsg });
    });

    it('should handle missing uid', async () => {
      req.body = {};
      const errorMsg = 'uid is required';
      auth.createCustomToken.mockRejectedValue(new Error(errorMsg));

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('should handle empty uid', async () => {
      req.body = { uid: '' };
      const errorMsg = 'uid cannot be empty';
      auth.createCustomToken.mockRejectedValue(new Error(errorMsg));

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });
  });
});
