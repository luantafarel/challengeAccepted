# Desafio proposto por Serasa Consumidor

## Base A
A Base A é descrita no problema como:
> Extremamente sensível e deve ser protegida com os maiores níveis de segurança, mas o acesso a esses dados não precisa ser tão performática.

Sub entende-se que a base de dados não pode sofrer com demoras pela performance de uma consulta. Nesse caso eu escolheria o banco de dados MySql para armazenar a Base A.

Implementações:
- A  base A deve ser feito com autenticação e criptografia.
- Como os dados são sensíveis acessos podem ser marcados no ElasticSerach para registrar logs.
- Os retornos devem ser expostos apenas a usuários cadastrados como admistradores do sistema, um usuário deve ser capaz de ver seu próprio retorno.

## Base B
A Base A é descrita no problema como:
> Também possui dados críticos, mas ao contrário da Base A, o acesso precisa ser um pouco mais rápido. Uma outra característica da Base B é que além de consultas ela é utilizada para extração de dados por meio de algoritmos de aprendizado de máquina.

Sub entende-se que a base de dados não se importa em sofrer leves perdas de performance. mas necessita de uma leve melhoria de performance em relação a base de dados A. Para tal usaria um banco de dados chamado Cassandra Db.

> O Cassandra é um banco de dados não relacional e colunar, ele  é considerado um banco AP (Availability / Partition Tolerance) por ser altamente escalável e distribuído. Como ele não tem transações em determinados momentos, a leitura dos dados pode não ter consistência, tendo em vista que o Cassandra demora alguns milissegundos para reorganizar o cluster.

Existe a possibilidade de usar MongoDb nesse trecho, mas daria preferencia ao Cassandra
#####Razões:
- [Benchmark](https://www.datastax.com/nosql-databases/benchmarks-cassandra-vs-mongodb-vs-hbase)
- [Scalegrid](https://scalegrid.io/blog/cassandra-vs-mongodb/)

Implementações:
- A  base B deve ser feito com autenticação e criptografia.
- Como os dados são sensíveis acessos podem ser marcados no ElasticSerach para registrar logs.
- Os retornos devem ser expostos apenas a usuários cadastrados como admistradores do sistema, um usuário deve ser capaz de ver seu próprio retorno.


A AWS oferece um serviço chamado [Cognito](https://aws.amazon.com/pt/cognito/) que gerencia, cadastros, logins e acessos. Muito usado por plataformas como Ifood.  Que poderia ser usado para gerenciar os acessos e as permissões de usuários para os serviços.

## Base C
A Base C é descrita no problema como:
> Não possui nenhum tipo de dado crítico, mas precisa de um acesso extremamente rápido.

Sub entende-se que a performance é o foco dessa base.

O banco que fornece melhor performance de leitura e escrita é o Redis, por salvar seus dados em memória.

Implementações:
- Acesso a base C pode ser feito sem criptografia.
- Acesso base C deve ser feito com autenticação.
- Não é necessário registrar logs.
- Os retornos devem ser expostos a todos os usuários, mas dados sigilosos devem ser expostos apenas ao usuário dono do cadastro.

# Challenge Accepted
