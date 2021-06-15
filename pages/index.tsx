import { signIn, useSession } from 'next-auth/client';

const Index = () => {
  const [session] = useSession();
  return (
    <div className="container mx-auto">
      {!session && (
        <>
          Not signed in <br />
          <button
            onClick={() =>
              signIn('github', { callbackUrl: 'http://localhost:8000/chat' })
            }
            className="p-2 bg-green-500 rounded-md text-white"
          >
            Sign in
          </button>
        </>
      )}
    </div>
  );
};

export default Index;
