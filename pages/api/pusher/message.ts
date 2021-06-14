import { NextApiRequest, NextApiResponse } from 'next';
import Pusher from 'pusher';

import {
  API_KEY,
  API_SECRET,
  PUSHER_APP_ID,
  PUSHER_CLOUSTER,
} from '@utils/const';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body;
    const pusher = new Pusher({
      appId: PUSHER_APP_ID,
      key: API_KEY,
      secret: API_SECRET,
      cluster: PUSHER_CLOUSTER,
      useTLS: true,
    });
    pusher.trigger('chat', 'message', { message });
    return res.json({ message: 'Succesful message sending :)' });
  }
  return res.status(404).json({
    error: {
      code: 'not_found',
      message:
        "The requested endpoint was not found or doesn't support this method.",
    },
  });
}

export default handler;
