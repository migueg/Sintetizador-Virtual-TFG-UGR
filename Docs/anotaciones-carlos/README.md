Anotaciones sobre el PDF del día 6 de julio.

**Introducción, resumen**

(1) El resumen en inglés tiene un interlineado distinto al resto del texto, creo 
que también tiene un tipo de letra distinto.

**Secc. 1.2, página 20 (glosario de términos)**

(2) en varios sitios se dice "es lineal", "no es lineal", "no tiene porque ser lineal". 
En el primer uso de esa palabra habría que explicar que significa "lineal" en este contexto.

(3) "mili segundos" es una única palabra ("milisegundos")

(4) En la definición de "Release" aparace "despear"

**Secc. 2, objetivos**

(5) Habría que elaborar un poco más estos objetivos, también habría que diferenciar entre (a) los
objetivos personales del alumno (los que empiezan por "Estudiar", "Desarrollar"), y (b) los 
objetivos relacionados con la funcionalidad que se le requiere  al software a desarrollar 
("Simular el comportamiento", "Comunicar con dispositivos externos", "Integrar gráficos", y el
resto). En realidad, los objetivos del software son subobjetivos dentro del objetivo personal 
"Desarrollar ..." (no se si me explico...). Creo que este es un buen sitio para escribir algo sobre 
como funcionan los sintetizador para un lector que no esté muy metido en el tema. Ver la nota (16) 
más abajo.

**Secc 3.1. página 21**

(6) La frase "se dividen en 2 Sprint" debería ser "se dividen en 2 sprints". En general, en el
texto aparece "Sprint", pero creo que se debe usar "sprint" en su lugar.

(7) El segundo párrafo dice que se usa "Scrum", ese párrafo debería ser el primero.

(8) Revisar el espacio entre párrafos, debe ser siempre el mismo, en este caso no hay espacio entre
el primer y el segundo párrafo, ya que no se usa indentación debería haber siempre una línea entre
dos párrafos consecutivos. En otros muchos sitios hay el mismo problema (p.ej. en la sección 4.1.2)

**Págs 23-24, secc 3.1 y 3.2**

(9) En las tablas 3.1, 3.2 y 3,3 habría que alinear los números por la derecha, y que todos tengas 
los mismos dígitos decimales.

(10) En la tabla 3.3 habría que añadir una columna con el número de  unidades de cada elemento que
se suman al presupuesto.

**Secc 4.1.1., página 25**

(11) En el primer párrafo de la sección 4.1.1 se usa distinto tipo de letra para la primera y la 
segunda línea en adelante. Unificar tipos de letra en todo el documento. Igualmente, ese párrafo no
está justificado por la derecha. Igualarlo al resto.


**Secc. 4.1.2, página 26**

(12) Los párrafos son muy cortos y no están separados por líneas. Se usa el acrónimo PH, pero no se entiende muy bien que significa (definirlo en el primer uso).

**Secc 4.2.1, pág 27**

(13) En el 2o párrafo de la secc. 4.2.1. se habla, por un lado, de los "programas software de 
síntesis digital" (asumo que es un sinónimo de "sintetizador"), y por otro de "programas DAW", pero 
la frase "por lo que muchos de estos no se puede utilizar sin un programa de este tipo" es ambigua,
no se a que se refieren exactamente las palabras "estos" y "de este tipo". En general no queda claro
como se relacionan un "sintetizador" y un "DAW", que és cada cosa (aparte de la primera entrada del
glosario) Aclarar todo esto, introducir definiciones de "sintetizador" y "DAW", usaar algún 
diagrama.

**Secc 4.2.2. pág 31**

(14) En el "Escenario 01" se habla del DAW "Ableton Live", pero no se ha introducido antes este 
software concreto.

**Secc 4.3.1 (requisitos funcionales)**

(15) En RF-3.2.2 (pág 35), aparece "20k-0hz", creo que es una errata (debe ser quizás 0-20 Khz, igual que en RF-3.2.3)

(16) En general, creo que los requisitos funcionales se introducen sin que el lector tenga 
información de contexto sobre como es el software que se está diseñando, me refiero a que el 
software incluye un teclado de piano con el cual produce música pulsando las teclas, música que se 
ve afectada por los controles que se describen en esta sección. Esto lo tienes claro tú como usuario
habitual de los sintetizadores, pero debes hacerlo explicito en el texto, debería decirse 
explícitamente antes de introducir los requisitos funcionales. Creo que un buen lugar para hacerlo 
sería en la sección de objetivos, que ahora mismo se queda corta (ver la nota (5) más arriba)

(17) En los requisitos funcionales se usan términos que, salvo error mio, creo que no están 
definidos en el glosario (p.ej.HiCut, LowCut, Feedback, dry/wet, qui´zas alguno más), revisarlos y
añadir al glosario lo que corresponda.

**Secc. 4.3.2 (requisitos no funcionales)**

(17) Los requisitos RN-1, RN-3 y RN-4 son requisitos funcionales, habría que ponerlos en la sección
4.3.1, al principio, esto está relacionado con la nota anterior (16), en concreto el RN-4 es un 
requisito esencial, que debería estar entre los primeros requisitos.

