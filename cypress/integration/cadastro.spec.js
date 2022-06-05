import SignupPage from '../pages/SignupPage'

describe('cadastro', ()=> {
  it('Usuário de se tornar um entregador', ()=>{

    var deliver = {
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

    var signup = new SignupPage()

    signup.go()
    signup.fillForm(deliver)
    signup.submit()

    const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois em breve retornaremos o contato.'
    signup.modalContentShouldBe(expectedMessage)
  })

  it('CPF incorreto', ()=>{

    var deliver = {
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

    var signup = new SignupPage()

    signup.go()
    signup.fillForm(deliver)
    signup.submit()
    signup.alertMessageShouldBe('Oops! CPF inválido') 
  })
})



// **Para fazer upload de imagem, tive que baixar biblioteca para o cypress:
//comando: npm install cypress-file-upload --save-dev
//ir na pasta suport, arquivo index.js e add ** import 'cypress-file-upload' **