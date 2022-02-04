import {
  Box,
  Button,
  Container,
  Heading,
  IconButton,
  Text,
  Link,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BiArrowBack } from 'react-icons/bi';
import { FC } from 'react';
import NextLink from 'next/link';

type Props = {
  forPage: 'signup' | 'login';
};

export const FormLayout: FC<Props> = ({ forPage, children }) => {
  const router = useRouter();

  return (
    <Container>
      <Heading variant="h1" textAlign="center" my={5}>
        {forPage === 'signup' ? 'Sign up' : 'Login'}
      </Heading>

      {children}

      <Box mt={5} display="flex">
        <IconButton
          aria-label="back-button"
          onClick={() => router.push('/')}
          w="50%"
        >
          <BiArrowBack />
        </IconButton>
        {forPage === 'login' && (
          <Button
            colorScheme="purple"
            variant="outline"
            w="50%"
            ml={2}
            onClick={async () => await router.push('/register')}
          >
            Sign up
          </Button>
        )}
        {forPage === 'signup' && (
          <Button
            colorScheme="purple"
            variant="outline"
            w="50%"
            ml={2}
            onClick={async () => await router.push('/login')}
          >
            Login
          </Button>
        )}
      </Box>
      <Text mt={10} align="center">
        <NextLink href="/forgot-password">
          <Link>Forgot Password?</Link>
        </NextLink>
      </Text>
    </Container>
  );
};
