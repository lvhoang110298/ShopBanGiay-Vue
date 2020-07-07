<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center"></div>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {},
})
export default class Home extends Vue {
  shoesList: any
  async mounted() {
    await this.$store.dispatch('getNewProduct')
    console.log(11, this.$store.getters.getShoesList)
  }
}
</script>
