/// <reference types="cypress" />

const { getId } = require('../utils/getId');

describe('16 - Implemente o menu inferior posicionando-o de forma fixa e contendo 2 ícones: um para comidas e outro para bebidas', () => {
  it('O menu inferior existe e contém os ícones corretos', () => {
    cy.visit('http://localhost:3000/meals');

    cy.get('[data-testid="footer"]');

    cy.get('[data-testid="drinks-bottom-btn"]')
      .should('have.attr', 'src')
      .should('include', 'drinkIcon');

    cy.get('[data-testid="meals-bottom-btn"]')
      .should('have.attr', 'src')
      .should('include', 'mealIcon');
  });

  it('O menu inferior deve ficar fixado sempre ao final da página', () => {
    cy.visit('http://localhost:3000/meals');

    cy.get('[data-testid="footer"]').should('have.css','position', 'fixed');
    cy.get('[data-testid="footer"]').should('have.css','bottom', '0px');
  });

  it('Verifica a cobertura de 45% do Componente Footer', () => {
    cy.task('getCoverage', getId()).its('Footer.functions.pct', { timeout: 0 }).should('be.gte', 45.00);
    cy.task('getCoverage', getId()).its('Footer.lines.pct', { timeout: 0 }).should('be.gte', 45.00);
    cy.task('getCoverage', getId()).its('Footer.branches.pct', { timeout: 0 }).should('be.gte', 45.00);
  });
});

describe('17 - Exiba o menu inferior apenas nas telas indicadas pelo protótipo', () => {
  const hasNoFooter = () => {
    cy.get('[data-testid="footer"]').should('not.exist');
    cy.get('[data-testid="drinks-bottom-btn"]').should('not.exist');
    cy.get('[data-testid="meals-bottom-btn"]').should('not.exist');
  };

  const hasFooter = () => {
    cy.get('[data-testid="footer"]');
    cy.get('[data-testid="drinks-bottom-btn"]');
    cy.get('[data-testid="meals-bottom-btn"]');
  };

  const visitWithLocalStorage = (url) => {
    cy.visit(url, {
      onBeforeLoad(win) {
        win.localStorage.setItem('user', '{ "email": "email@mail.com" }');
        win.localStorage.setItem('doneRecipes', '[]');
        win.localStorage.setItem('favoriteRecipes', '[]');
        win.localStorage.setItem('inProgressRecipes', '{}');
      },
    });
  }

  it('Rota "/": não deve ter footer', () => {
    cy.visit('http://localhost:3000/');

    hasNoFooter();
  });

  it('Rota "/meals": deve ter footer', () => {
    visitWithLocalStorage('http://localhost:3000/meals');

    hasFooter();
  });

  it('Rota "/drinks": deve ter footer', () => {
    visitWithLocalStorage('http://localhost:3000/drinks');

    hasFooter();
  });

  it('Rota "/meals/{id-da-receita}": não deve ter footer', () => {
    visitWithLocalStorage('http://localhost:3000/meals/52771');

    hasNoFooter();
  });

  it('Rota "drinks/{id-da-receita}": não deve ter footer', () => {
    visitWithLocalStorage('http://localhost:3000/drinks/178319');

    hasNoFooter();
  });

  it('Rota "/meals/{id-da-receita}/in-progress": não deve ter footer', () => {
    visitWithLocalStorage('http://localhost:3000/meals/52771/in-progress');

    hasNoFooter();
  });

  it('Rota "/drinks/{id-da-receita}/in-progress": não deve ter footer', () => {
    visitWithLocalStorage('http://localhost:3000/drinks/178319/in-progress');

    hasNoFooter();
  });

  it('Rota "/profile": deve ter footer', () => {
    visitWithLocalStorage('http://localhost:3000/profile');

    hasFooter();
  });

  it('Rota "/done-recipes": não deve ter footer', () => {
    visitWithLocalStorage('http://localhost:3000/done-recipes');

    hasNoFooter();
  });

  it('Rota "/favorite-recipes": não deve ter footer', () => {
    visitWithLocalStorage('http://localhost:3000/favorite-recipes');

    hasNoFooter();
  });

});

describe('18 - Redirecione a pessoa usuária para a tela correta ao clicar em cada ícone no menu inferior', () => {
  it('Redireciona para a lista de bebidas ao clicar no ícone de bebidas', () => {
    cy.visit('http://localhost:3000/meals');

    cy.get('[data-testid="drinks-bottom-btn"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/drinks'));
  });
  
  it('Redireciona para a lista de comidas ao clicar no ícone de comidas', () => {
    cy.visit('http://localhost:3000/drinks');

    cy.get('[data-testid="meals-bottom-btn"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/meals'));
  });

  it('Verifica a cobertura de 90% do Componente Footer', () => {
    cy.task('getCoverage', getId()).its('Footer.functions.pct', { timeout: 0 }).should('be.gte', 90.00);
    cy.task('getCoverage', getId()).its('Footer.lines.pct', { timeout: 0 }).should('be.gte', 90.00);
    cy.task('getCoverage', getId()).its('Footer.branches.pct', { timeout: 0 }).should('be.gte', 90.00);
  });

});