**Secc. 4.4 (product backlog con sprints e historias de usuario**

(18) En HU.13 se usa el término "panear", creo que habría que definirlo en el primer uso.

(19) En HU.26 aparece "loguearme", debería ser "logearme", aunque, en general, en todo el texto, creo
que sería mejor evitar las palabras en Inglés (o adaptadas del Inglés al Español) cuando existan 
alternativas comunmente aceptadas en Español.  En este caso, por ejemplo, se puede usar "identificarme" 
en el lugar de "logearme". También se debe ser coherente, por ejemplo, aquí se usa "logear", pero en 
HU.27 se usa "hacer login"

**Secc. 5.1.1**

(20) En la figura 5.3 (pág.59) y su explicación, no queda claro la diferencia entre la componente 
"Web" y la componente "NodeJS (FrontEnd)", no me queda claro pq se usa Node JS en el front end, 
aclarar esto brevemente en el texto. Ver nota (26).


**Secc 5.2**

(21) en el primer párrafo de esta sección se repite "no relaccional" 

**Secc. 5.3.1, página 63-68**

(21) Se introducen los diagramas de interacción entre el front-end y el back-end, pero, aparte 
de los diagramas, no se relacionan las distintas peticiones ni se indican para que sirve cada 
una, en formato de texto, creo que sería bueno añadir una lista de peticiones y de cada una 
al menos una frase explicativa.

**Secciones 5.3.2 y 5.4.1**

(22) Centrar las figuras 5.8, 5.9 y 5.10. En la figura 5.4.10 no aparece explícitamente 
cual de los componentes que hay es la "Fachada", solucionar esto (es "Synth", se puede
añadir una etiqueta en el diagrama).

**Sección 5.4.4 (diagrama de clases)**

(23) En las figuras 5.16 y 5.17 (págs 77 y 78): no se puede leer el texto. Quizás sea 
mejor, en la medida que sea posible, hacer un diagrama con los nodos incluyendo simplemente 
el nombre la clase, y luego, para cada clase, incluir aparte dsu estructura (soy consciente 
de que no hay tiempo). Alternativamente, quizás se podrían incluir estos diagramas UML en 
una hoja de tamaño A3 en lugar de A4 (quizás como un anexo), de forma que ampliandolo se 
pudiera leer algo del texto.

**Secc 6.1.2 (conclusión del análisis de las tecnologías)**

(24) En esta sección o en la anterior creo que habría que añadir algo sobre la justificación 
del uso de _NodeJS_, _React_ y _Express_, aunque sea breve, ya que ahora mismo no hay nada 
al respecto.

**Sec. 6.2.2.1 (javascript)**

(25) Se dice que Javascript es compilado y también que es interpretado, es algo 
confuso. Creo que en general se puede decir que Javascript es interpretado, aunque 
algunos interpretes del lenguaje usen compilación JIT (durante la ejecución), pero lo 
segundo es un detalle menos importante. Además, creo que habría que añadir que Javascript
es un lenguaje no fuertemente tipado (no se declara el tipo de cada variable). También se 
dice que está basado en prototipos y que los objetos no  se crean mediante instanciación de 
clases. Sin embargo, en las últimas versiones de Javascript (ECMAscript 6) sí se pueden 
declarar clases y crear objetos como instancias de esas clases, de hecho este proyecto 
usa esas capacidades. Arreglarlo.

**Secc. 6.2.3 (entorno de ejecución)**

(26) No me queda claro el motivo de usar NodeJS para el front-end o para una parte del 
front-end, es lo mismo que digo en la nota (20). Aclararlo aquí brevemente. Creo que 
el motivo está relacionado con que quizás React usa Node JS, pero no lo se seguro, 
y en caso afirmativo, no se porque lo usa.

**Secc. 6.3.2 (instrucciones de ejecución)**

(27) No se dice si las instrucciones son válidas tanto para Linux como para Windows, 
aclararlo.

**Secc. 6.4.1.3.1.1 (AudioContext)**

(28)  Al inicio de la página 99 de define que es una _muestra_, se dice _Cada celda se 
corresponde con una muestra, la cual representa el valor del flujo de audio en un tipo 
de dato float32._.  Pero no queda claro que es el _valor de flujo_, sería bueno explicarlo 
muy brevemente. También, en la figura 6.1 habría que decir explicitamente que se trata del 
constructor de la clase `Synth`.

**Secc. 6.4.1.3.2 (repro de audio sin midi)**

(29) En la figura 6.6 (pág. 103), los _Gain Node_ de cada oscilador no aparecen conectados 
al _Gain Node_ común que controla el volumen de los altavoces. Pero en el texto se dice que sí están....
Además, creo que sería mejor incluir en el diagrama dos globos para el _master volume node_ y 
el _clean node_ que se referencian en el texto, ya que el texto es algo complicado de entender, y 
se vería más claro si se incorpora al diagrama.

(30) En la figura 6.7 hay unas llaves mal indentadas (las que cierran en _for_). En general, se 
debería revisar la indentación de los trozos de código, esta es solo un ejemplo, pero hay más.




