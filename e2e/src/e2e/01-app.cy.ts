// import { getGreeting } from '../support/app.po';

describe('check-in-face-frontend page worker list', () => {
  beforeEach(() => cy.visit('/'));

  it('should open main features worker', () => {
    cy.get('body').should('be.visible')
    cy.get('[data-cy="button-create-worker"]').click()
    cy.get('[data-cy="form-container-create-worker"]').should('exist');
  });
});
