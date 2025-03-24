import { useCallback, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import PageError from '@/pages/sys/error/PageError';
import { useUserToken } from '@/store/userStore';
import { useProfile } from '@/store/userStore';

import { useRouter } from '../hooks';

type Props = {
  children: React.ReactNode;
};
export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const { accessToken } = useUserToken();
  const profile = useProfile();

  const check = useCallback(() => {
    if (!accessToken) {
      router.replace('/login');
    }
  }, [router, accessToken]);

  useEffect(() => {
    if (accessToken) {
      profile();
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  return (
    <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>
  );
}
