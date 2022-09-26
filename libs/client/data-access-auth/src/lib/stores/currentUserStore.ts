import { CurrentUserQuery } from '@hive-mind/client-data-access-gql';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type CurrentUser = Omit<CurrentUserQuery['currentUser'], '__typename'>;
type CurrentUserState = {
  currentUser: CurrentUser | null;
  setCurrentUser: (_user: CurrentUser | null) => void;
};

export const useCurrentUserStore = create<CurrentUserState>()(
  devtools(
    persist(
      set => ({
        currentUser: null,
        setCurrentUser: _user => set(_state => ({ currentUser: _user })),
      }),
      { name: 'current-user-storage' }
    )
  )
);
