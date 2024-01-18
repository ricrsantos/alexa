function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define('MSG_OPEN_SEM_REDE', 'Bem vindo a FKS alarmes, você não possui nenhum dispositivo cadastrado. Para cadastrar um dispositivo, você deve possuir um produto FKS funcional em seu aplicativo FKS!');
define('MSG_OPEN_SEM_CADASTRO', 'Bem vindo a FKS alarmes, você não possui nenhum dispositivo cadastrado. Para cadastrar um dispositivo, você deve possuir um produto FKS funcional em seu aplicativo FKS! Caso já possua um produto, após esta mensagem diga "CADASTRAR", mais o número de 6 dígitos gerado pelo aplicativo FKS no menu Alexa!');
define('MSG_OPEN_SEM_REDE_OP', 'Bem vindo a FKS alarmes, deseja se conectar com qual dispositivo? %1');
define('MSG_OPEN_COM_REDE', 'Bem vindo a FKS alarmes, você gostaria de executar qual comando?');
define('MSG_TOKEN_NAO_ENCONTRADO', 'ops, desculpe não encontramos seu token! Diga novamente, cadastrar e o número de seu token de seis dígitos pausadamente ou cancela para sair!');
define('MSG_TOKEN_INVALIDO', 'ops, desculpe o token informado não é válido, pode ser que tenha passado a validade de seu token, por favor gere um novo token no botão configuração adicionar comando de voz e tente novamente!');
define('MSG_TOKEN_VAZIO', 'você deve informar um token! Caso ainda não possua um token, entre em seu dispositivo no aplicativo FKS, na area de configuração no botão comando de voz! Lembre que seu token tem validade por apenas 5 minutos, depois deste período deve ser gerado um novo token!');
define('MSG_PARAMETROS_INVALIDOS1', 'parâmetros inválidos 1. fale com a fks!');
define('MSG_PARAMETROS_INVALIDOS2', 'parâmetros inválidos 2. fale com a fks!');
define('MSG_PARAMETROS_INVALIDOS3', 'parâmetros inválidos 3. fale com a fks!');
define('MSG_PARAMETROS_INVALIDOS4', 'parâmetros inválidos 4. fale com a fks!');
define('MSG_PARAMETROS_INVALIDOS5', 'parâmetros inválidos 5. fale com a fks!');
define('MSG_PARAMETROS_INVALIDOS6', 'parâmetros inválidos 6. fale com a fks!');
define('MSG_PARAMETROS_INVALIDOS7', 'parâmetros inválidos 7. fale com a fks!');
define('MSG_TOKEN_EXPIRADO', '');
define('MSG_ERRO_SQL', 'erro interno');
define('MSG_INCLUDE_OK', 'legal %1! Agora você já pode comandar seus dispositivos utilizando a Alexa, é só dizer: Alexa, f. k. s.. e pedir para ligar, desligar, bloquear setores, acionar pgm dos seus dispositivos dispositivo! Para começar diga meus dispositivos!');
define('MSG_COMANDO_INVALIDO', 'que pena, comando 1% inválido! Por favor utilize comandos válidos, como por exemplo: ligar, desligar, status ou cancela para sair!');
define('MSG_ERRO_DESCONHECIDO', 'hummm acho que ocorreu um erro inesperado, por favor repita seu comando ou diga cancela para sair!');
define('MSG_DEVICE_LIGADO', 'foi enviado o comando para a central ser ativada, para verificar o estado da central diga, ESTADO!');
define('MSG_DEVICE_DESLIGADO', 'foi enviado o comando para a central ser desativada, para verificar o estado da central diga, ESTADO!');
define('MSG_CENTRAL_JA_ARMADA', 'a central já está ativada!');
define('MSG_CENTRAL_JA_DESARMADA', 'a central já está desativada!');
define('MSG_REDE_NAO_ENCONTRADA', 'desculpe não encontrei este dispositivo!');
define('MSG_REDE_ALTERADA', 'muito bem, você está conectado %1, agora você já pode comandar utilizando a Alexa, é só dizer: Alexa, fks alarmes e pedir para ligar, desligar, bloquear setores, acionar pgm e verificar os estado deste dispositivo!');
define('MSG_GENERICA', 'comando %2 enviado para %1, você pode executar mais um comando ou falar cancela para sair! ');

