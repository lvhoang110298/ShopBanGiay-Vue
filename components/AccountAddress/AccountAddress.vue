<template>
  <v-card class="d-flex justify-center" color="basil" flat>
    <v-col cols="6">
      <v-card-text class="mt-5">
        <v-form v-model="valid">
          <v-text-field
            label="Recipient Name"
            :rules="[rule.required]"
            v-model="recipientName"
            outlined
          >
          </v-text-field>
          <v-text-field
            :rules="[rule.required, rule.phoneNumber]"
            label="Recipient Phone Number"
            v-model="recipientPhoneNumber"
            outlined
          >
          </v-text-field>
          <v-select
            :rules="[rule.required]"
            v-model="city"
            :items="cityList"
            item-text="name"
            item-value="name"
            label="City"
            outlined
          ></v-select>
          <v-select
            :rules="[rule.required]"
            v-model="district"
            :items="districtList"
            item-text="name"
            item-value="name"
            label="District"
            :loading="city ? false : true"
            no-data-text="Please select City"
            outlined
          ></v-select>
          <v-select
            :rules="[rule.required]"
            v-model="ward"
            :items="wardList"
            item-text="name"
            item-value="name"
            label="Ward"
            :loading="city && district ? false : true"
            no-data-text="Please select City, District"
            outlined
          ></v-select>
          <v-text-field
            :rules="[rule.required]"
            label="Street"
            v-model="street"
            outlined
          >
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-hover v-slot:default="{ hover }">
          <v-btn
            :disabled="valid ? false : true"
            :color="hover ? '#FFAB00' : '#FFC400'"
            large
            block
          >
            Update Address
          </v-btn>
        </v-hover>
      </v-card-actions>
    </v-col>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CITY_LIST } from '../../static/constant/city'
@Component({})
export default class AccountAddress extends Vue {
  valid = false
  city = ''
  district = ''
  recipientName = ''
  recipientPhoneNumber = ''
  street = ''
  ward = ''
  rule = {
    required: (value: any) => !!value || 'Required fill',
    emailRule: (value: string) => /.+@.+/.test(value) || 'E-mail must be valid',
    min: (value: string) =>
      (value && value.length >= 6) || 'Fill must be more than 6 characters',
    phoneNumber: (value: string) =>
      /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/.test(
        value
      ) || 'Số điện thoại không hợp lệ',
  }
  get cityList() {
    return CITY_LIST
  }
  get districtList() {
    return (
      CITY_LIST.find((x) => x.name === this.city)?.districts.map((x) => ({
        name: x.name,
      })) || []
    )
  }
  get wardList() {
    return (
      CITY_LIST.find((x) => x.name === this.city)
        ?.districts.find((y) => y.name === this.district)
        ?.wards.map((z) => ({ name: z })) || []
    )
  }
  get userAddress() {
    return this.$store.state.customer.address
  }
  async mounted() {
    await this.$store.dispatch('getAddress')
    console.log(CITY_LIST)
  }
}
</script>
