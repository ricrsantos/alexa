const Alexa = require('ask-sdk-core');
var consts = require('./consts');
var https = require('https');

function httpAction(method_type, data) {
  return new Promise(((resolve, reject) => {
    var options = {
        hostname: "fksweb.com.br",
        path: "/alexa/index.php",
        method: method_type,
        headers: 
          {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': Buffer.byteLength(data, 'utf8') //data.length
          }
    };
    
    console.log('httpAction ' + method_type/* + ' action ' + action*/);
    const request = https.request(options, (response) => {
      response.setEncoding('utf8');
      let returnData = '';

      response.on('data', (chunk) => {
        returnData += chunk;
        console.log('httpAction data ' + returnData);

      });

      response.on('end', () => {
         const resposta = JSON.parse(returnData);
        //resolve(JSON.parse(returnData));
        console.log('httpAction end ' + returnData);
        resolve(resposta);
      });

      response.on('error', (error) => {
          console.error('httpAction error ' + error);
        reject(error);
      });
    });
    request.write(data, "utf-8")
    request.end();
  }));
}

function trataErroResposta(resposta) {
    if ((resposta.status >= consts.RESPOSTA_ERRO_SQL) && (resposta.status <= consts.RESPOSTA_OPEN_SEM_REDE)) {
        switch (resposta.status) {
            case consts.RESPOSTA_ERRO_SQL :
                return consts.MSG_ERRO_SQL;
            case consts.RESPOSTA_PARAMETROS_INVALIDOS1 :
                return consts.MSG_PARAMETROS_INVALIDOS1;
            case consts.RESPOSTA_PARAMETROS_INVALIDOS2 :
                return consts.MSG_PARAMETROS_INVALIDOS2;
            case consts.RESPOSTA_PARAMETROS_INVALIDOS3 :
                return consts.MSG_PARAMETROS_INVALIDOS3;
            case consts.RESPOSTA_PARAMETROS_INVALIDOS4 :
                return consts.MSG_PARAMETROS_INVALIDOS4;
            case consts.RESPOSTA_PARAMETROS_INVALIDOS5 :
                return consts.MSG_PARAMETROS_INVALIDOS5;
            case consts.RESPOSTA_PARAMETROS_INVALIDOS6 :
                return consts.MSG_PARAMETROS_INVALIDOS6;
            case consts.RESPOSTA_PARAMETROS_INVALIDOS7 :
                return consts.MSG_PARAMETROS_INVALIDOS7;
            case consts.RESPOSTA_COMANDO_INVALIDO :
                return consts.MSG_COMANDO_INVALIDO;
            case consts.RESPOSTA_OPEN_SEM_CADASTRO:
                return consts.MSG_OPEN_SEM_CADASTRO;
            case consts.RESPOSTA_OPEN_SEM_REDE:
                return consts.MSG_OPEN_SEM_REDE;
            default :
                return consts.MSG_ERRO_DESCONHECIDO;
        }
    }
    else {
        return false;
    }
}


const LaunchRequestHandler = 
{
    canHandle(handlerInput) 
    {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) 
    {
        const data = JSON.stringify(
        {
          "action": consts.COMANDO_OPEN,
          "user_id": handlerInput.requestEnvelope.session.user.userId
        })
        
        let json_response = await httpAction("POST", data);
        let response_alexa = "";
        const erro = trataErroResposta(json_response);
        if (erro === false) {
            switch (json_response.status) {
                case consts.RESPOSTA_OPEN_SEM_REDE :
                    response_alexa = consts.MSG_OPEN_SEM_REDE;
                    break;
                case consts.RESPOSTA_OPEN_SEM_REDE_OP :
                    response_alexa = consts.MSG_OPEN_SEM_REDE_OP;
                    response_alexa = response_alexa.replace("%1", json_response.msg);
                case consts.RESPOSTA_OPEN_COM_REDE :
                    response_alexa = consts.MSG_OPEN_COM_REDE;
                    response_alexa = response_alexa.replace("%1", json_response.msg);
                    break;
            }
        }
        else {
            response_alexa = erro;
        }

        console.log('Enviar para alexa ' + response_alexa);

        return handlerInput.responseBuilder
                    .speak(response_alexa)
                    .reprompt(response_alexa)
                    .getResponse();
                    
    }
    
};

