import { Heading } from '@chakra-ui/react';
import Link from 'next/link';

export function Index() {
  return (
    <>
      <Heading>index</Heading>
      <Link href="/login">Login</Link>
    </>
  );
}

export default Index;
