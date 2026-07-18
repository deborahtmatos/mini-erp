-- Execute este script após confirmar que o login está funcionando.
-- Ele bloqueia o uso anônimo das tabelas do Mini ERP.

drop policy if exists "demo public access to produtos" on public.produtos;
drop policy if exists "demo public access to movimentacoes" on public.movimentacoes;
drop policy if exists "demo public access to vendas" on public.vendas;
drop policy if exists "authenticated access to produtos" on public.produtos;
drop policy if exists "authenticated access to movimentacoes" on public.movimentacoes;
drop policy if exists "authenticated access to vendas" on public.vendas;

create policy "authenticated access to produtos" on public.produtos
for all to authenticated using (true) with check (true);

create policy "authenticated access to movimentacoes" on public.movimentacoes
for all to authenticated using (true) with check (true);

create policy "authenticated access to vendas" on public.vendas
for all to authenticated using (true) with check (true);

revoke execute on function public.registrar_movimentacao_estoque(bigint, text, integer) from anon;
revoke execute on function public.registrar_venda(bigint, integer) from anon;
grant execute on function public.registrar_movimentacao_estoque(bigint, text, integer) to authenticated;
grant execute on function public.registrar_venda(bigint, integer) to authenticated;

notify pgrst, 'reload schema';
