<template>
  <v-card class="d-flex justify-center" color="basil" flat>
    <v-col cols="12">
      <v-card-title>My Order</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="orders"
          :items-per-page="10"
          class="elevation-1"
        >
          <template v-slot:item.code="{ item }">
            <a :href="`/order/${item.code}`">{{ item.code }}</a>
          </template></v-data-table
        >
      </v-card-text>
    </v-col>
  </v-card>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class Order extends Vue {
  headers = [
    {
      text: 'Order Code',
      align: 'start',
      sortable: false,
      value: 'code',
    },
    { text: 'Order Date', align: 'center', value: 'orderDate' },
    { text: 'Products', align: 'center', value: 'products' },
    { text: 'Order Total', align: 'center', value: 'total' },
    { text: 'Order Status', align: 'center', value: 'status' },
  ]
  get orders() {
    console.log(this.$store.state.order)
    return this.$store.state.order.orders
      ? this.$store.state.order.orders.map((e) => ({
          code: e.id,
          orderDate: e.orderDate,
          products: this.productsString(e.cartItemDTOList),
          total: e.total,
          status:
            e.status === 1
              ? 'Waiting'
              : e.status === 2
              ? 'Confirmed'
              : 'Canlled',
        }))
      : []
  }

  productsString(obj) {
    let str = ''
    for (let item of obj) {
      str =
        item.name +
        ' , quantity :' +
        item.quantity.toString() +
        ' , size :' +
        item.sizeName +
        '.'
    }
    return str
  }
  async mounted() {
    await this.$store.dispatch('getOrders', { page: 1, pageSize: 10 })
  }
}
</script>

<style scoped>
.v-data-table {
  border: solid 1px;
  border-color: aquamarine;
}
tr {
  height: 150px !important;
}
</style>