define('MSG_STATUS_DESLIGADO', '%1 está desligado, você pode executar mais um comando ou falar cancela para sair!');
define('MSG_STATUS_LIGADO', '%1 está ligado, você pode executar mais um comando ou falar cancela para sair!');
define('MSG_STATUS_DIMERIZADO', '%1 está dimerizado em %2 porcento, você pode executar mais um comando ou falar cancela para sair!');
define('MSG_STATUS_SEM_MOVIMENTO', '%1 está sem movimento, você pode executar mais um comando ou falar cancela para sair!');
define('MSG_STATUS_COM_MOVIMENTO', '%1 está com movimento, você pode executar mais um comando ou falar cancela para sair!');
define('MSG_STATUS_PARADO', '%1 está parado, você pode executar mais um comando ou falar cancela para sair!');
define('MSG_STATUS_SUBINDO', '%1 está subindo, você pode executar mais um comando ou falar cancela para sair!');
define('MSG_STATUS_DESCENDO', '%1 está descendo, você pode executar mais um comando ou falar cancela para sair!');
define('MSG_STATUS_OCUPADO', '%1 está ocupado, você pode executar mais um comando ou falar cancela para sair!');
define('MSG_STATUS_IR_PARADO', '%1 está parado, você pode executar mais um comando ou falar cancela para sair!');
define('MSG_STATUS_IR_DISPARANDO', '%1 está disparando, você pode executar mais um comando ou falar cancela para sair!');
define('MSG_STATUS_MODO_DIA', '%1 está no modo dia, você pode executar mais um comando ou falar cancela para sair!');
define('MSG_STATUS_MODO_NOITE', '%1 está no modo noite, você pode executar mais um comando ou falar cancela para sair!');
define('MSG_STATUS_NORMAL', '%1 está normal, você pode executar mais um comando ou falar cancela para sair!');

define('MSG_CENTRAL_NAO_RESPONDE', 'O dispositivo não respondeu, tente novamente!');
define('MSG_CENTRAL_COMANDO_NAO_EXECUTADO', 'A central não executou o comando, tente novamente!');


define('COMANDO_OPEN', 'open');
define('COMANDO_INCLUDE', 'include');
define('COMANDO_DISPOSITIVOS', 'dispositivos');
define('COMANDO_VINCULAR', 'vincular');
define('COMANDO_LIGAR', 'ligar');
define('COMANDO_DESLIGAR', 'desligar');
define('COMANDO_SELECIONAR', 'selecionar');
define('COMANDO_STATUS', 'status');
define('COMANDO_SETORES', 'setores');
define('COMANDO_PGMS', 'pgms');
define('COMANDO_BLOQUEAR', 'bloquear');
define('COMANDO_DESBLOQUEAR', 'desbloquear');
define('COMANDO_LIGAR_PGM', 'ligar_pgm');
define('COMANDO_DESLIGAR_PGM', 'desligar_pgm');


define( 'CENTRAL_NAO_RESPONDE', 113 );
define( 'CENTRAL_COMANDO_NAO_EXECUTADO', 122 );

define('RESPOSTA_OPEN_SEM_REDE', 300);
define('RESPOSTA_OPEN_COM_REDE', 301);
define('RESPOSTA_TOKEN_NAO_ENCONTRADO', 302);
define('RESPOSTA_TOKEN_INVALIDO', 3103);
define('RESPOSTA_TOKEN_VAZIO', 304);
define('RESPOSTA_TOKEN_EXPIRADO', 309);
define('RESPOSTA_INCLUDE_OK', 311);
define('RESPOSTA_DEVICE_LIGADO', 312);
define('RESPOSTA_DEVICE_DESLIGADO', 313);
define('RESPOSTA_CENTRAL_JA_ARMADA', 314);
define('RESPOSTA_CENTRAL_JA_DESARMADA', 315);
define('RESPOSTA_REDE_NAO_ENCONTRADA', 316);
define('RESPOSTA_REDE_ALTERADA', 317);
define('RESPOSTA_OPEN_SEM_REDE_OP', 318);

define('RESPOSTA_ERRO_SQL', 200);
define('RESPOSTA_PARAMETROS_INVALIDOS1', 201);
define('RESPOSTA_PARAMETROS_INVALIDOS2', 202);
define('RESPOSTA_PARAMETROS_INVALIDOS3', 203);
define('RESPOSTA_PARAMETROS_INVALIDOS4', 204);
define('RESPOSTA_PARAMETROS_INVALIDOS5', 205);
define('RESPOSTA_PARAMETROS_INVALIDOS6', 206);
define('RESPOSTA_PARAMETROS_INVALIDOS7', 207);

define('RESPOSTA_OPEN_SEM_CADASTRO', 210);


define('RESPOSTA_COMANDO_INVALIDO', 250);