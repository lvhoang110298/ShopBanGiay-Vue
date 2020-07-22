<template>
  <v-container>
    <h1>My Cart</h1>
    <v-container class="d-flex flex-wrap">
      <v-col cols="12">
        <v-card>
          <v-card-title>Cart</v-card-title>
          <v-card-text class="d-flex flex-column">
            <v-row>
              <v-col class="d-flex justify-center" cols="6">
                Product
              </v-col>
              <v-col class="d-flex justify-center" cols="3">Quantity</v-col>
              <v-col class="d-flex justify-center" cols="3">Total</v-col>
              <v-divider
                style="border-color: white;"
                class="mx-5"
                light
              ></v-divider>
            </v-row>
            <v-row v-for="(product, i) in productItems" :key="i">
              <v-col cols="6">
                <ProductCard
                  style="box-shadow: none; border: none;"
                  :product="product"
                ></ProductCard>
              </v-col>
              <v-col class="d-flex align-center justify-center" cols="3">
                <v-card style="border: solid 1px; border-color: white;">
                  <v-card-text class="d-flex flex-row align-center">
                    <v-btn icon><v-icon>mdi-minus</v-icon></v-btn>
                    <v-text-field
                      style="text-align: center;"
                      readonly
                      v-model="product.quantity"
                      >{{ product.quantity }}</v-text-field
                    >
                    <v-btn icon><v-icon>mdi-plus</v-icon></v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col class="d-flex align-center justify-center" cols="3">
                <div>{{ formatMoney(product.price) }} VNĐ</div>
              </v-col>
              <v-divider
                style="border-color: white;"
                class="mx-5"
                light
              ></v-divider>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-container>
    <v-container class="d-flex justify-end">
      <v-col class="justify-end" cols="6">
        <v-card>
          <v-card-title class="d-flex justify-space-around">
            <div>Total :</div>
            <div>{{ formatMoney(totalCart) }} VNĐ</div>
          </v-card-title>
          <v-card-text>
            <v-hover v-slot:default="{ hover }">
              <v-btn
                href="/checkout"
                block
                x-large
                :color="hover ? '#FFAB00' : '#FFC400'"
              >
                Checkout
              </v-btn>
            </v-hover>
          </v-card-text>
        </v-card>
      </v-col>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ProductCard from '../../components/Product/ProductCard.vue'
@Component({
  components: {
    ProductCard,
  },
})
export default class Cart extends Vue {
  get cartItems() {
    return this.$store.state.cart.cart
  }

  get totalCart() {
    let temp = 0
    if (this.productItems) {
      for (let item of this.productItems) {
        temp = temp + item.price * item.quantity
        console.log(temp)
        return temp
      }
    } else return 0
  }

  formatMoney = (num: any) => {
    let p = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    p = p.slice(0, p.length - 3)
    return p
  }

  get productItems() {
    if (this.$store.state.cart.cart) {
      return this.$store.state.cart.cart.map((e) => ({
        imagePath: e.image,
        name: e.name,
        price: e.price,
        quantity: e.quantity,
      }))
    }
  }
  async mounted() {
    await this.$store.dispatch('getCartItems')
  }
}
</script>

<style>
.centered-input input {
  text-align: center;
}
</style>
