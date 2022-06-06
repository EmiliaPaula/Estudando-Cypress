import signup from '../pages/SignupPage'

describe('Signup', ()=> {

  beforeEach(function() {
    cy.fixture('deliver').then((d)=> {
      this.deliver = d
    })
  })

  it('User should be deliver', function(){
    signup.go()
    signup.fillForm(this.deliver.signup)
    signup.submit()

    const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois em breve retornaremos o contato.'
    signup.modalContentShouldBe(expectedMessage)
  })

  it('Incorrect document', function(){
    signup.go()
    signup.fillForm(this.deliver.cpf_inv)
    signup.submit()
    signup.alertMessageShouldBe('Oops! CPF inválido') 
  })
})

// **User should be = Usuário deve se tornar um entregador
// ** Signup = Cadastro

// **Para fazer upload de imagem, tive que baixar biblioteca para o cypress:
//comando: npm install cypress-file-upload --save-dev
//ir na pasta suport, arquivo index.js e add ** import 'cypress-file-upload' **