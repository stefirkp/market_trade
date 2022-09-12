import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Homepage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/market');
  }, [router]);

  return <div />;
};

export default Homepage;
