describe('cadastro', ()=> {
  it('Usuário de se tornar um entregador', ()=>{
    cy.viewport(1440, 900)
    cy.visit('https://buger.eats.vercel.app')

    cy.get('a[href="/deliver"]').click()
    cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

    var delivery = {
      name: 'Emília',
      cpf: '00000014141',
      email:'testando@hotmail.com',
      whatsapp:'11999999999',
      address: {
        postalcode: '04534011',
        street: 'Rua Joaquim Floriano',
        number: '1000',
        details: 'Ap 142',
        district: 'Itaim Bibi',
        city_state: 'São Paulo/SP'
      },
      delivery_method: 'Moto',
      cnh: 'cnh-digital.jpg'
    }

    cy.get('input[name="nome"]').type(delivery.name)
    cy.get('input[name="cpf"]').type(delivery.cpf)
    cy.get('input[name="email"]').type(delivery.email)
    cy.get('input[name="whatsapp"]').type(delivery.whatsapp)

    cy.get('input[name="postalcode"]').type(delivery.address.postalcode)
    cy.get('input[type="button"][value="Buscar CEP"]').click

    cy.get('input[name="address-number]').type(delivery.address.number)
    cy.get('input[name="address-details]').type(delivery.address.details)

    cy.get('input[name="address"]').should('have.value', delivery.address.street)
    cy.get('input[name="district"]').should('have.value', delivery.address.district)
    cy.get('input[name="city-uf]').should('have.value', delivery.address.city_state)

    cy.contains('.delivery-method li', delivery.delivery_method).click

    cy.get('input[accept^="image"]').attachFile('/images/' + delivery.cnh)
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

    var delivery = {
      name: 'Emília',
      cpf: '000000141AA',
      email:'testando@hotmail.com',
      whatsapp:'11999999999',
      address: {
        postalcode: '04534011',
        street: 'Rua Joaquim Floriano',
        number: '1000',
        details: 'Ap 142',
        district: 'Itaim Bibi',
        city_state: 'São Paulo/SP'
      },
      delivery_method: 'Moto',
      cnh: 'cnh-digital.jpg'
    }

    cy.get('input[name="nome"]').type(delivery.name)
    cy.get('input[name="cpf"]').type(delivery.cpf)
    cy.get('input[name="email"]').type(delivery.email)
    cy.get('input[name="whatsapp"]').type(delivery.whatsapp)

    cy.get('input[name="postalcode"]').type(delivery.address.postalcode)
    cy.get('input[type="button"][value="Buscar CEP"]').click

    cy.get('input[name="address-number]').type(delivery.address.number)
    cy.get('input[name="address-details]').type(delivery.address.details)

    cy.get('input[name="address"]').should('have.value', delivery.address.street)
    cy.get('input[name="district"]').should('have.value', edelivery.address.district)
    cy.get('input[name="city-uf]').should('have.value', delivery.address.city_state)

    cy.contains('.delivery-method li', delivery.delivery_method).click

    cy.get('input[accept^="image"]').attachFile('/images/' + delivery.cnh)
    cy.get('form button[type="submit"]').click()

    cy.get('.alert-error').should('have.text', 'Oops! CPF invalido')
    
  })
})



// **Para fazer upload de imagem, tive que baixar biblioteca para o cypress:
//comando: npm install cypress-file-upload --save-dev
//ir na pasta suport, arquivo index.js e add ** import 'cypress-file-upload' **