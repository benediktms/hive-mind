import { fetcherSSR, useCurrentUser } from '@grp-org/client-data-access-auth';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

const MeSSR: FC = () => {
  const { user } = useCurrentUser();

  return (
    <div>
      <h1>Me</h1>
      {user ? <div>{user.firstName} </div> : <div>Loading...</div>}
    </div>
  );
};

export default MeSSR;

// FIXME: Credentials never reach the server
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const [error, user] = await fetcherSSR(
    req,
    res,
    `${process.env.NEXT_PUBLIC_API_URI}/me`
  );

  console.log(error);

  if (!user) {
    return { redirect: { statusCode: 307, destination: '/login' } };
  }

  return {
    props: { user },
  };
};
