import { useCallback, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import PageError from '@/pages/sys/error/PageError';
import { useUserToken, useUserInfo } from '@/store/userStore';
import { useProfile } from '@/store/userStore';

import { useRouter } from '../hooks';

type Props = {
  children: React.ReactNode;
};
export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const { accessToken } = useUserToken();
  const profile = useProfile();
  const { expireDay } = useUserInfo();

  const check = useCallback(() => {
    if (!accessToken) {
      router.replace('/login');
    }
    if (expireDay !== undefined && expireDay <= 0) {
      router.replace('/403');
    }
  }, [router, accessToken, expireDay]);

  useEffect(() => {
    if (accessToken) {
      profile().then(() => {
        // check();
      });
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  return (
    <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>
  );
}
