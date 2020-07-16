<template>
  <v-container class="stickyContainer">
    <v-row justify="center">
      <v-col cols="6">
        <v-card>
          <v-container class="pa-6">
            <v-img
              max-height="200"
              min-height="200"
              width="100%"
              v-if="productItem.images"
              :src="productItem.images[0]"
              contain
            ></v-img>
          </v-container>
        </v-card>
        <v-card class="mt-6 pa-3">
          <v-card-title>
            Description
          </v-card-title>
          <v-card-text>
            <p>{{ productItem.description }}</p>
          </v-card-text>
        </v-card>
        <v-card class="mt-6 pa-3">
          <v-card-title>
            Review
          </v-card-title>
          <v-row>
            <v-card-text
              class="d-flex flex-no-wrap align-items-center flex-row justify-space-between"
            >
              No rewiews yet
              <v-hover v-slot:default="{ hover }">
                <v-btn large :color="hover ? '#FFAB00' : '#FFC400'">
                  Write A Review
                </v-btn>
              </v-hover>
            </v-card-text>
          </v-row>
        </v-card>
      </v-col>
      <v-col style="display: flex; align-items: flex-start;" cols="6">
        <v-col
          style="position: -webkit-sticky; position: sticky; top: 5rem;"
          class="pa-0"
        >
          <v-card class="pa-3">
            <v-card-text class="d-flex align-center justify-space-between">
              <v-rating
                half-icon
                :value="productItem.rating"
                color="orange"
                small
              ></v-rating>
              <span>No Reviews</span>
            </v-card-text>
            <v-card-title class="py-0">
              <span>
                {{ productItem.name }}
              </span>
            </v-card-title>
            <v-card-title class="py-0 pb-4">
              <span v-if="productItem.price" style="color: #ffc400;">
                {{ formatMoney(productItem.price) }} VNĐ
              </span>
            </v-card-title>
            <v-divider class="mx-5" light></v-divider>
            <v-card-text>
              <span>Mens's size</span>
              <div :v-model="size" class="d-flex flex-row justify-start">
                <div
                  class="pr-2"
                  v-for="(size, i) in productItem.sizes"
                  :key="i"
                >
                  <v-btn
                    :outlined="sizeSelect === size.sizeName ? true : false"
                    @click="handleSizeClick(size.sizeName)"
                    small
                    >{{ size.sizeName }}</v-btn
                  >
                </div>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-hover v-slot:default="{ hover }">
                <v-btn block large :color="hover ? '#FFAB00' : '#FFC400'">
                  Add To Card
                </v-btn>
              </v-hover>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VueRouter from 'vue-router'
@Component({
  computed: {
    productItem() {
      if (this.$store.state.shoes.shoes) {
        return this.$store.state.shoes.shoes
      } else return undefined
    },
  },
})
export default class shoesDetail extends Vue {
  productItem: any
  productId: any
  sizeSelect: string = ''

  formatMoney = (num: any) => {
    console.log(1, num)
    let p = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    p = p.slice(0, p.length - 3)
    return p
  }

  handleSizeClick(value: string) {
    this.sizeSelect = value
    console.log(typeof this.sizeSelect)
  }
  async mounted() {
    await this.$store.dispatch(
      'getProductById',
      this.$router.currentRoute.params.id
    )
    console.log(11, this.productItem)
  }
}
</script>

<style scoped>
.card {
  border-style: solid #aaaa;
}
</style>