const intentAdicionarHandler = 
{
    canHandle(handlerInput) 
    {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'intentAdicionar');
    },
    async handle(handlerInput) 
    {
        console.log("ESTOU EM intentAdicionar");
        const user_id = handlerInput.requestEnvelope.session.user.userId; 
        const token = handlerInput.requestEnvelope.request.intent.slots.token.value;
        
        const data = JSON.stringify(
        {
          "action": consts.COMANDO_INCLUDE,
          "user_id": handlerInput.requestEnvelope.session.user.userId,
          "token": token
        })
        
        let json_response = await httpAction("POST", data);
        let response_alexa = "";
        const erro = trataErroResposta(json_response);
        if (erro === false) {
            switch (json_response.status) {
                case consts.RESPOSTA_TOKEN_NAO_ENCONTRADO :
                    response_alexa = consts.MSG_TOKEN_NAO_ENCONTRADO;
                    break;
                case consts.RESPOSTA_TOKEN_INVALIDO :
                    response_alexa = consts.MSG_TOKEN_INVALIDO;
                    //response_alexa = response_alexa.replace("%1", json_response.msg);
                    break;
                case consts.RESPOSTA_TOKEN_VAZIO :
                    response_alexa = consts.MSG_TOKEN_VAZIO;
                    break;
                case consts.RESPOSTA_INCLUDE_OK :
                    response_alexa = consts.MSG_INCLUDE_OK;
                    response_alexa = response_alexa.replace("%1", json_response.msg);
                    break;
            }
        }
        else {
            response_alexa = erro;
        }

        console.log('Enviar para alexa ' + response_alexa);

        return handlerInput.responseBuilder
                    .speak(response_alexa)
                    .reprompt(response_alexa)
                    .getResponse();
    }
};

const intentMeusHandler = 
{
    canHandle(handlerInput) 
    {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'intentMeus');
    },
    async handle(handlerInput) 
    {
        console.log("ESTOU EM disposivosIntentHandler")
        
        let funcao = consts.COMANDO_DISPOSITIVOS;

        const data = JSON.stringify(
        {
          "action": funcao,
          "user_id": handlerInput.requestEnvelope.session.user.userId
        });
        
        
        let json_response = await httpAction("POST", data);
        let response_alexa = "";
        const erro = trataErroResposta(json_response);
        if (erro === false) {
            response_alexa = json_response.status;
        }
        else {
            response_alexa = erro;
        }

        console.log('Enviar para alexa ' + response_alexa);

        return handlerInput.responseBuilder
                    .speak(response_alexa)
                    .reprompt(response_alexa)
                    .getResponse();
    }
};

const intentSelecionarHandler = 
{
    canHandle(handlerInput) 
    {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'intentSelecionar');
    },
    async handle(handlerInput) 
    {
        console.log("ESTOU EM intentSelecionarHandler");
        const user_id = handlerInput.requestEnvelope.session.user.userId; 
        const dispositivo = handlerInput.requestEnvelope.request.intent.slots.dispositivo.value;
        const data = JSON.stringify(
        {
          "action": consts.COMANDO_SELECIONAR,
          "user_id": handlerInput.requestEnvelope.session.user.userId,
          "dispositivo": dispositivo
          //"json" : JSON.stringify(handlerInput)
        })
        
        let json_response = await httpAction("POST", data);
        let response_alexa = "";
        const erro = trataErroResposta(json_response);
        if (erro === false) {
            switch (json_response.status) {
                case consts.RESPOSTA_REDE_NAO_ENCONTRADA :
                    response_alexa = consts.MSG_REDE_NAO_ENCONTRADA;
                    break;
                case consts.RESPOSTA_REDE_ALTERADA :
                    response_alexa = consts.MSG_REDE_ALTERADA;
                    response_alexa = response_alexa.replace("%1", json_response.msg);
                    break;
            }
        }
        else {
            response_alexa = erro;
        }

        console.log('Enviar para alexa ' + response_alexa);

        return handlerInput.responseBuilder
                    .speak(response_alexa)
                    .reprompt(response_alexa)
                    .getResponse();
    }
};

