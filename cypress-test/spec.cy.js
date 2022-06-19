describe('CRUD Python E2E testing', () => {
  it('Load the page', () => {
    cy.visit('http://192.168.1.197:3000/')
  })
  describe('Create, Read, Update, Delete a new game', () => {
    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()
    const testname = `Game${id}`
    const testnamenew = `Edited${id}`
    const year = () => Cypress._.random(1990, 2020)
    const yearnum = year()
  it('Create a new game', () => {


    cy.visit('http://192.168.1.197:3000/add');
    cy.get('input[name=name]').should('be.visible').type(testname);
    cy.get('input[name=year]').should('be.visible').type(yearnum);
    cy.get('input[name=company]').should('be.visible').type('Cypress');
     cy.get('.submitbut').should('be.visible').click();

     cy.get('h3').contains(testname).should('be.visible')


  })

       it('Read if new game exists', () => {
    cy.get('h3').contains(testname).should('be.visible')
  })
    it('Update the game you just created', () => {
      cy.get('h3').contains(testname).should('be.visible').next().should('be.visible').click();
      cy.get('.update').should('be.visible').click();

      cy.get('input[name=name]').should('be.visible').clear().type(testnamenew);
    cy.get('input[name=year]').should('be.visible').clear().type(1);
    cy.get('input[name=company]').should('be.visible').clear().type('Cypress Edited');
    cy.get('.submitbut').should('be.visible').click();
    cy.get('h3').contains(testnamenew).should('be.visible')
      cy.get('h3').contains(testname).should('not.exist')
  })



    it('Delete the game you just created and edited', () => {
      cy.get('h3').contains(testnamenew).should('be.visible').next().should('be.visible').click();
      cy.get('.delete').should('be.visible').click();
      cy.get('input[class=submitbut]').should('be.visible').click();
      cy.get('h3').contains(testnamenew).should('not.exist')
  })
})
  describe('Create, Read, Update a new game (No Data)', () => {

   const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()
    const testname = `Game${id}`
    const testnamenew = `Edited${id}`
    const year = () => Cypress._.random(1990, 2020)
    const yearnum = year()
  it('Create a new game without a year of creation', () => {


    cy.visit('http://192.168.1.197:3000/add');
    cy.get('input[name=name]').should('be.visible').type(testname);
    cy.get('input[name=company]').should('be.visible').type('Cypress');
     cy.get('.submitbut').should('be.visible').click();
    cy.visit('http://192.168.1.197:3000/');
    // SHOULD NOT WORK AS THERE IS NO GAME LIK THAT
     cy.get('h3').contains(testname).should('be.visible')


  })

    it('Create a new game without a company', () => {


    cy.visit('http://192.168.1.197:3000/add');
    cy.get('input[name=name]').should('be.visible').type(testname);
    cy.get('input[name=year]').should('be.visible').type(yearnum);
     cy.get('.submitbut').should('be.visible').click();
    cy.visit('http://192.168.1.197:3000/');
    // SHOULD NOT WORK AS THERE IS NO GAME LIK THAT
     cy.get('h3').contains(testname).should('be.visible')


  })

    it('Update a game by just deleting the name', () => {
      cy.get('h3').first().should('be.visible').next().should('be.visible').click();
      cy.get('.update').should('be.visible').click();
      cy.get('input[name=name]').should('be.visible').clear();
    cy.get('input[name=year]').should('be.visible').clear().type(1);
    cy.get('input[name=company]').should('be.visible').clear().type('Cypress Edited');
    cy.get('.submitbut').should('be.visible').click();
    cy.visit('http://192.168.1.197:3000/');

    // SHOULD NOT WORK
    cy.get('h3').contains(testnamenew).should('be.visible')

      //SHOULD WORK
      cy.get('h3').contains(testname).should('be.visible')
  })
    it('Update a game by just deleting the year', () => {
      cy.get('h3').first().should('be.visible').next().should('be.visible').click();
      cy.get('.update').should('be.visible').click();
      cy.get('input[name=name]').should('be.visible').clear().type(testnamenew);;
    cy.get('input[name=year]').should('be.visible').clear();
    cy.get('input[name=company]').should('be.visible').clear().type('Cypress Edited');
    cy.get('.submitbut').should('be.visible').click();
    cy.visit('http://192.168.1.197:3000/');

    // SHOULD NOT WORK
    cy.get('h3').contains(testnamenew).should('be.visible')

      //SHOULD WORK
      cy.get('h3').contains(testname).should('be.visible')
  })

    it('Update a game by just deleting the company', () => {
      cy.get('h3').first().should('be.visible').next().should('be.visible').click();
      cy.get('.update').should('be.visible').click();
      cy.get('input[name=name]').should('be.visible').clear().type(testnamenew);;
    cy.get('input[name=year]').should('be.visible').clear().type(1);
    cy.get('input[name=company]').should('be.visible').clear();
    cy.get('.submitbut').should('be.visible').click();
    cy.visit('http://192.168.1.197:3000/');

    // SHOULD NOT WORK
    cy.get('h3').contains(testnamenew).should('be.visible')

      //SHOULD WORK
      cy.get('h3').contains(testname).should('be.visible')
  })


  })
   })