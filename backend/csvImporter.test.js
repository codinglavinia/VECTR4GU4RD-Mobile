import { importCSV } from '../services/csvImporter.js';
import fs from 'fs';
import csv from 'csv-parser';

// Mock dependencies
jest.mock('fs');
jest.mock('csv-parser');
jest.mock('../firebase.js', () => ({
  db: {
    collection: jest.fn(),
  },
}));

import { db } from '../firebase.js';

describe('CSV Importer Service', () => {
  let mockStream;

  beforeEach(() => {
    jest.clearAllMocks();

    mockStream = {
      pipe: jest.fn().mockReturnThis(),
      on: jest.fn().mockReturnThis(),
    };

    fs.createReadStream.mockReturnValue(mockStream);
    csv.mockReturnValue(csv);
  });

  describe('importCSV', () => {
    it('should import CSV data successfully', (done) => {
      const csvPath = '/test/incidents.csv';
      const mockData = [
        { timestamp: '2024-01-01T10:00:00Z', severity: 'high' },
        { timestamp: '2024-01-01T10:05:00Z', severity: 'medium' },
      ];

      const mockAdd = jest.fn().mockResolvedValue({ id: 'new-incident' });
      db.collection.mockReturnValue({ add: mockAdd });

      let dataCallback, endCallback;

      mockStream.on.mockImplementation((event, callback) => {
        if (event === 'data') dataCallback = callback;
        if (event === 'end') endCallback = callback;
        return mockStream;
      });

      importCSV(csvPath);

      // Simulate CSV data events
      mockData.forEach(row => dataCallback(row));
      endCallback();

      process.nextTick(() => {
        expect(fs.createReadStream).toHaveBeenCalledWith(csvPath);
        expect(mockStream.pipe).toHaveBeenCalled();
        expect(mockAdd).toHaveBeenCalledTimes(2);
        done();
      });
    });

    it('should handle empty CSV files', (done) => {
      const csvPath = '/test/empty.csv';
      const mockAdd = jest.fn().mockResolvedValue({ id: 'new-incident' });
      db.collection.mockReturnValue({ add: mockAdd });

      let endCallback;

      mockStream.on.mockImplementation((event, callback) => {
        if (event === 'end') endCallback = callback;
        return mockStream;
      });

      importCSV(csvPath);
      endCallback();

      process.nextTick(() => {
        expect(mockAdd).not.toHaveBeenCalled();
        done();
      });
    });

    it('should handle CSV with various data types', (done) => {
      const csvPath = '/test/mixed.csv';
      const mockData = [
        {
          timestamp: '2024-01-01T10:00:00Z',
          severity: 'high',
          source_ip: '192.168.1.100',
          count: '5',
          percentage: '0.95',
        },
      ];

      const mockAdd = jest.fn().mockResolvedValue({ id: 'new-incident' });
      db.collection.mockReturnValue({ add: mockAdd });

      let dataCallback, endCallback;

      mockStream.on.mockImplementation((event, callback) => {
        if (event === 'data') dataCallback = callback;
        if (event === 'end') endCallback = callback;
        return mockStream;
      });

      importCSV(csvPath);

      mockData.forEach(row => dataCallback(row));
      endCallback();

      process.nextTick(() => {
        expect(mockAdd).toHaveBeenCalledWith(mockData[0]);
        done();
      });
    });

    it('should log completion message', (done) => {
      const csvPath = '/test/test.csv';
      const consoleSpy = jest.spyOn(console, 'log');

      const mockAdd = jest.fn().mockResolvedValue({ id: 'new-incident' });
      db.collection.mockReturnValue({ add: mockAdd });

      let endCallback;

      mockStream.on.mockImplementation((event, callback) => {
        if (event === 'end') endCallback = callback;
        return mockStream;
      });

      importCSV(csvPath);
      endCallback();

      process.nextTick(() => {
        expect(consoleSpy).toHaveBeenCalledWith('CSV imported');
        consoleSpy.mockRestore();
        done();
      });
    });

    it('should handle large CSV files', (done) => {
      const csvPath = '/test/large.csv';
      const mockData = Array.from({ length: 1000 }, (_, i) => ({
        timestamp: `2024-01-01T${String(i).padStart(2, '0')}:00:00Z`,
        severity: ['low', 'medium', 'high'][i % 3],
      }));

      const mockAdd = jest.fn().mockResolvedValue({ id: 'new-incident' });
      db.collection.mockReturnValue({ add: mockAdd });

      let dataCallback, endCallback;

      mockStream.on.mockImplementation((event, callback) => {
        if (event === 'data') dataCallback = callback;
        if (event === 'end') endCallback = callback;
        return mockStream;
      });

      importCSV(csvPath);

      mockData.forEach(row => dataCallback(row));
      endCallback();

      process.nextTick(() => {
        expect(mockAdd).toHaveBeenCalledTimes(1000);
        done();
      });
    });
  });
});