const ligaDesligaIntentHandler = 
{
    canHandle(handlerInput) 
    {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'intentLigar' 
            || Alexa.getIntentName(handlerInput.requestEnvelope) === 'intentDesligar');
    }, 
    async handle(handlerInput) 
    {
        /*
        let device = "";
        
        if (typeof handlerInput.requestEnvelope.request.intent.slots.device !== "undefined") {
            device = handlerInput.requestEnvelope.request.intent.slots.device.value;
        }
        else {
            device = handlerInput.requestEnvelope.request.intent.slots.dispositivo.value;
        }
*/
        console.log("ESTOU EM ligaDesligaIntentHandler")
        
        let funcao = consts.COMANDO_LIGAR;
        if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'intentDesligar') {
            funcao = consts.COMANDO_DESLIGAR;
        }
        
        let central = "";
        central = handlerInput.requestEnvelope.request.intent.slots.central.value;

        const data = JSON.stringify(
        {
          "action": funcao,
          "user_id": handlerInput.requestEnvelope.session.user.userId,
          "central": central
        })
        
        
        let json_response = await httpAction("POST", data);
        let response_alexa = "";
        const erro = trataErroResposta(json_response);
        if (erro === false) {
            switch (json_response.status) {
                case consts.CENTRAL_NAO_RESPONDE :
                    response_alexa = consts.MSG_CENTRAL_NAO_RESPONDE;
                    //response_alexa = response_alexa.replace("%1", json_response.msg);
                    break;
                case consts.CENTRAL_COMANDO_NAO_EXECUTADO :
                    response_alexa = consts.MSG_CENTRAL_COMANDO_NAO_EXECUTADO;
                    //response_alexa = response_alexa.replace("%1", json_response.msg);
                    break;
                case consts.RESPOSTA_DEVICE_LIGADO :
                    response_alexa = consts.MSG_DEVICE_LIGADO;
                    response_alexa = response_alexa.replace("%1", json_response.msg);
                    break;
                case consts.RESPOSTA_DEVICE_DESLIGADO :
                    response_alexa = consts.MSG_DEVICE_DESLIGADO;
                    response_alexa = response_alexa.replace("%1", json_response.msg); 
                    break;
                case consts.RESPOSTA_CENTRAL_JA_ARMADA :
                    response_alexa = consts.MSG_CENTRAL_JA_ARMADA;
                    break;
                case consts.RESPOSTA_CENTRAL_JA_DESARMADA :
                    response_alexa = consts.MSG_CENTRAL_JA_DESARMADA;
                    break;
                default: 
                    response_alexa = json_response.msg;
            }
        }
        else {
            response_alexa = erro;
        }

        console.log('Enviar para alexa ' + response_alexa);

        return handlerInput.responseBuilder
                    .speak(response_alexa)
                    .reprompt(response_alexa)
                    .getResponse();
    }
};

const statusIntentHandler = 
{
    canHandle(handlerInput) 
    {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'intentStatus'
            ||  Alexa.getIntentName(handlerInput.requestEnvelope) === 'intentSetores');
    },
    async handle(handlerInput) 
    {
        console.log("ESTOU EM statusIntentHandler")
        
        let funcao = consts.COMANDO_STATUS;
         if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'intentSetores') {
            funcao = consts.COMANDO_SETORES;
        }
        
        let central = "";
        central = handlerInput.requestEnvelope.request.intent.slots.central.value;
        
        const data = JSON.stringify(
        {
          "action": funcao,
          "user_id": handlerInput.requestEnvelope.session.user.userId,
          "central": central
        });
        
        
        let json_response = await httpAction("POST", data);
        let response_alexa = "";
        const erro = trataErroResposta(json_response);
        if (erro === false) {
            response_alexa = json_response.status;
        }
        else {
            response_alexa = erro;
        }

        console.log('Enviar para alexa ' + response_alexa);

        return handlerInput.responseBuilder
                    .speak(response_alexa)
                    .reprompt(response_alexa)
                    .getResponse();
    }
};

