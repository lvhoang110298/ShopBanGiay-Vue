<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      @click="handleClick"
      style="height: 135px !important;"
      class="mx-auto"
    >
      <v-row>
        <v-col class="d-flex align-center pl-5" cols="4">
          <v-img :src="product.imagePath"></v-img>
        </v-col>
        <v-col cols="8">
          <v-card-subtitle
            :style="hover ? 'color:#ffc230' : 'color:white'"
            class="pb-0"
            >{{ product.name }}</v-card-subtitle
          >
          <v-card-text class="text--primary">
            <p>{{ formatMoney(product.price) }} VNĐ</p>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-hover>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import VueRouter from 'vue-router'
@Component({
  components: {},
})
export default class ProductCard extends Vue {
  @Prop({
    default: {},
  })
  product!: any
  formatMoney = (num: any) => {
    let p = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    p = p.slice(0, p.length - 3)
    return p
  }

  handleClick() {
    this.$router.push(`/shoes/${this.product.id}`)
  }

  mounted() {}
}
</script>
