# Challenge Gonzalo Alvarez

1. Clonar proyecto

2. Ejecutar comando
```
yarn install
```

3. Levantar la base de datos
```
docker-compose up -d
```

4. Levantar en modo dev
```
yarn start:dev
```

5. Ejecutar seed
```
localhost:3000/api/seed/
```

6. Documentacion de los Endpoints en archivo
```
schema.gql
```

7. Al logearse con un usuario se le provee un token que se debe enviar en el header de cada request
```
Bearer (token)
```

8. Para probar los endpoints se puede utilizar el playground de graphql
```
localhost:3000/graphql
```

9. Para subir imagenes se debe hacer una peticion POST a el endpoint
```
localhost:3000/files/img
```

10. Para ver una imagen se debe hacer una peticion GET a el endpoint
```
localhost:3000/files/img/{imageName}
```

11. En caso de querer utilizar base de datos de AWS
Se debe cambiar el archivo app.module.ts y cambiar las variables de entorno a AWS, ejemplo:
```
DOCKER_DB_HOST
AWS_DB_HOST
```