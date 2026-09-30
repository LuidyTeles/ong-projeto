const conteudo = document.querySelector("#conteudo");

/* ==============================
   VERIFICAÇÃO
================================ */

if (conteudo) {
  const paginas = {
    inicio: `
      <section>
        <h2>Sobre a ONG</h2>

        <p>
          A Sustent+Ação é uma organização que busca promover ações sociais
          e ambientais, incentivando a participação da comunidade através de
          projetos, voluntariado e campanhas de doação.
        </p>

        <p>
          Nosso objetivo é unir pessoas para construir um futuro mais
          sustentável e colaborar com aqueles que precisam de apoio.
        </p>
      </section>

      <section>
        <h2>Nossos objetivos</h2>

        <ul>
          <li>Promover ações sociais para a comunidade;</li>
          <li>Incentivar práticas sustentáveis;</li>
          <li>Conectar voluntários com projetos da ONG;</li>
          <li>Receber apoio através de doações.</li>
        </ul>
      </section>

      <section>
        <h2>Entre em contato</h2>

        <p>
          <strong>E-mail:</strong>
          contato@sustentacao.org.br
        </p>

        <p>
          <strong>Telefone:</strong>
          (11) 99999-9999
        </p>

        <p>
          <strong>Endereço:</strong>
          São Paulo - SP
        </p>
      </section>
    `,

    projetos: `
      <section>
        <h2>Nossos projetos</h2>

        <p>
          A Sustent+Ação desenvolve projetos para ajudar a comunidade,
          cuidar do meio ambiente e incentivar a participação de voluntários.
        </p>
      </section>

      <section>
        <h2>Projeto 1 - Ação de limpeza</h2>

        <img
          src="imagens/projeto1.jpg"
          alt="Voluntários realizando uma ação de limpeza em uma área verde"
        />

        <p>
          O Projeto 1 reúne voluntários para realizar ações de limpeza
          e conservação de áreas verdes.
        </p>
      </section>

      <section>
        <h2>Projeto 2 - Plantio de árvores</h2>

        <img
          src="imagens/projeto2.jpg"
          alt="Voluntários plantando uma árvore em uma área verde"
        />

        <p>
          O Projeto 2 promove o plantio de árvores e incentiva a
          preservação do meio ambiente.
        </p>
      </section>

      <section>
        <h2>Projeto 3 - Campanha de doações</h2>

        <img
          src="imagens/projeto3.jpg"
          alt="Voluntários organizando alimentos e outros itens para doação"
        />

        <p>
          O Projeto 3 realiza campanhas para arrecadar alimentos,
          roupas e outros materiais.
        </p>
      </section>

      <section>
        <h2>Como participar</h2>

        <p>
          Você pode ajudar participando como voluntário ou contribuindo
          com uma doação para os nossos projetos.
        </p>

        <a href="#cadastro" data-pagina="cadastro">
          Quero participar
        </a>
      </section>
    `,

    cadastro: `
      <section>
        <h2>Faça parte da Sustent+Ação</h2>

        <p>
          Preencha seus dados para participar dos nossos projetos
          como voluntário ou apoiador da ONG.
        </p>

        <form id="formCadastro">

          <fieldset>
            <legend>Dados pessoais</legend>

            <label for="nome">
              Nome completo:
            </label>

            <input
              type="text"
              id="nome"
              name="nome"
              required
            />

            <label for="email">
              E-mail:
            </label>

            <input
              type="email"
              id="email"
              name="email"
              required
            />

            <label for="telefone">
              Telefone:
            </label>

            <input
              type="tel"
              id="telefone"
              name="telefone"
              placeholder="(00) 00000-0000"
              required
            />
          </fieldset>

          <fieldset>
            <legend>Forma de participação</legend>

            <label>
              <input
                type="radio"
                name="participacao"
                value="voluntario"
                required
              />

              Voluntário
            </label>

            <label>
              <input
                type="radio"
                name="participacao"
                value="doador"
              />

              Doador
            </label>
          </fieldset>

          <button type="submit">
            Enviar cadastro
          </button>

          <div id="mensagem"></div>

        </form>
      </section>
    `,
  };

  /* ==============================
     CARREGAR PÁGINA
  ================================ */

  function carregarPagina(pagina) {
    if (!paginas[pagina]) {
      pagina = "inicio";
    }

    conteudo.innerHTML = paginas[pagina];

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* ==============================
     MENU SPA
  ================================ */

  document.addEventListener("click", function (event) {
    const link = event.target.closest("[data-pagina]");

    if (!link) {
      return;
    }

    event.preventDefault();

    const pagina = link.dataset.pagina;

    carregarPagina(pagina);

    history.pushState({ pagina: pagina }, "", "#" + pagina);
  });

  /* ==============================
     BOTÃO VOLTAR
  ================================ */

  window.addEventListener("popstate", function () {
    const pagina = location.hash.replace("#", "") || "inicio";

    carregarPagina(pagina);
  });

  /* ==============================
     FORMULÁRIO
  ================================ */

  document.addEventListener("submit", function (event) {
    if (event.target.id !== "formCadastro") {
      return;
    }

    event.preventDefault();

    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    const telefone = document.querySelector("#telefone").value;

    const participacao = document.querySelector(
      'input[name="participacao"]:checked',
    );

    const mensagem = document.querySelector("#mensagem");

    if (!participacao) {
      mensagem.innerHTML = `
        <div class="mensagem erro">
          Escolha uma forma de participação.
        </div>
      `;

      return;
    }

    const cadastro = {
      nome: nome,
      email: email,
      telefone: telefone,
      participacao: participacao.value,
    };

    localStorage.setItem("cadastroSustentAcao", JSON.stringify(cadastro));

    mensagem.innerHTML = `
      <div class="mensagem sucesso">
        Cadastro realizado com sucesso!
      </div>
    `;
  });

  /* ==============================
     PÁGINA INICIAL
  ================================ */

  const paginaInicial = location.hash.replace("#", "") || "inicio";

  carregarPagina(paginaInicial);
}
