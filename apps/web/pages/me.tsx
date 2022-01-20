import { useCurrentUser, WithUser } from '@grp-org/client-data-access-auth';

export default function Me() {
  const { user } = useCurrentUser();

  return (
    <WithUser>
      <h1>Me</h1>
      {user ? <div>{user.firstName} </div> : <div>Loading...</div>}
    </WithUser>
  );
}
