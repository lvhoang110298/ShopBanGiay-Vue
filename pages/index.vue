<template>
  <v-layout column justify-center align-center>
    <v-container>
      <v-flex>
        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet color="#000" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <v-img
                  :src="require(`../assets/images/slide${i + 1}.webp`)"
                ></v-img>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-container>
    <v-container class="productGrid d-flex flex-wrap">
      <v-col cols="4" v-for="(product, i) in newProductList" :key="i">
        <ProductCard :product="product"></ProductCard>
      </v-col>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { Vue, Component } from 'vue-property-decorator'
import ProductCard from '../components/Product/ProductCard.vue'

@Component({
  components: {
    ProductCard,
  },
  computed: {
    newProductList() {
      return this.$store.state.shoes.shoesList
        .filter((shoes: any) => (shoes.isNew = true))
        .slice(0, 9)
    },
  },
})
export default class Home extends Vue {
  newProductList: any
  shoes: any
  data() {
    return {
      slides: ['', '', ''],
    }
  }

  async mounted() {
    await this.$store.dispatch('getAllProduct')
  }
}
</script>
