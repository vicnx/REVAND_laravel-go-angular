<p align="center">
    <img src="media/revand.png" alt="Revand" width="100px" >
</p>

## Qué es Docker?

<!-- ![Docker Image](media/docker.png) -->
<img src="media/docker.png" alt="docker" width="400px">


Docker es un **software opensource** que permite **crear, probar e implementar** aplicaciones rápidamente. Docker, como su nombre indica (**Contenedor**), crea **contenedores** con un conjunto de herramientas que permite el **diesplegue de aplicaciones rapidamente** desde cualquier máquina. Estos, al contrario que en las máquina virtuales convencionales, se **ejecutan utilizando directamente los recursos de nuestra máquina local**, permitiendo así un **mayor rendimiento**. Podemos hablar de **Docker como una solución para la gestión de contenedores**. Este nos proporciona una serie de herramientas que nos permiten **manejar el ciclo de vida de los contenedores.**

Los **desarrolladores** de software, utilizan Docker para **empaquetar las aplicaciones** dentro de contenedores, de esta manera, se pueden desplegar en cualquier otra máquina **sin tener en cuenta las dependencias y versiones necesarias** para su inicialización.

Docker crea dos conceptos, **imagen y contenedor**.

### Que es una imagen?
Podemos decir que una **imagen Docker** es una **plantilla que incluye las dependencias y aplicaciones necesarias**, para construir **contenedores Docker**. Por ejemplo, una imagen puede contener un Ubuntu 18.04 con Apache y la aplicación web instalada para funcionar. Estas imagenes son **estáticas**, es decir, nunca se modifican, por lo que todos los contenedores nuevos que creemos a partir de una imagen concreta serán iguales (al inicio).

Hay muchas **imágenes públicas** que podemos utilizar para desplegar nuestros contenedores, o como base de nuestra imagen. Estas las podemos encontrar en https://hub.docker.com

Además, podemos **crear** nuestras propias imágenes mediante **Dockerfiles**:

### Que es un Dockerfile?
Un Dockerfile es un **archivo de configuración para crear imagenes**. En dicho archivo indicamos qué es lo que queremos que tenga la imagen, y los distintos comandos para instalar las herramientas. Este es un ejemplo de un **Dockerfile:**
```
FROM node
RUN mkdir myapp
WORKDIR /myapp
COPY ./src .
EXPOSE 3000
RUN npm install
CMD [ "node","app.js" ]
```
En dicho ejemplo, estamos creando una **nueva imagen personalizada** a partir de una imagen (en Docker Hub) de **Node**. Además, **creamos un directorio de trabajo** donde se **copiará** el contenido de nuestra carpeta local ./src. Se **publicara el puerto 3000** y se instalarán las **dependencias necesarias** de del gestor de paquetes NPM. Finalmente, cada vez que se ejecute un contenedor con esta imagen, se lanzará el comando **node app.js**

Para crear una imagen a partir de nuestro Dockerfile, ejecutamos el comando:

```
sudo docker build .
```

### Que es un contenedor?
Un **contenedor es una instancia de una imagen.** Es decir, cuando queremos **ejecutar una imagen**, debemos hacerlo mediante un contenedor. Podemos crear tantos contenedores a partir de una imagen como queramos. **No se debe confundir contenedor con máquina virtual**. El concepto de contenedor es como si restauráramos una máquina virtual a partir de un snapshot. 
**Pero para que se pueden utilizar?** Por ejemplo, podemos tener **copias de la aplicación ejecutándose en varios contenedores**, para luego, a través de **balanceadores de carga**, distribuir los accesos a la aplicación, y ofrecer servicios con más garantías y con menos carga de peticiones en cada contenedor.

Para ejecutar un **contenedor a partir de una imagen**, lanzamos el comando:
```
sudo docker run nombre_imagen
```

