# To Do List

### 26 de dezembro de 2023

#### OptionsContext
- [X] Melhorar nomes, como mudar de `_fetchdataBaseCurrencies` para `_fetchDataBaseCurrencies`.
    - Filtro no `useEffect` não precisa de `toLowerCase()`, somente no hook de busca.

#### BlackListedButton
- [X] Aprimorar a forma de adicionar moeda à lista negra.
    - Ao inserir, salvar ou editar no banco de dados e remover do componente `FlatListCurrencies` com uma atualização no hook `filteredByQuotation`.
- [] Hooks - FilteredByQuotation
    - Verificar se é possível ser simplesmente uma array, não um objecto com array `{quote: '', list: []}` -> `[]`.

- [] Header
    - Retitrar o cabeçalho, `options={{ headerShown: false }}`.
