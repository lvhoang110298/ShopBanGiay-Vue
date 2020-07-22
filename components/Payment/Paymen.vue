<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="6">
        <v-hover v-slot:default="{ hover }">
          <v-btn
            @click="handleBack"
            :color="hover ? 'blue' : 'primary'"
            large
            block
          >
            <v-icon>mdi-keyboard-backspace</v-icon>
          </v-btn>
        </v-hover>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="6">
        <v-card>
          <v-card-title>
            Form Of Delivery
          </v-card-title>
          <v-card-text>
            <v-checkbox label="Standard"></v-checkbox>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="6">
        <v-card>
          <v-card-title>
            Payment Methods
          </v-card-title>
          <v-card-text>
            <v-checkbox label="COD"></v-checkbox>
            <v-checkbox label="Momo"></v-checkbox>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="6">
        <v-hover v-slot:default="{ hover }">
          <v-btn
            @click="handlePlace"
            :color="hover ? '#FFAB00' : '#FFC400'"
            large
            block
          >
            Place An Order
          </v-btn>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class Payment extends Vue {
  @Prop()
  addressId: any
  get orderId() {
    return this.$store.state.order.id
  }
  async handlePlace() {
    await this.$store.dispatch('confirmOrder', { id: this.addressId })
    this.$router.push(`/order/${this.orderId}`)
  }
  handleBack() {
    this.$emit('handleBack')
  }
}
</script>

<style></style>