### Como instalar Docker?
Para instalar docker, ejecutamos los **siguientes comandos:**
```
sudo apt update

sudo apt install apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"

sudo apt update

apt-cache policy docker-ce

sudo apt install docker-ce

sudo systemctl status docker

```


## Que es Docker Compose?
**Docker Compose**es una herramienta que **simplifica el uso de Docker.** Cuando necesitamos ejecutar **varios contenedores conjuntamente**, en la misma red, y por ejemplo, dependiente del estado de otro contenedor, utilizamos Docker-Compose para **agilizar y mejorar** este proceso. Cabe destacar que podemos utilizar ficheros docker-compose y Dockerfile conjuntamente para la creación de contenedores, es decir, **crear un contenedor en Docker-compose a partir de un Dockerfile.** Como se crea un **docker-compose.yml**?

### Como instalar Docker Compose?
Para instalar la versión stable, ejecutamos los siguientes comandos:
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
```
sudo chmod +x /usr/local/bin/docker-compose
```

Para verificar que se ha instalado correctamente:
```docker-compose -v```

Este es un ejemplo:
```
version: '3'

services:
  webmvc:
    image: eshop/webmvc
    environment:
      - CatalogUrl=http://catalog-api
      - OrderingUrl=http://ordering-api
      - BasketUrl=http://basket-api
    ports:
      - "5100:80"
    depends_on:
      - catalog-api
      - ordering-api
      - basket-api
```

Como ejecutar un fichero docker-compose.yml:
``` sudo docker-compose up ```

### Qué es Prometheus?

<!-- ![Prometheus Image](media/prometheus.png) -->
<img src="media/prometheus.png" alt="prometheus" width="400px">

**Prometheus** es un **sistema de monitorización** escrito en GO. Con este podemos almacenar **información sobre todos los logs de nuestra aplicación**, entre ellos, acceso a endpoints.

#### Características Principales
- **Modelo de datos multidimensional:** con datos de series de tiempo identificados por nombre métrico y claves/ valores pares.
- **Lenguaje flexible de consultas:** permite aprovechar esta multidimensionalidad para consultar los datos de manera simple y flexible.
- **Nodos autónomos de servidor único:** debido a la poca confianza en el almacenamiento distribuido, la colección de series de tiempo ocurre a través de un modelo de extracción, por medio de HTTP.
- **Configuración estática:** los objetivos se determinan mediante configuración estática o descubrimiento de servicios.

Para la creación de nuestro servidor Prometheus, utilizaremos el siguiente fichero de configuración **prometheus.yml**, ubicado en la carpeta **./prometheus**:

<!-- ![Prometheus Image](media/prometheus_cnf.png) -->
<img src="media/prometheus_cnf.png" alt="prometheus_cnf">



Para visualizar las métricas generadas por Prometheus, utilizaremos Grafana.

### Qué es Grafana?

<!-- ![Grafana Image](media/grafana.png) -->
<img src="media/grafana.png" alt="grafana" width="400px">


**Grafana** es una plataforma de **analisis de métricas**, perminiténdonos **consultar, visualizar, alertar y comprender** los fatos generados. Está escrita en Go y NodeJs y actualmente es u**na de las aplciaciones más utilizadas** para el analisis de metricas.

A partir de una serie de datos recolectados por (en nuestro caso) prometheus obtendremos un **panorama gráfico de la situación de nuestra aplicación.**

Para el despliegue de nuestra aplicación Grafana, utilizaremos el siguiente fichero de configuración **datasources.yml** ubucado en el directorio **./grafana**:

<!-- ![Grafana Image](media/grafana_cnf.png) -->
<img src="media/grafana_cnf.png" alt="grafana_cnf">

### Qué es Go?

<img src="media/go.png" alt="go" width="300px">

**Go** es un **nuevo lenguaje de programación** desarrollado por **Google**, nacido en 2009, pero se considera un lenguaje maduro con el cual se han desarrollado miles de proyectos alrededor del mundo. Es un lenguaje **tipado estático**, es decir, una vez declaremos una variable, esta no podrá cambiar de tipo en todo el programa, pero no es necesario indicarle el tipo al instanciarla. 

