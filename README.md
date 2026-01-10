## Sobre Chaty 🔎

Chaty é um chat em tempo real desenvolvido com o objetivo de  estudar, testar e aprimorar habilidades em desenvolvimento fullstack. O projeto foi construído como uma aplicação web completa, integrando frontend, backend, autenticação e comunicação em tempo real.

## Aviso e Uso Responsável ⚠️

Este projeto foi criado com fins educacionais e demonstrativos. Embora contenha recursos de segurança, como autenticação de usuários, criptografia de senhas e controle de acesso a grupos, ele **não deve ser utilizado em produção ou para fins pessoais**, pois não foi projetado para lidar com dados sensíveis em ambientes reais.

Evite inserir informações pessoais, confidenciais ou sensíveis ao utilizar esta aplicação.

Caso encontre bugs, problemas de segurança, comportamentos inesperados ou tenha sugestões, sinta-se à vontade para abrir uma issue neste repositório ou entrar em contato pelo e-mail: pedrohmoura.dev@gmail.com.

## Features ⚙️

- Autenticação de usuários
- Criação de grupos de conversa
- Mensagens em tempo real via WebSocket
- Controle de acesso por grupo
- Criptografia de senha
- Persistência em banco de dados
- Interface responsiva


## Instruções 📒

A seguir estão descritas as etapas básicas para executar o projeto localmente e utilizar seus principais recursos.

### Ambiente Local

1. Clone o repositório.
2. Crie um banco de dados PostgreSQL.
3. Gere um UUID para ser usado como chave de sessão (session key).
4. Escolha uma porta e url para o WebSocket.

Em seguida, crie um arquivo .env contendo as seguintes variáveis:

- DATABASE_URL
- SESSION_KEY
- PORT
- NEXT_PUBLIC_WS_URL

Após concluir a configuração, inicie os serviços da aplicação.

Para iniciar o servidor:
```
pnpm run server
```
Para iniciar o client:
```
pnpm next
```
A aplicação estará disponível em localhost.

### Iniciando uma conversa

1. Crie uma conta, caso ainda não possua uma.
2. Clique no ícone de “+” no canto inferior direito da interface.
3. Preencha os dados do grupo e confirme a criação.
4. Ao entrar no grupo, você poderá trocar mensagens em tempo real com outros usuários conectados ao mesmo grupo.

> ℹ️**Observação:** A sessão do usuário é armazenada no cache do navegador. Para testar a comunicação em tempo real entre diferentes usuários, utilize navegadores ou perfis diferentes.

## Arquitetura 🏗️

O Chaty utiliza uma arquitetura cliente-servidor baseada em WebSockets para comunicação em tempo real.

- O frontend (Next.js) se conecta ao servidor WebSocket
- O backend gerencia sessões, grupos e mensagens
- O PostgreSQL armazena usuários, grupos e histórico
- Tokens de sessão são usados para autenticação

## Tech Stack 🎓

**Frontend:** Next.js, React, TypeScript, Tailwind CSS  
**Backend:** Node.js, WebSocket (ws), PostgreSQL  
**Segurança:** bcrypt, jose, Zod  
**Infra:** Vercel, Render


## Contributing 😁

Por último mas não menos importante. Contribuições são bem-vindas!

Se você quiser ajudar:
1. Faça um fork do repositório
2. Crie uma branch (`git checkout -b feature/nome`)
3. Faça suas alterações
4. Envie um pull request