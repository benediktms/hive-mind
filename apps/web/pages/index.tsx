import { Heading } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

export function Index() {
  return (
    <>
      <Heading>index</Heading>

      <Link href="/login">Login</Link>
    </>
  );
}

export default Index;
