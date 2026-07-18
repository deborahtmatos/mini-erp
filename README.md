# Mini ERP

Aplicação React para controle de produtos, estoque, vendas, movimentações e relatórios.

## Configuração

1. Copie `.env.example` para `.env` e preencha a URL e a chave pública do Supabase.
2. Execute o conteúdo de `supabase/schema.sql` no SQL Editor do seu projeto Supabase.
3. No painel do Supabase, em **Authentication > Providers > Email**, mantenha o provedor de e-mail ativado.
4. Instale dependências com `npm install` e inicie com `npm run dev`.
5. Crie a primeira conta pela tela de cadastro e, depois, execute `supabase/auth-migration.sql` no SQL Editor para bloquear o acesso anônimo.

O primeiro script permite acesso anônimo para demonstração. A migração de autenticação remove esse acesso; ela exige login, mas ainda não separa os dados entre diferentes empresas.
