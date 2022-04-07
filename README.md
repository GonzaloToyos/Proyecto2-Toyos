Funcionamiento

Se puede registrar un usuario y luego acceder al login para ingresar con él. No se puede registrar un usuario ya existente.
El login verifica que el usuario exista y comprueba que haya ingresado bien su contraseña.
Una vez validado nos lleva a la página home, en donde se pueden ver las comidas.
La página Home actualmente muestra la vista del admin, sin importar qué usuario se usa.
La viste del cliente no tendría la card para agregar más comidas.
Cada card de comida se puede seleccionar apretando en "más info".
Desde ahí se la puede editar y eliminar. Esto solo lo puede hacer el admin aunque todavía no hace diferencia de usuarios.
Cuando se edita o agregar una comida hay que recargar la pagina para ver los cambios implementados, cuando se elimina no es necesario.

ACTUALIZACIÓN TERCERA ENTREGA
Ahora se diferencia entre usuario de administrador y cliente. El admin es el usuario "prueba" que sugiere el login, cualquier otro es cliente. El admin puede eliminar, editar y agregar comidas. Ahora también puede ver los pedidos activos y darlos por terminados.
El cliente puede hacer un pedido eligiendo las comidas y cantidad desde las cards. El pedido lo puede ver en el carrito, en donde se detallan los productos y el precio total.
El proyecto tiene un error con el v-model de los productos en el carrito, ya que al cambiar la cantidad en una card se actualiza también en el carrito. Esto no pude resolverlo.

# primera-entrega

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
