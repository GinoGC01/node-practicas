// method GET, HEAD, OPTION, POST, PUT, DELETE, PATCH - investigar methods

¿Qué es HTTP?

PROTOCOLO DE TRANSFERENCIA DE HIPER TEXTO - HYPER TEXT TRANSFER PROTOCOL

protocolo de red mas utilizado en internet para transferencia de información

Una vez se lleva a cabo una conección, el usuario lleva a cabo una petición (REQUEST) donde envía URL, headers, method(GET), body. A esto, lo recibe el servidor al cual fué enviada esta REQUEST, este lo procesa y devuelve una respuesta (RESPONSE). En la RESPONSE viene la siguiente información: statusCode, headers, body.

En resumen, el usuario envia una petición de diferentes datos, a travez de un método. (url, headers, body) => method(GET) y el servidor responde con statusCode, headers, y body.

Para cada respuesta, el servidor devuelve un "StatusCode" que indica el estado de la petición y su orígen.

• 100-199: Respuestas Informativas
• 200-299: Respuestas Satisfactorias 
• 300-399: Redirecciónes
• 400-499: Errores del cliente 
• 500-599: Errores del servidor 

Los mas famosos son:

200 => Todo ok
301 => Moved Permanently
400 => Bad REQUEST (Syntax Error)
404 => Not Found
500 => Internal server Error

----------------------------------------------------------

"Buffer de datos" => Un buffer de datos en nodeJS es una clase global que se usa para trabajar datos binarios. Si se lee un archivo .png, por ejemplo, no se lee como uno espera, sino que se leen los datos binario. Entonces, se guardan en un espacio de la memoria física, de manera temporal para que puedan ser tratados.
