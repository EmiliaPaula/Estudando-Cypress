describe('cadastro', ()=> {
  it('Usuário de se tornar um entregador', ()=>{
    cy.viewport(1440, 900)
    cy.visit('https://buger.eats.vercel.app')

    cy.get('a[href="/deliver"]').click()
    cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

    var entregador = {
      nome: 'Emília',
      cpf: '00000014141',
      email:'testando@hotmail.com',
      whatsapp:'11999999999',
      endereco: {
        cep: '04534011',
        rua: 'Rua Joaquim Floriano',
        numero: '1000',
        complemento: 'Ap 142',
        bairro: 'Itaim Bibi',
        cidade_uf: 'São Paulo/SP'
      },
      metodo_entrega: 'Moto',
      cnh: 'cnh-digital.jpg'
    }

    cy.get('input[name="nome"]').type(entregador.nome)
    cy.get('input[name="cpf"]').type(entregador.cpf)
    cy.get('input[name="email"]').type(entregador.email)
    cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

    cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
    cy.get('input[type="button"][value="Buscar CEP"]').click

    cy.get('input[name="address-number]').type(entregador.endereco.numero)
    cy.get('input[name="address-details]').type(entregador.endereco.complemento)

    cy.get('input[name="address"]').should('have.value', entregador.endereco.rua)
    cy.get('input[name="district"]').should('have.value', entregador.endereco.bairro)
    cy.get('input[name="city-uf]').should('have.value', entregador.endereco.cidade_uf)

    cy.contains('.delivery-method li', entregador.metodo_entrega).click

    cy.get('input[accept^="image"]').attachFile('/images/' + entregad.cnh)
    cy.get('form button[type="submit"]').click()

    const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois em breve retornaremos o contato.'
    cy.get('.swal2-container .swal2-html-container')
      .should('have.text', expectedMessage)
  })

  it('CPF incorreto', ()=>{
    cy.viewport(1440, 900)
    cy.visit('https://buger.eats.vercel.app')

    cy.get('a[href="/deliver"]').click()
    cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

    var entregador = {
      nome: 'Emília',
      cpf: '000000141AA',
      email:'testando@hotmail.com',
      whatsapp:'11999999999',
      endereco: {
        cep: '04534011',
        rua: 'Rua Joaquim Floriano',
        numero: '1000',
        complemento: 'Ap 142',
        bairro: 'Itaim Bibi',
        cidade_uf: 'São Paulo/SP'
      },
      metodo_entrega: 'Moto',
      cnh: 'cnh-digital.jpg'
    }

    cy.get('input[name="nome"]').type(entregador.nome)
    cy.get('input[name="cpf"]').type(entregador.cpf)
    cy.get('input[name="email"]').type(entregador.email)
    cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

    cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
    cy.get('input[type="button"][value="Buscar CEP"]').click

    cy.get('input[name="address-number]').type(entregador.endereco.numero)
    cy.get('input[name="address-details]').type(entregador.endereco.complemento)

    cy.get('input[name="address"]').should('have.value', entregador.endereco.rua)
    cy.get('input[name="district"]').should('have.value', entregador.endereco.bairro)
    cy.get('input[name="city-uf]').should('have.value', entregador.endereco.cidade_uf)

    cy.contains('.delivery-method li', entregador.metodo_entrega).click

    cy.get('input[accept^="image"]').attachFile('/images/' + entregad.cnh)
    cy.get('form button[type="submit"]').click()

    cy.get('.alert-error').should('have.text', 'Oops! CPF invalido')
    
  })
})



// **Para fazer upload de imagem, tive que baixar biblioteca para o cypress:
//comando: npm install cypress-file-upload --save-dev
//ir na pasta suport, arquivo index.js e add ** import 'cypress-file-upload' **