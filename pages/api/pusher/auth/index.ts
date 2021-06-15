import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import Pusher from 'pusher';

import {
  API_KEY,
  API_SECRET,
  PUSHER_APP_ID,
  PUSHER_CLOUSTER,
} from '@utils/const';

async function pushearAuth(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getSession({ req });
    const {
      accessToken,
      user: { name, image },
    } = session;

    const pusher = new Pusher({
      appId: PUSHER_APP_ID,
      key: API_KEY,
      secret: API_SECRET,
      cluster: PUSHER_CLOUSTER,
      useTLS: true,
    });

    const presenceData = {
      user_id: accessToken as string,
      user_info: {
        name,
        profilePicture: image,
      },
    };

    const { socket_id, channel_name } = req.body;

    const auth = pusher.authenticate(socket_id, channel_name, presenceData);
    return res.send(auth);
  }
  return res.status(404).json({
    error: {
      code: 'not_found',
      message:
        "The requested endpoint was not found or doesn't support this method.",
    },
  });
}

export default pushearAuth;
