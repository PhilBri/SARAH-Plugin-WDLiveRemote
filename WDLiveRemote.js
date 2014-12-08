/* MEMO....
POST /cgi-bin/toServerValue.cgi HTTP/1.1\x0D\x0AContent-Length: 14\x0D\x0AContent-Type: 
text/plain; charset=ISO-8859-1\x0D\x0AHost: 192.168.1.1:3388\x0D\x0AConnection: Keep-
Alive\x0D\x0A\x0D\x0A{"remote":"w"}*/

/*__________________________________________________
|              WDLiveRemote v0.9                    |
|                                                   |
| Authors : Phil Bri                                |
|    (See http://encausse.wordpress.com/s-a-r-a-h/) |
| Description :                                     |
|    WDLive Plugin for SARAH project                |
|___________________________________________________|
*/

exports.action = function ( data , callback , config , SARAH ) {
    var cfg = config.module.WDLiveRemote;
    var cmd = data.cmd;
/*
    if ( ! cfg.WDLive_IP ) {
        console.log ( 'WDLiveRemote => Pas d\'adresse IP configurée dans WDLiveRemote.prop !' );
        callback ({ 'tts': 'Adresse I P incorrecte ou absente !' });
        return;
    }
*/
    var myForm  = require ( 'querystring' ).parse ( 'remote =' + cmd);
    var myLen   = require ( 'querystring' ).stringify ( myForm ).length,
 

    request.post ({

        uri     :   'http://192.168.1.25:10184/cgi-bin/toServerValue.cgi', 
        headers :   { 
                    'Content-Length': myLen,
                    'Connection'    : 'Keep-Alive',
                    'Content-Type'  : 'text/plain'
                    },
        form    :   myForm

    }, function ( err, httpResponse, body ) {
        
        if ( err || httpResponse.statusCode != 200 ) {

            console.log ( "WDLiveRemote : Action échouée => "  + err );
            callback ({ 'tts' : "L'action à échouée !" });
            return;
        }
        
        console.log ( 'WDLiveRemote : ' + cmd + ' => OK !\r\n' );
        callback ({ 'tts' : data.ttsAction });
    });
}