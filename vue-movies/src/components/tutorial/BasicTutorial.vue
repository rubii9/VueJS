<template>
  <div>
    <h1>Vue tutorial</h1>

    <div class="container">
      <h2>Interpolación</h2>
      <p>{{ description }}</p>
      <p v-bind:data-label="description">{{ '🤯 ' + description.split('').reverse().join('') }}</p>
    </div>

    <div class="container">
      <h2>v-if</h2>

      <p v-if="seen">Ahora me ves</p>
      <p v-else>Ahora me ves parte else</p>

      <p v-show="seen">Ahora me ves show</p>
    </div>

    <div class="container">
      <h2>v-if: reusabilidad de vue</h2>

      <h3>Reusando input</h3>
      <div v-if="loginType === 'username'">
        <label class="mr-1">Nombre de usuario</label>
        <input type="text" placeholder="Nombre de usuario">
      </div>
      <div v-else>
        <label class="mr-1">Email</label>
        <input type="text" placeholder="Introduce tu email">
      </div>

      <h3>Evitando la reusabilidad</h3>
      <div v-if="loginType === 'username'">
        <label class="mr-1">Nombre de usuario</label>
        <input type="text" placeholder="Nombre de usuario" key="username">
      </div>
      <div v-else>
        <label class="mr-1">Email</label>
        <input type="text" placeholder="Introduce tu email" key="email">
      </div>
    </div>

    <div class="container">
      <h2>v-for</h2>
      <p>Métodos que modifican un array</p>
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.content }}
        </li>
      </ul>

      <p>Métodos que <b>NO</b> modifican el array (reasignar para detectar cambios)</p>
      <ul>
        <li v-for="item in items2" :key="item.id">
          {{ item.content }}
        </li>
      </ul>

      <p>Rango de números: <span v-for="n in 10" :key="n">{{ n }} </span></p>
    </div>

    <div class="container">
      <h2>v-for: key única </h2>
      <ul>
        <li v-for="(item, index) in elements" :key="index">
          {{ index }} - {{ item }}
          <input type="text">
          <button @click="elements.splice(index, 1)">Borrar</button>
        </li>
      </ul>
    </div>

    <div class="container">
      <h2>v-bind o ":"</h2>
      <p>Los siguientes enlaces son lo mismo</p>
      <a target="_blank" v-bind:href="link.url">{{ link.text }}</a>
      <br>
      <a target="_blank" :href="link.url">{{ link.text }}</a>
    </div>

    <div class="container">
      <h2>v-on o @</h2>
      <span class="mr-1">Contador: {{ counter }}</span>
      <button @click="counter += 1" class="mr-1">Añadir 1</button>
      <button @click="counter = 0">Reset</button>

      <br><br>
      <form @submit.prevent="''">
        <label for="form-input">Formulario:</label>
        <input type="text" id="form-input">
        <input type="submit">
      </form>
    </div>

    <div class="container">
      <h2>v-model</h2>

      <label for="v-model-1" class="mr-1">Introduce texto:</label>
      <input id="v-model-1" type="text" v-model="message">
      <p>{{ message }}</p>

      <label for="v-model-2" class="mr-1">Introduce un número:</label>
      <input id="v-model-2" type="number" v-model.number="inputNumber">
      <p>
        Número introducido (tipo de dato): {{ inputNumber }} ({{ typeof (inputNumber) }})
      </p>

      <label for="v-model-3" class="mr-1">Checkeame!</label>
      <input id="v-model-3" type="checkbox" v-model="checked" class="mr-1">
      <span>Valor: {{ checked }}</span>

      <br><br>
      <span class="mr-1">Elige uno:</span>
      <input type="radio" id="apple" value="Manzana" v-model="picked">
      <label for="apple">Manzana 🍎</label>
      <input type="radio" id="banana" value="Plátano" v-model="picked">
      <label for="banana">Plátano 🍌</label>
      <p class="ml-1">Opción elegida: {{ picked }}</p>

      <br>
      <select class="mr-1" v-model="selected">
        <option disabled value="">Selecciona una</option>
        <option value="">Ninguna</option>
        <option>Manzana</option>
        <option>Plátano</option>
      </select>
      <span>Seleccionado: {{ selected }}</span>
    </div>

    <div class="container">
      <h2>Methods</h2>

      <p>{{ methodMessage }}</p>
      <button @click="reverseMessage">
        Invertir mensaje
      </button>
    </div>

    <div class="container">
      <h2>Propiedades computadas</h2>
      <p>Nombre: {{ firstName }}</p>
      <p>Apellido: {{ lastName }}</p>
      <p>Nombre completo: {{ fullName }}</p>

      <p>Cuidado!! Propiedad computada cacheada: {{ formatDate(nowComputed) }}</p>
      <p>Propiedad correcta: {{ formatDate(correctNowComputed) }}</p>
      <button @click="nowMethod">Refrescar día</button>
    </div>

    <div class="container">
      <h2>Watchers</h2>
      <label for="username" class="mr-1">Username</label>
      <input type="text" id="username" v-model="username" class="mr-1">
      <small v-if="validUsername">Usuario disponible</small>
      <small v-else>Usuario ya existente</small>

      <br><br>
      <label>Nombre de usuario</label>
      <input type="text" v-model="watchExample" class="mr-1"><small>{{ watchWaitingText }}</small>
      <p>Respuesta para usuario: {{ watchResponse }}</p>
    </div>

    <div class="container">
      <h2>Clases y estilos</h2>

      <div class="box" :class="color"></div>
      <div class="box" :class="{red: isRed, border: hasBorder}"></div>
      <div class="box" :class="[color, 'border']"></div>
      <div class="box" :class="classArray"></div>
      <div class="box" :style="styleObject"></div>
    </div>

    <div class="container">
      <h2>Filtros</h2>
      <input type="text" v-model="filterMessage" placeholder="Escribe aquí">
      <p>Mensaje filtrado: {{ filterMessage | capitalize }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasicTutorial",
  filters: {
    capitalize: function(value) {
      if (!value) {
        return ''
      }
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  data() {
    return {
      description: 'Este es otro mensaje',
      seen: false,
      loginType: 'username',
      items: [
        {content: 'push()', id: 0},
        {content: 'pop()', id: 1},
        {content: 'shift()', id: 2},
        {content: 'unshift()', id: 3},
        {content: 'splice()', id: 4},
        {content: 'sort()', id: 5},
        {content: 'reverse()', id: 6},
      ],
      items2: [
        {content: 'filter()', id: 0},
        {content: 'concat()', id: 1},
        {content: 'slice()', id: 2},
      ],
      elements: [
        'a',
        'b',
        'c',
      ],
      link: {text: 'Lapisoft', url: 'http://lapisoft.es/'},
      counter: 0,
      message: '',
      inputNumber: 0,
      checked: false,
      picked: '',
      selected: '',
      methodMessage: 'Hola caracola!',
      firstName: 'Daniel',
      lastName: 'Gayoso',
      date: null,
      username: '',
      validUsername: true,
      watchExample: '',
      watchWaitingText: '',
      watchResponse: '',
      watchInterval: null,
      color: 'red',
      isRed: false,
      hasBorder: false,
      classArray: ['blue', 'border'],
      styleObject: {
        backgroundColor: 'darkseagreen',
        border: '2px solid cornflowerblue',
      },
      filterMessage: '',
    }
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    nowComputed() {
      return Date.now();
    },
    correctNowComputed() {
      return this.date;
    },
  },
  watch: {
    username: function (newValue, oldValue) {
      console.log('nuevo valor ' + newValue + ' valor antiguo ' + oldValue)
      this.validUsername = newValue !== 'daniboy'
    },
    watchExample: function (newValue, oldValue) {
      console.log(newValue, oldValue)
      this.watchWaitingText = 'Esperando a servidor...'
      this.watchResponse = ''
      clearInterval(this.watchInterval)
      this.watchInterval = setTimeout(() => {
        this.watchResponse = newValue === 'daniboy' ? 'El usuario ya existe' : 'El usuario está disponible'
        this.watchWaitingText = ''
      }, 2000)
    },
  },
  methods: {
    reverseMessage: function () {
      this.methodMessage = this.methodMessage.split('').reverse().join('')
    },
    formatDate(date) {
      return new Intl.DateTimeFormat('es', {dateStyle: 'full', timeStyle: 'long'}).format(date)
    },
    nowMethod() {
      this.date = Date.now();
    }
  },
}
</script>

<style scoped>

</style>