const intentBloquearHandler = 
{
    canHandle(handlerInput) 
    {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'intentBloquear'
            || Alexa.getIntentName(handlerInput.requestEnvelope) === 'intentDesbloquear');
    },
    async handle(handlerInput) 
    {
        console.log("ESTOU EM intentBloquearHandler")
        
        let setor = "";
        
        setor = handlerInput.requestEnvelope.request.intent.slots.setor.value;
        
        
        let funcao = consts.COMANDO_BLOQUEAR;
        if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'intentDesbloquear') {
            funcao = consts.COMANDO_DESBLOQUEAR;
        }
        
        const data = JSON.stringify(
        {
          "action": funcao,
          "user_id": handlerInput.requestEnvelope.session.user.userId,
          "setor": setor
        });
        
        
        let json_response = await httpAction("POST", data);
        let response_alexa = "";
        const erro = trataErroResposta(json_response);
        if (erro === false) {
            response_alexa = json_response.status;
        }
        else {
            response_alexa = erro;
        }

        console.log('Enviar para alexa ' + response_alexa);

        return handlerInput.responseBuilder
                    .speak(response_alexa)
                    .reprompt(response_alexa)
                    .getResponse();
    }
};

const intentPGMHandler = 
{
    canHandle(handlerInput) 
    {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'intentLigarPGM'
            || Alexa.getIntentName(handlerInput.requestEnvelope) === 'intentDesligarPGM');
    },
    async handle(handlerInput) 
    {
        console.log("ESTOU EM intentPGMHandler")
        
        let pgm = "";
        
        pgm = handlerInput.requestEnvelope.request.intent.slots.pgm.value;
        
        
        let funcao = consts.COMANDO_LIGAR_PGM;
        if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'intentDesligarPGM') {
            funcao = consts.COMANDO_DESLIGAR_PGM;
        }
        
        const data = JSON.stringify(
        {
          "action": funcao,
          "user_id": handlerInput.requestEnvelope.session.user.userId,
          "setor": setor
        });
        
        
        let json_response = await httpAction("POST", data);
        let response_alexa = "";
        const erro = trataErroResposta(json_response);
        if (erro === false) {
            response_alexa = json_response.status;
        }
        else {
            response_alexa = erro;
        }

        console.log('Enviar para alexa ' + response_alexa);

        return handlerInput.responseBuilder
                    .speak(response_alexa)
                    .reprompt(response_alexa)
                    .getResponse();
    }
};

const HelpIntentHandler = 
{
    canHandle(handlerInput) 
    {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) 
    {
        const speakOutput = 'Para vincular uma rede você deve possuir uma produto da FKS, instalado e funcional, além do aplicativo FKS em seu smartphone, após acesse o aplicativo FKS e selecione a opção Comando de Voz, você receberá um número que deve ser utilizado para vincular ao seu produto! Você gostaria de continuar e executar mais algum comando? Se sim, por favor diga seu comando, caso não é só falar cancela que iremos fechar esta ajuda!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = 
{
    canHandle(handlerInput) 
    {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) 
    {
        const speakOutput = 'Tchau, saindo da FKS alarmes!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    }
};

const SessionEndedRequestHandler = 
{
    canHandle(handlerInput) 
    {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        //return handlerInput.responseBuilder.getResponse();
        const speakOutput = 'Ok, central não vinculada, você pode tentar novamente ou dizer cancela para sair!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Você disse ${intentName}?`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Desculpe, não entendi, poderia repetir?`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        intentAdicionarHandler,
        intentMeusHandler,
        intentSelecionarHandler,
        ligaDesligaIntentHandler,
        statusIntentHandler,
        intentBloquearHandler,
        intentPGMHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
