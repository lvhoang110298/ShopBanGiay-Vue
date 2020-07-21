<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <div class="d-flex flex-row" v-if="item.display">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </div>
        </v-list-item>
        <v-list-item v-if="!isLogined" to="/account" router exact>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title />
      <v-spacer />
      <div v-if="isLogined">
        <v-btn href="/register" text>
          Register
        </v-btn>
        <v-btn href="/login" text>
          Login
        </v-btn>
      </div>
      <div v-else>
        <v-btn @click="handleLogout" text>
          Logout
        </v-btn>
      </div>
    </v-app-bar>
    <v-content>
      <v-container style="background-color: #000;">
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  computed: {
    isLogined() {
      return localStorage.getItem('identity') ? false : true
    },
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('logout')
      this.$router.go('/')
    },
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
          display: true,
        },
        {
          icon: 'mdi-shoe-print',
          title: 'Shoes',
          to: '/shoes',
          display: true,
        },
        {
          icon: 'mdi-sale',
          title: 'Promote',
          to: '/inspire',
          display: true,
        },
        {
          icon: 'mdi-cart',
          title: 'Cart',
          to: '/cart',
          display: true,
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
<style scoped>
.container {
  height: 100%;
}
</style>
