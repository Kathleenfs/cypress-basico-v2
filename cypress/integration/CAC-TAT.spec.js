/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = ' Teste,Teste, teste, teste,Teste, teste, teste,Teste, teste, teste,Teste, teste, teste,Teste, teste, teste,'
        cy.get('#firstName').type('Kathleen')
        cy.get('#lastName').type('Ferreira')
        cy.get('#email').type('kathleen@exmpl.com')
        cy.get('#open-text-area').type(longText, {delay:0}) 
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

        it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
            cy.get('#firstName').type('Kathleen')
            cy.get('#lastName').type('Ferreira')
            cy.get('#email').type('kathleenexmpl.com')
            cy.get('#open-text-area').type('Test') 
            cy.contains('button', 'Enviar').click()
    
            cy.get('.error').should('be.visible')

        })

        it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
            cy.get('#phone')
            .type('advbgfhnjk')
            .should('have.value', '')
        })

        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
            cy.get('#firstName').type('Kathleen')
            cy.get('#lastName').type('Ferreira')
            cy.get('#email').type('kathleen@exmpl.com')
            cy.get('#phone-checkbox').click()
            cy.get('#open-text-area').type('Test') 
            cy.contains('button', 'Enviar').click()
    
            cy.get('.error').should('be.visible') 
        })

        it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
            cy.get('#firstName')
            .type('kath')
            .should('have.value', 'kath')
            .clear()
            .should('have.value', '')
            cy.get('#lastName')
            .type('ferreira')
            .should('have.value', 'ferreira')
            .clear()
            .should('have.value', '')
            cy.get('#email')
            .type('email@test.com')
            .should('have.value', 'email@test.com')
            .clear()
            .should('have.value', '')
            cy.get('#phone')
            .type('123456')
            .should('have.value', '123456')
            .clear()
            .should('have.value', '')
        })

        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')
        })

        it('envia o formuário com sucesso usando um comando customizado', function(){
            cy.fillMandatoryFieldsAndSubmit()

            cy.get('.success').should('be.visible')
        })

        it.only('', function(){
            cy.get('select').select('Blog')
        })
  })