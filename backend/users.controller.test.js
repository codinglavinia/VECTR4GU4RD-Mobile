import { getUsers } from '../controllers/users.controller.js';

// Mock Firebase
jest.mock('../firebase.js', () => ({
  db: {
    collection: jest.fn(),
  },
}));

import { db } from '../firebase.js';

describe('Users Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      user: { uid: 'test-user-123' },
    };
    res = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [
        { uid: 'user1', email: 'user1@test.com', role: 'admin' },
        { uid: 'user2', email: 'user2@test.com', role: 'analyst' },
      ];

      const mockSnapshot = {
        docs: [
          { data: () => mockUsers[0] },
          { data: () => mockUsers[1] },
        ],
      };

      db.collection.mockReturnValue({
        get: jest.fn().mockResolvedValue(mockSnapshot),
      });

      await getUsers(req, res);

      expect(db.collection).toHaveBeenCalledWith('users');
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it('should return empty array when no users exist', async () => {
      const mockSnapshot = { docs: [] };

      db.collection.mockReturnValue({
        get: jest.fn().mockResolvedValue(mockSnapshot),
      });

      await getUsers(req, res);

      expect(res.json).toHaveBeenCalledWith([]);
    });

    it('should handle large user lists', async () => {
      const mockUsers = Array.from({ length: 1000 }, (_, i) => ({
        uid: `user${i}`,
        email: `user${i}@test.com`,
      }));

      const mockSnapshot = {
        docs: mockUsers.map(user => ({ data: () => user })),
      };

      db.collection.mockReturnValue({
        get: jest.fn().mockResolvedValue(mockSnapshot),
      });

      await getUsers(req, res);

      expect(res.json).toHaveBeenCalledWith(mockUsers);
      expect(res.json.mock.calls[0][0].length).toBe(1000);
    });

    it('should preserve user data structure', async () => {
      const mockUser = {
        uid: 'user123',
        email: 'test@example.com',
        role: 'analyst',
        department: 'Security',
        status: 'active',
      };

      const mockSnapshot = {
        docs: [{ data: () => mockUser }],
      };

      db.collection.mockReturnValue({
        get: jest.fn().mockResolvedValue(mockSnapshot),
      });

      await getUsers(req, res);

      expect(res.json).toHaveBeenCalledWith([mockUser]);
    });
  });
});
