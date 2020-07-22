<template>
  <v-container>
    <h1 v-if="orderDetail">
      Order Detail # {{ this.$router.currentRoute.params.id }} -
      {{
        orderDetail.status === 1
          ? 'Waiting'
          : orderDetail.status === 2
          ? 'Confirmed'
          : 'Cancled'
      }}
    </h1>
    <v-row class="d-flex justify-space-around align-content-stretch">
      <v-col cols="4">
        <v-card style="height: 250px;">
          <v-card-title>Reciver's Address</v-card-title>
          <v-card-text v-if="orderDetail">
            <h3>{{ orderDetail.recipientName }}</h3>
            <p>Address : {{ orderDetail.deliveryAddress }}</p>
            <p>Phone Number : {{ orderDetail.recipientPhoneNumber }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card style="height: 250px;">
          <v-card-title>Payment Method</v-card-title>
          <v-card-text>
            <p>Payment method : COD</p>
            <p v-if="orderDetail">
              Payment status
              {{ orderDetail.paymentStatus === 1 ? 'Unpaid' : '' }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card style="height: 250px;">
          <v-card-title>Order Date</v-card-title>
          <v-card-text>
            <p v-if="orderDetail">Order Date : {{ orderDetail.orderDate }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-card>
      <v-card-title>Order Items</v-card-title>
      <v-card-text class="d-flex flex-column">
        <v-row>
          <v-col class="d-flex justify-start" cols="6">
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
                <v-text-field
                  style="text-align: center;"
                  readonly
                  v-model="product.quantity"
                  >{{ product.quantity }}</v-text-field
                >
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
    <v-container class="px-0 d-flex justify-end">
      <v-col class="px-0 justify-end" cols="6">
        <v-card>
          <v-card-title class="d-flex justify-space-around">
            <div>Total :</div>
            <div>{{ formatMoney(totalOrder) }} VNĐ</div>
          </v-card-title>
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
export default class orderDetail extends Vue {
  get orderDetail() {
    return this.$store.state.order.orderDetails
      ? this.$store.state.order.orderDetails
      : null
  }
  get productItems() {
    return this.$store.state.order.orderDetails
      ? this.$store.state.order.orderDetails.cartItemDTOList.map((e) => ({
          imagePath: e.image,
          name: e.name,
          quantity: e.quantity,
          price: e.price,
          id: e.shoesId,
        }))
      : null
  }
  // check() {
  //   console.log(this.orderDetail)
  //   return 0
  // }

  get totalOrder() {
    let temp = 0
    if (this.productItems) {
      for (let item of this.productItems) {
        temp = temp + item.price * item.quantity
      }
      return temp
    } else return 0
  }
  formatMoney = (num: any) => {
    let p = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    p = p.slice(0, p.length - 3)
    return p
  }
  async mounted() {
    await this.$store.dispatch(
      'getOrderDetail',
      this.$router.currentRoute.params.id
    )
    console.log(44, this.orderDetail)
  }
}
</script>

<style scoped></style>
