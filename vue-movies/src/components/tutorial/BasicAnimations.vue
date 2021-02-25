<template>
  <div>
    <div class="container">
      <h2>Animación básica</h2>

      <button @click="show = !show">Alternar</button>
      <transition>
        <p v-if="show">Lorem ipsum</p>
      </transition>
    </div>

    <div class="container">
      <h2>Animación con nombre personalizado</h2>

      <button @click="show2 = !show2">Alternar</button>
      <transition name="fade">
        <p v-if="show2">Lorem ipsum</p>
      </transition>
    </div>

    <div class="container">
      <h2>Animación con clases personalizadas/librerías externas</h2>

      <button @click="show3 = !show3">Alternar</button>
      <transition
          enter-class=""
          enter-active-class="animate__animated animate__bounceIn"
          enter-to-class=""
          leave-class=""
          leave-active-class="animate__animated animate__bounceOut"
          leave-to-class=""
      >
        <p v-if="show3">Lorem ipsum</p>
      </transition>
    </div>

    <div class="container">
      <h2>Animación con css animation</h2>

      <button @click="show4 = !show4">
        Mostrar/ocultar
      </button>
      <transition name="bounce">
        <p v-show="show4" style="max-width: 50%; margin-left: auto; margin-right: auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam
          fermentum id. Pellentesque habitant morbi tristique senectus et netus.
        </p>
      </transition>
    </div>

    <div class="container">
      <h2>Transición entre elementos (cuidado key)</h2>
      <button @click="isEditing = !isEditing" class="mr-1">Guardar/editar</button>
      <span>Modo: </span>
      <input id="default" type="radio" v-model="mode" value="">
      <label for="default">default</label>
      <input id="in-out" type="radio" v-model="mode" value="in-out">
      <label for="in-out" class="mr-1">in-out</label>
      <input id="out-in" type="radio" v-model="mode" value="out-in">
      <label for="out-in">out-in</label>
      <br><br>
      <transition :mode="mode">
        <button v-if="isEditing" key="save">
          Guardar
        </button>
        <button v-else key="edit">
          Editar
        </button>
      </transition>
    </div>

    <div class="container">
      <h2>Transición en múltiples elementos</h2>

      <button v-on:click="add">Añadir</button>
      <button v-on:click="remove">Eliminar</button>
      <br><br>
      <transition-group name="list">
        <span v-for="item in items" :key="item" class="list-item">
          {{ item }}
        </span>
      </transition-group>

      <h2>Transición en múltiples elementos</h2>
      <button v-on:click="start">Iniciar</button>
      <br><br>
      <transition-group name="list">
        <span
            v-for="(item, index) in items2"
            :key="item"
            class="list-item"
            :style="'transition-delay: ' + 0.03 * index + 's'"
        >
          {{ item }}
        </span>
      </transition-group>

      <h2>Transiciones reusable (componentes)</h2>

      <button @click="show5 = !show5" class="mr-1">
        Mostrar/ocultar
      </button>
      <fade-transition>
        <p v-if="show5">Contenido para animar</p>
      </fade-transition>
    </div>

  </div>
</template>

<script>
import FadeTransition from "@/components/tutorial/FadeTransition";
export default {
  name: "BasicAnimations",
  components: {FadeTransition},
  data() {
    return {
      show: true,
      show2: true,
      show3: true,
      show4: true,
      show5: true,
      isEditing: true,
      mode: '',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      items2: [],
      nextNum: 10,
      interval: null,
    }
  },
  methods: {
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    start() {
      clearInterval(this.interval)
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

      const timeout = 500
      let index = 0

      this.interval = setInterval(() => {
        this.items2.push(array[index])
        index++
        if (index >= array.length) {
          clearInterval(this.interval)
        }
      }, timeout)
    },
  },
}
</script>

<style scoped>
.v-enter, .v-leave-to {
  opacity: 0;
}

.v-enter-active, .v-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}

.bounce-enter-active {
  animation: my-bounce 1s;
}

.bounce-leave-active {
  animation: my-bounce 1s reverse;
}

@keyframes my-bounce {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-move {
  transition: all 1s;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}

/*.list-enter-active, .list-leave-active {*/
/*  transition: all 5s;*/
/*}*/
.list-leave-active {
  position: absolute;
}
.list-enter-active {
  transition: all 1s;
}


</style>