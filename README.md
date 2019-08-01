# Desafio proposto por Serasa Consumidor

## Base A
A Base A é descrita no problema como:
> Extremamente sensível e deve ser protegida com os maiores níveis de segurança, mas o acesso a esses dados não precisa ser tão performática.

Sub entende-se que é aceitável que a base de dados sofra com algumas demoras pela performance de uma consulta. Nesse caso eu escolheria o banco de dados MySql para armazenar a Base A.

Implementações:
- A  base A deve ser feito com autenticação e criptografia.
- Como os dados são sensíveis acessos podem ser marcados no ElasticSerach para registrar logs.
- Os retornos devem ser:
  - Completos se o usuário estiver buscando por ele mesmo.
    - Além de todos os dados do usuário deve-se retornar como ele se encontra em relação a quantidade de dívidas das outras pessoas do seu estado, cidade, país
  > Easter egg, usar o primeiro nome e descobir como se encontra a quantidade de dívidas do usuário em relação as pessoas de mesmo nome.
  - Apenas nome e quantidade de Dívidas se algum outro usuário logado em uma conta diferente da que está buscando fizer a busca.
  - Existem a possibilidade de outras buscas como: 
    - Retornar a quantidade de divídas por estado, cidade, país

Modelagem do banco de dados:

![](https://i.imgur.com/mJ7Z8W2.jpg)
  
Todas as tabelas devem possuir data de criação, edição e remoção.

Lista de tarefas
- [x] Criar banco de dados e migração
- [ ] Desenvolver a api
- [ ] Desenvolver testes unitários

## Base B
A Base B é descrita no problema como:
> Também possui dados críticos, mas ao contrário da Base A, o acesso precisa ser um pouco mais rápido. Uma outra característica da Base B é que além de consultas ela é utilizada para extração de dados por meio de algoritmos de aprendizado de máquina.

Sub entende-se que a base de dados não deve sofrer com perdas de performance e vai ser acessada frequentemente por ferramentas automatizadas. Para tal usaria um banco nosql, por exemplo Cassandra Db.

> O Cassandra é um banco de dados não relacional e colunar, ele é considerado um banco AP (Availability / Partition Tolerance) por ser altamente escalável e distribuído. Como ele não tem transações em determinados momentos, a leitura dos dados pode não ter consistência, tendo em vista que o Cassandra demora alguns milissegundos para reorganizar o cluster (consistência eventual).

Existe a possibilidade de usar MongoDb nesse trecho, mas daria preferencia ao Cassandra
#####Razões:
- [Benchmark](https://www.datastax.com/nosql-databases/benchmarks-cassandra-vs-mongodb-vs-hbase)
- [Scalegrid](https://scalegrid.io/blog/cassandra-vs-mongodb/)

Implementações:
- A base B deve ser feita com autenticação e criptografia.
- Como os dados são sensíveis acessos podem ser marcados no ElasticSerach para registrar logs.
- Os retornos devem ser:
  - Completos se o usuário estiver buscando por ele mesmo.
    - Além disso deve-se calcular seu score pessoal de crédito e formas de aumentá-lo.
      - Esse cálculo será feito partindo do pré-suposto que a pessoa possuí crédito 0
        - O cálculo do score será (salário x 1/5) como eu não tenho informação da quantidade de dívidas e da inadimplência do usuário vou assumir que se ele receber 5000 ele pode possuir um score 1000
        - O resultado deve ser somado aos bens x um numero que pode ser 300, 400 ou 500, caso o usuário possua um  carro, apartamento ou casa.
    - É possível ver como está seu score em relação a outros usuários da mesma idade, da mesma cidade e estado.
 - É possivel apenas ver o score de outros usuários.
  - Apenas nome e quantidade de Dívidas se algum outro usuário logado em uma conta diferente da que está buscando fizer a busca.
  - Existem a possibilidade de outras buscas como: 
    - Retornar a quantidade de divídas por estado, cidade, país

Modelagem do banco de dados.

Tabela de usuário:
  - id
  - idade
  _ address_id

Tabela de endereço:
  - id
  - rua
  - cidade
  - estado
  - pais

Tabela de lista de lista de bens:
  - id
  - bem
  - tipo de bem
  - user_id

Tabela de fonte de renda:
  - id
  - descrição
  - valor
  - user_id

Todas as tabelas devem possuir data de criação, edição e remoção.

Lista de tarefas
- [x] Criar banco de dados e migração
- [ ] Desenvolver a api
- [ ] Desenvolver testes unitários

## Base C
A Base C é descrita no problema como:
> Não possui nenhum tipo de dado crítico, mas precisa de um acesso extremamente rápido.

Sub entende-se que a performance é o foco dessa base.

O banco que fornece melhor performance de leitura e escrita é o Redis, por salvar seus dados em memória.

Implementações:
- Acesso a base C pode ser feito sem criptografia.
- Acesso base C deve ser feito com autenticação.
- Não é necessário registrar logs.
- Os retornos devem ser:
  - Completos e apenas deve ser possível buscar a si mesmo.
  
Modelagem do banco de dados.

Tabela de consultas do cpf:
  - id
  - cpf
  _ las_access
  - lasBuy_id

Tabela de movimentação do cpf:
  - user_id
  - descrição
  - valor
  - data

Tabela de lista de última compra no CPF:
  - user_id
  - valor da compra
  - data
  - a_vista - (bool)

Lista de tarefas
- [x] Criar banco de dados e migração
- [ ] Desenvolver a api
- [ ] Desenvolver testes unitários

> Caso haja tempo hábil será usado um serviço da AWS chamado [Cognito](https://aws.amazon.com/pt/cognito/) que gerencia cadastros, logins, acessos e permissões de usuário, utilizado em diversas plataformas como por exemplo o Ifood.

# Challenge Accepted


#Final Report

- A tarefa não determinava certamente qual banco ou linguagem usar, mas resolvi sair da zona de conforto e mostrar que eu tinha capacidade de lidar com qualquer coisa que fosse proposta.
- Claro que isso gerou atrasos com a curva de aprendizagem da linguagem, mas valeu a pena, dando certo ou não a oportunidade sou grato pelo conhecimento adquirido.
- Não removi os arquivos que foram gerados automáticamente no processo de desenvolvimento. 

#Conclusão

- Apesar dos esforços me faltou experiência para terminar a implementação da tarefa em python, perdi o computador que estava usando no processo e não consegui reaver o que precisava para continuar a implementação. 
- Para não ficar sem implementar nada implementei a solução em node da baseA mas como só utilizei 4 horas e preciso viajar não consigo implementar as outras bases.
- Para rodar apenas utilize o comando 
  - docker-compose.yml up
  - npm install
  - npm run migrate
  - npm start
  - pode-se utilizar pm2 logs para acessá-los

##### Muito obrigado pela oportunidade de conhecê-los e espero poder fazer o processo novamente quando tiver mais experiência em python. Estou a disposição para conversar sobre o projeto.
