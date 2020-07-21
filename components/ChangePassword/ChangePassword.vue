<template>
  <v-card class="d-flex justify-center" color="basil" flat>
    <v-col cols="6">
      <v-card-text class="mt-5">
        <v-form v-model="valid">
          <v-text-field
            outlined
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            :rules="[rule.required, rule.min]"
            v-model="cpassword"
            @click:append="show1 = !show1"
            label="Current Password"
          >
          </v-text-field>
          <v-text-field
            outlined
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            :rules="[rule.required, rule.min]"
            v-model="password"
            @click:append="show2 = !show2"
            label="New Password"
          >
          </v-text-field>
          <v-text-field
            outlined
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rule.required, passwordConfirmationRule, rule.min]"
            v-model="confirmPassword"
            :type="show2 ? 'text' : 'password'"
            @click:append="show3 = !show3"
            label="Confirm Password"
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
            Update Password
          </v-btn>
        </v-hover>
      </v-card-actions>
    </v-col>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import VueRouter from 'vue-router'
@Component({
  components: {},
})
export default class ChangePassword extends Vue {
  valid = false
  cpassword = ''
  password = ''
  show1 = false
  show2 = false
  show3 = false
  confirmPassword = ''
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
  get passwordConfirmationRule() {
    return () => this.password === this.confirmPassword || 'Password must match'
  }
  mounted() {}
}
</script>
