import { aliasMutation, hasOperationName } from '../utils/graphql-test-utils';

describe('web', () => {
  const apiUrl = new URL(Cypress.env('apiUrl'));
  const gqlEndpoint = new URL('/graphql', apiUrl);

  beforeEach(() => {
    cy.intercept('POST', gqlEndpoint.href, (req) => {
      if (hasOperationName(req, 'Login')) {
        aliasMutation(req, 'Login');
        req.reply((res) => {
          res.body.data.login.user.firstName = 'John';
        });
      }
    });

    cy.intercept('POST', '/refresh_token', {
      fixture: '../fixtures/refresh_token.json',
    }).as('refreshToken');

    cy.visit('/');
  });

  it('should be able to log in', () => {
    cy.findByRole('button', { name: /login/i }).click();

    cy.findByRole('button', { name: /login/i }).should('be.disabled');

    cy.findByRole('textbox', { name: /email/i }).type('ben@example.com');
    cy.findByLabelText(/password/i).type('helloworld');

    cy.findByRole('button', { name: /login/i })
      .should('not.be.disabled')
      .click();

    cy.wait('@gqlLoginMutation')
      .its('response.body.data.login.user')
      .should((user) => {
        expect(user.firstName).to.equal('John');
      });

    cy.findByText(/login successful/i).should('exist');
  });
});
