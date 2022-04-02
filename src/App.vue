<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer" 
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            My Test - CAEMA
          </v-list-item-title>
          <v-list-item-subtitle>
            Validação de conhecimentos
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
      prominent
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>
        
        My Test - CAEMA
        
        <Clock class="subtitle-2 font-weight-thin pr-100"/> 

      </v-app-bar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

    </v-app-bar>

    <v-main>
      
      <router-view></router-view>

    </v-main>

  </v-app>

</template>

<script>
import Clock from "./components/Clock.vue"

  export default {
    components: {
      Clock
    },
    data: () => ({ 
      drawer: null,
      items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
          { title: 'Municípios', icon: 'mdi-city', to: '/municipios' },
          { title: 'Cadastro', icon: 'mdi-bookmark-box-multiple-outline', to: '/cadastro' },
          { title: 'Sobre', icon: 'mdi-help-box', to: '/sobre' },
      ],
    }),
  }
</script>

<style>
.v-app-bar-title__content {
  width: 200px;
}
</style>