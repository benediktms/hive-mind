import { Container, Heading } from '@chakra-ui/layout';
import Link from 'next/link';
import React from 'react';

export function ConfirmAccount() {
  return (
    <Container>
      <Heading>Please check your email to confirm your account</Heading>

      <Link href="/">Home</Link>
    </Container>
  );
}

export default ConfirmAccount;
