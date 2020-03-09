import express from 'express';

const response = (type: operation, res: express.Response, data?: unknown, debug?: unknown): express.Response => {
  switch (type) {
    case 'unknown':
      return res.status(400).json({ data, debug });
    case 'validation':
      return res.status(400).json({ data, debug });
    case 'success':
      return res.status(200).json({ data, debug });
    case 'unauthorized':
      return res.status(401).json({ data, debug });
    case 'duplication':
      return res.status(400).json({ data, debug });
    case 'failed':
      return res.status(400).json({ data, debug });
    case 'serverError':
      return res.status(503).json({ data, debug });
    default:
      return res.status(400).json({ response: 'Something went wrong' });
  }
};

type operation = 'unknown' | 'validation' | 'success' | 'unauthorized' | 'duplication' | 'failed' | 'serverError';

export default response;
