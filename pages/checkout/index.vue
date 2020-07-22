<template>
  <v-container>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Login</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">Address</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">Payment</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <LoginComponent></LoginComponent>
        </v-stepper-content>
        <v-stepper-content step="2">
          <AccountAddress
            @handleShipClick="handleShipClick($event)"
            :action="action"
          ></AccountAddress>
        </v-stepper-content>
        <v-stepper-content step="3">
          <Payment
            :addressId="addressId"
            @handleBack="handleBackStep"
          ></Payment>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginComponent from '../../components/Login/Login.vue'
import AccountAddress from '../../components/AccountAddress/AccountAddress.vue'
import Payment from '../../components/Payment/Paymen.vue'
@Component({
  components: {
    LoginComponent,
    AccountAddress,
    Payment,
  },
})
export default class checkout extends Vue {
  e1 = 1
  addressId = -1
  // 0 : checkout , 1 : update
  action = 0
  handleShipClick(value) {
    this.e1 = 3
    this.addressId = value
  }
  handleBackStep() {
    this.e1 = 2
  }
  mounted() {
    this.e1 = localStorage.getItem('identity') ? 2 : 1
  }
}
</script>

<style></style>
