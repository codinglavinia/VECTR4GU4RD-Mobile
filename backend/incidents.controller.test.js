import { getIncidents, createIncident } from '../controllers/incidents.controller.js';

// Mock Firebase
jest.mock('../firebase.js', () => ({
  db: {
    collection: jest.fn(),
  },
}));

import { db } from '../firebase.js';

describe('Incidents Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe('getIncidents', () => {
    it('should return all incidents', async () => {
      const mockIncidents = [
        { id: '1', name: 'Incident 1', severity: 'high' },
        { id: '2', name: 'Incident 2', severity: 'medium' },
      ];

      const mockSnapshot = {
        docs: [
          { data: () => mockIncidents[0] },
          { data: () => mockIncidents[1] },
        ],
      };

      db.collection.mockReturnValue({
        get: jest.fn().mockResolvedValue(mockSnapshot),
      });

      await getIncidents(req, res);

      expect(db.collection).toHaveBeenCalledWith('incidents');
      expect(res.json).toHaveBeenCalledWith(mockIncidents);
    });

    it('should return empty array when no incidents exist', async () => {
      const mockSnapshot = { docs: [] };

      db.collection.mockReturnValue({
        get: jest.fn().mockResolvedValue(mockSnapshot),
      });

      await getIncidents(req, res);

      expect(res.json).toHaveBeenCalledWith([]);
    });

    it('should handle Firebase errors gracefully', async () => {
      db.collection.mockReturnValue({
        get: jest.fn().mockRejectedValue(new Error('Firebase error')),
      });

      try {
        await getIncidents(req, res);
      } catch (error) {
        expect(error.message).toBe('Firebase error');
      }
    });
  });

  describe('createIncident', () => {
    it('should create an incident with valid data', async () => {
      req.body = {
        timestamp: '2024-01-01T10:00:00Z',
        severity: 'high',
        type: 'anomaly',
      };

      const mockAdd = jest.fn().mockResolvedValue({ id: 'new-incident-1' });
      db.collection.mockReturnValue({ add: mockAdd });

      await createIncident(req, res);

      expect(db.collection).toHaveBeenCalledWith('incidents');
      expect(mockAdd).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith('Incident created');
    });

    it('should handle missing incident data', async () => {
      req.body = {};

      const mockAdd = jest.fn().mockResolvedValue({ id: 'new-incident-1' });
      db.collection.mockReturnValue({ add: mockAdd });

      await createIncident(req, res);

      expect(mockAdd).toHaveBeenCalledWith({});
    });

    it('should handle Firebase errors on create', async () => {
      req.body = { name: 'Test Incident' };

      const mockAdd = jest
        .fn()
        .mockRejectedValue(new Error('Permission denied'));
      db.collection.mockReturnValue({ add: mockAdd });

      try {
        await createIncident(req, res);
      } catch (error) {
        expect(error.message).toBe('Permission denied');
      }
    });

    it('should accept incidents with various severity levels', async () => {
      const severities = ['low', 'medium', 'high', 'critical'];

      for (const severity of severities) {
        req.body = { severity };
        const mockAdd = jest.fn().mockResolvedValue({ id: `incident-${severity}` });
        db.collection.mockReturnValue({ add: mockAdd });

        await createIncident(req, res);

        expect(mockAdd).toHaveBeenCalledWith({ severity });
      }
    });
  });
});