Es un lenguaje **extremadamente rápido**, ya que fue diseñado para la aumentar velocidad de nuestras aplicaciones. Su **eficencia es equiparable a C** y mucha gente opina que será su sustituto natural, ya que su **sintaxis está insiparada en este mismo.**

Go es muy famoso por su **facilidad para crear microservicios**, ya que es donde destaca realmente su eficiencia.

#### Que son los microservicios?

Los **microservicios** son un tipo de arquitectura que sirve para diseñar aplicaciones. Lo que distingue a la arquitectura de microservicios de los enfoques tradicionales y monolíticos es la forma en que **desglosa una aplicación en sus funciones principales**. Cada función se denomina **servicio** y se puede diseñar e implementar de forma independiente. Por ejemplo, podemos tener un microservicio de **usuarios, otro de productos, y uno de comentarios**. En el caso de que el servico de comentarios **falle**, nuestra aplicacion **seguira funcionando ya que es totalmente independiente.** 

### Qué es Traefik?

<!-- ![Traefik Image](media/traefik.png) -->
<img src="media/traefik.png" alt="traefik" width="400px">


**Traefik** es un **balanceador de carga y proxy inverso HTTP** moderno que **facilita la implementación de microservicios.** Este se integra con los componentes de su infraestructura existente ( Docker, Kubernetes, Amazon ECS, etc) y se configura automáticamente de forma dinámica.

#### ¿Qué es un balanceador de carga?

Un **balanceador de carga** asigna o **distribuye las solicitudes que llegan de los clientes** a los servidores usando un algoritmo, en nuestro caso, elegiremos a que microservicio Go debería ir la solicitud.

#### ¿Qué es un proxy inverso HTTP?

**Un proxy inverso** es un tipo de servidor proxy que **recupera recursos en nombre de un cliente**, es decir, recupera **la ruta establecida (example.com/blog)**. Éste permite a Traefik decidir a que servidor enviar la peticion.

### Refactorizar Docker-Compose utilizando extends

Vamos a refactorizar nuestro **docker-compose.yml** con la extensión **“extends”**.
Utilizando esta extensión podremos reutilizar parte del código en nuestros microservicios, de esta manera, los parámetros que tengan en común estos microservicios no estarán repetidos en el **docker-compose.yml**.

#### Precaución

Antes de empezar, la propiedad **extends** de docker-compose se inhabilito a partir de la versión 3 de archivo, pero investigando en diversos foros, al actualizar nuestra versión local de **docker-compose a v1.27.X**, este volvía a funcionar correctamente. Por lo que es necesario verificar nuestra versión de docker-compose para evitar posibles fallos.

<img src="media/compose-version.png" alt="Versión de Docker-Compose">

#### Crear fichero común

A continuación, creamos un nuevo archivo el cual nombraremos **common-services.yml**. Este archivo contendrá todo el código en común de nuestros microservicios:

<img src="media/common-services.png" alt="common-services.yml">

Una vez creado nuestro archivo en común, vamos a modificar nuestro **docker-compose.yml** para indicar a nuestros microservicios que utilicen el fichero **common-services.yml**. Cabe destacar que hay varios parámetros que no pueden ser extendidos ***(por ejemplo, container_name, depends_on, etc)***, además de otros los cuales deben ser únicos en cada microservicio, como los volumes o labels, donde se indica el Host que hace referencia a **Traefik**. Para extender nuestro servicio, incluimos en la parte superior de nuestro microservicio:

```
extends:
  file: common-services.yml
  service: microservices_go
```

Finalmente, nuestros microservicios se verían mucho más simplificados como podemos observar a continuación:

<img src="media/go_users_extends.png" alt="go_users_extends.png">

<img src="media/go_redis_extends.png" alt="go_redis_extends.png">

<img src="media/go_products_extends.png" alt="go_products_extends.png">




