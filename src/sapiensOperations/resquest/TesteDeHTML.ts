export class TesteDeHTML {
    async execute(): Promise<string> {
        const testeDeHTML = `{
            <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Netflix</title>
    <link rel="stylesheet" href="bootstrap-5.0.2-dist/css/bootstrap.css" />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
      integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="styles.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <link
      rel="shortcut icon"
      href="./assets/images/netflix.png"
      type="image/png"
    />
  </head>
  <body class="bg-films">
    <div class="container-fluid">
      <header class="row">
        <a href="#">
          <img
            src="./assets/images/logo.png"
            alt="logo"
            class="logo"
            draggable="false"
          />
        </a>
      </header>
      <div id="caixa-login" class="col-4 offset-4">
        <h1 class="txt-h1 text-white">Entrar</h1>
        <br />
        <form action="">
          <input
            type="email"
            class="form-control form-control-lg background-secondary"
            placeholder="Email ou número de telefone"
            name="email"
            id="email"
          />
          <input
            type="password"
            class="form-control form-control-lg background-secondary mt-3"
            placeholder="Senha"
            name="senha"
            id="senha"
          />
          <button class="btn btn-lg btn-block btn-danger button-login mt-4">
            Entrar
          </button>
          <div class="row mt-3">
            <div class="col text-muted">
              <input type="checkbox" name="checkbox" id="checkbox" />
              <label class="ml-1" for="checkbox">Lembrar de mim.</label>
            </div>
            <div class="col text-right">
              <a href="#" class="text-muted">Precisa de ajuda?</a>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <a href="" class="txt-grey">
                <img
                  src="./assets/images/facebook.png"
                  alt="facebook"
                  class="mr-1"
                />
                Conectar com Facebook
              </a>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <p class="txt-grey">
                Novo por aqui? <a href="#" class="text-white">Assine agora.</a>
              </p>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <p class="txt-grey txt-small">
                Esta página é protegida pelo Google reCAPTCHA para garantir que
                você não é um robô. <a href="#">Saiba mais.</a>
              </p>
            </div>
          </div>
        </form>
      </div>
      <footer class="footer-container mt-5">
        <div class="row pl-5">
          <div class="col mt-3 ml-5">
            <p class="txt-grey">Dúvidas? Ligue 0800-761-4631</p>
          </div>
        </div>
        <div class="row pl-5">
          <div class="col mt-1 ml-5">
            <a href="#" class="txt-grey text-small-footer"
              >Perguntas frequentes</a
            ><br />
            <a href="#" class="txt-grey text-small-footer"
              >Preferências de cookies</a
            >
          </div>
          <div class="col mt-1">
            <a href="#" class="txt-grey text-small-footer">Centro de ajuda</a
            ><br />
            <a href="#" class="txt-grey text-small-footer"
              >Informações corporativas</a
            >
          </div>
          <div class="col mt-1">
            <a href="#" class="txt-grey text-small-footer">Termos de uso</a>
          </div>
          <div class="col mt-1">
            <a href="#" class="txt-grey text-small-footer">Privacidade</a>
          </div>
        </div>
        <div class="row pl-5">
          <div class="col mt-4">
            <i class="fas fa-globe ml-5"></i>
            <font class="txt-grey text-medium-footer ml-1">Localização</font
            ><br />
            <select class="select-lang ml-5 mt-2">
              <option>Português</option>
              <option>Alemão</option>
              <option>English</option>
            </select>
          </div>
        </div>
      </footer>
    </div>
  </body>
</html>
`
        
        return testeDeHTML;
    }
}