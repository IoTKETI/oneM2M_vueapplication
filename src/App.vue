<template>
  <v-app>
    <div>
      <v-spacer></v-spacer>
    <v-main>
      <Header></Header>
      <router-view/>
      <Footer></Footer>
    </v-main>
    </div>
  </v-app>
</template>

<script>
import Header from './layout/Header';
import Footer from './layout/Footer';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },

  data: () => ({

  }),
};
</script>





