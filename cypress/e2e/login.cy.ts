export function logintest() {
  cy.visit('/sign');
  cy.get('input[type="email"]').type('moaguide1');
  cy.get('input[type="password"]').type('qwer1234!');
  cy.get('.submit').click();

  // 로그인 성공 후 세션 유지 확인
  cy.url().should('not.include', '/sign');
  // cy.getCookie('access_token').should('exist');
}
