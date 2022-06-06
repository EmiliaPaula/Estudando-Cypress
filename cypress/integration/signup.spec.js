import signup from '../pages/SignupPage'
import signupFactory from '..factories/SignupFactory'

describe('Signup', ()=> {

  //beforeEach(function() {
  //  cy.fixture('deliver').then((d)=> {
  //    this.deliver = d
  //  })
  //})

  it('User should be deliver', function(){

    var deliver = signupFactory.deliver()

    signup.go()
    signup.fillForm(deliver)
    signup.submit()

    const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois em breve retornaremos o contato.'
    signup.modalContentShouldBe(expectedMessage)
  })

  it('Incorrect document', function(){

    var deliver = signupFactory.deliver()
    deliver.cpf = '000000141aa'

    signup.go()
    signup.fillForm(deliver)
    signup.submit()
    signup.alertMessageShouldBe('Oops! CPF inválido') 
  })

  it('Incorrect email', function(){

    var deliver = signupFactory.deliver()
    deliver.email = 'user.com.br'
    signup.go()
    signup.fillForm(deliver)
    signup.submit()
    signup.alertMessageShouldBe('Oops! Email com formato inválido.') 
  })
})

// **User should be = Usuário deve se tornar um entregador
// ** Signup = Cadastro

// **Para fazer upload de imagem, tive que baixar biblioteca para o cypress:
//comando: npm install cypress-file-upload --save-dev
//ir na pasta suport, arquivo index.js e add ** import 'cypress-file-upload' **