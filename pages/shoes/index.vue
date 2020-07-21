<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text">Shoes</h1>
    </v-card-title>
    <v-tabs v-model="tab" grow>
      <v-tab @click="handleClick" v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card color="basil" flat>
          <v-card-text style="background-color: black; height: 400px;">
            <v-container class="productGrid d-flex flex-wrap">
              <v-col
                cols="4"
                v-for="(product, i) in tab === 1
                  ? menProductsShow
                  : womenProductsShow"
                :key="i"
              >
                <ProductCard :product="product"></ProductCard>
              </v-col>
            </v-container>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-pagination v-model="page" :length="length"></v-pagination>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import ProductCard from '../../components/Product/ProductCard.vue'
@Component({
  components: {
    ProductCard,
  },
  computed: {
    womenProducts() {
      return this.$store.state.shoes.shoesWomen
    },
    menProducts() {
      return this.$store.state.shoes.shoesMen
    },
  },
  methods: {},
})
export default class Shoes extends Vue {
  tab = null
  items = ['Women', 'Man']
  page = 1
  menProducts: any
  womenProducts: any

  handleClick() {}
  pageLength(number: any, array: any) {
    if (array.length % number !== 0)
      return Math.floor(array.length / number) + 1
    return Math.floor(array.length / number)
  }

  itemToShow(array: any) {
    const temp = 6 * (this.page - 1)
    return array.slice(temp, temp + 6)
  }

  get menProductsShow() {
    return this.itemToShow(this.menProducts)
  }

  get womenProductsShow() {
    return this.itemToShow(this.womenProducts)
  }

  get length() {
    const temp = this.tab === 1 ? this.menProducts : this.womenProducts
    return this.pageLength(6, temp)
  }

  @Watch('tab')
  tabChanged() {
    this.page = 1
  }

  async mounted() {
    await this.$store.dispatch('getMenProduct')
    await this.$store.dispatch('getWomenProduct')
  }
}
</script>

<style></style>
