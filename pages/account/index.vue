<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text">Account Info</h1>
    </v-card-title>
    <v-tabs v-model="tab" grow>
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, i) in items" :key="i">
        <!-- password -->
        <ChangePassword v-if="i === 0"></ChangePassword>

        <!-- info -->
        <AccountInfo v-if="i === 1"></AccountInfo>
        <!-- address -->
        <AccountAddress :action="action" v-if="i === 2"></AccountAddress>
        <!-- order -->
        <Order v-if="i === 3"></Order>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ChangePassword from '../../components/ChangePassword/ChangePassword.vue'
import AccountInfo from '../../components/AccountInfo/AccountInfo.vue'
import AccountAddress from '../../components/AccountAddress/AccountAddress.vue'
import Order from '../../components/Order/Order.vue'
@Component({
  components: {
    ChangePassword,
    AccountInfo,
    AccountAddress,
    Order,
  },
})
export default class Account extends Vue {
  tab = null
  action = 1
  items = ['Change Password', 'Account Info', 'Address', 'My Order']
  handleClick(item: any) {
    console.log(item)
  }
}
</script>

<style>
.card {
  display: flex;
  justify-content: center;
}
</style>
