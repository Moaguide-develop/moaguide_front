export {};

describe('홈페이지 테스트', () => {
  it('홈페이지 접속', () => {
    cy.visit('/');
  });
});