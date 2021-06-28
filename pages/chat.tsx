import { useSession, signOut } from 'next-auth/client';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import Link from 'next/link';

import { API_KEY, PUSHER_CLOUSTER } from '@utils/const';

const Chat = () => {
  Pusher.logToConsole = true;

  const [message, setMessage] = useState<string>('');
  const [onlineUser, setOnlineUser] = useState<number>(0);
  // eslint-disable-next-line no-unused-vars
  const [chats, setChats] = useState([]);
  const [session, isLoading] = useSession();
  const pusher = new Pusher(API_KEY, {
    cluster: PUSHER_CLOUSTER,
    authEndpoint: '/api/pusher/auth',
  });
  useEffect(() => {
    const channel = pusher.subscribe('presence-channel');
    channel.bind('pusher:subscription_succeeded', (members, err) => {
      if (err) {
        console.log('existe un error');
      }
      setOnlineUser(members.count);
    });
    return () => {
      channel.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessage(value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('/api/pusher/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })
      .then((data) => data.json())
      .then((res) => console.log(`Your data`, res));
    setMessage('');
  };

  if (isLoading) return null;
  if (!isLoading && !session) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-3xl text-blue-600 font-bold mb-5">
          Pagina protegida
        </h1>
        <p>
          Por favor, haga la{' '}
          <Link href="/">
            <a className="underline font-semibold">autenticacion</a>
          </Link>
        </p>
      </div>
    );
  }
  console.log(session);
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-red-400 text-center">
        Welcome {session.user.name}
      </h1>
      <p>total de usuarios {onlineUser}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Type your message..."
        />
      </form>
      <div>
        <p>aqui va el log de mensajes</p>
        <ul>
          {chats.map((chat, _index) => (
            <li key={_index}>{chat}</li>
          ))}
        </ul>
      </div>
      <button onClick={() => signOut({ callbackUrl: '/' })}>Sig Out</button>
    </div>
  );
};

export default Chat;
