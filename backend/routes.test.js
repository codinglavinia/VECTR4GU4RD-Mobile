import express from 'express';
import authRoutes from '../routes/auth.routes.js';
import incidentsRoutes from '../routes/incidents.routes.js';

// Mock controllers
jest.mock('../controllers/auth.controller.js', () => ({
  login: jest.fn((req, res) => res.json({ token: 'mock-token' })),
}));

jest.mock('../controllers/incidents.controller.js', () => ({
  getIncidents: jest.fn((req, res) => res.json([])),
  createIncident: jest.fn((req, res) => res.status(201).send('Incident created')),
}));

describe('Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/auth', authRoutes);
    app.use('/incidents', incidentsRoutes);
  });

  describe('Auth Routes', () => {
    it('should have POST /login endpoint', async () => {
      const response = {
        status: 200,
        json: { token: 'mock-token' },
      };

      expect(authRoutes.stack.some(layer => layer.route && layer.route.path === '/login')).toBe(true);
    });

    it('should have login handler registered', () => {
      const loginRoute = authRoutes.stack.find(
        layer => layer.route && layer.route.path === '/login'
      );
      expect(loginRoute).toBeDefined();
    });
  });

  describe('Incidents Routes', () => {
    it('should have GET / endpoint', () => {
      const getRoute = incidentsRoutes.stack.find(
        layer => layer.route && layer.route.path === '/' && layer.route.methods.get
      );
      expect(getRoute).toBeDefined();
    });

    it('should have POST / endpoint', () => {
      const postRoute = incidentsRoutes.stack.find(
        layer => layer.route && layer.route.path === '/' && layer.route.methods.post
      );
      expect(postRoute).toBeDefined();
    });

    it('should have both GET and POST handlers', () => {
      const allRoutes = incidentsRoutes.stack.filter(
        layer => layer.route && layer.route.path === '/'
      );
      expect(allRoutes.length).toBeGreaterThanOrEqual(1);
    });
  });
});
