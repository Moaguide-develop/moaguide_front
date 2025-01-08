/* eslint-disable */
import { logintest } from '../login.cy';

describe('Full Payment Flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/payment-status', { fixture: 'paymentStatus.json' }).as(
      'getPaymentStatus'
    );
    cy.intercept('GET', '/api/issubscribed', { subscribed: false }).as('getIsSubscribed');
    // cy.setCookie('access_token', 'your-mock-token');
  });

  it('completes a full payment flow', () => {
    logintest();
    cy.visit('/payment');
    cy.wait(3000);
    cy.contains('div', '첫 달 무료체험하기').should('exist').click();
    cy.url().should('include', '/payment/check');
    cy.get('.subscribed_check').click();
    cy.wait(1500);
    cy.get('.payment_start').click();
    cy.wait(3000);

    //토스 페이먼츠 결제 테스트

    cy.get('#__tosspayments_payment-gateway_iframe__')
      // .should('exist')
      .then(($iframe) => {
        const body = $iframe.contents().find('body');
        cy.log(body.html());
        cy.wrap(body)
          .should('not.be.empty')
          .within(() => {
            cy.get('input[aria-label="카드번호 1 ~ 4 자리"]').type('6243');
            cy.get('input[aria-label="카드번호 5 ~ 8 자리"]').type('6303');
            cy.get('input[aria-label="카드번호 9 ~ 12 자리"]').type('1763');
            cy.get('input[aria-label="카드번호 13 ~ 16 자리"]').type('5652');
            cy.get('input[aria-label="카드 유효기간"]').type('0825');
            cy.get('input[aria-label="주민등록번호 생년월일"]').type('010310');
            cy.get('input[aria-label="주민등록번호 성별"]').type('3');
            cy.get('input[type="checkbox"]').check();
            cy.contains('button', '다음').click();
          });
      });

    cy.url().should('include', '/payment/check/confirm/successloading');
    cy.get('p').contains('결제가 진행중입니다...').should('exist');
  });
});
export {};
