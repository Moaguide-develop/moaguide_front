describe('PaymentIndex Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/payment-status', { fixture: 'paymentStatus.json' }).as(
      'getPaymentStatus'
    );
    cy.visit('/payment');
  });

  it('renders payment benefits correctly', () => {
    // Check that the header and subscription benefits are rendered
    cy.get('.text-heading2').contains('구독 시작하기');
    cy.get('.text-body7').should('have.length', 4);
  });

  it('allows selecting a subscription option', () => {
    // Click on the first subscription option and check that it is selected
    cy.get('[data-testid="subscription-option"]').first().click();
    cy.get('[data-testid="subscription-option"]')
      .first()
      .should('have.class', 'border-normal');
  });

  it('redirects to the correct page based on login status', () => {
    // Mock logged-in state
    cy.setCookie('access_token', 'validToken');
    cy.get('.cta-button').click();
    cy.url().should('include', '/payment/check');

    // Mock logged-out state
    cy.clearCookie('access_token');
    cy.get('.cta-button').click();
    cy.url().should('include', '/sign');
  });

  it('handles back button click', () => {
    // Check that clicking the back button navigates to the previous page
    cy.get('.back-button').click();
    cy.url().should('not.include', '/payment');
  });
});

export {};
