Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Kathleen')
    cy.get('#lastName').type('Ferreira')
    cy.get('#email').type('kathleen@exmpl.com')
    cy.get('#open-text-area').type('teste') 
    cy.contains('button', 'Enviar').click()
})