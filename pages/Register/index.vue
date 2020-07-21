<template>
  <v-container class="d-flex justify-center fill-height">
    <v-row align="center" justify="center">
      <v-col style="display: contents;" cols="12" sm="8" md="4">
        <v-card class="px-4" style="min-width: 600px;">
          <v-card-title class="justify-center">
            Register !
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                outlined
                v-model="name"
                :rules="[rule.required, rule.min]"
                label="Name"
                type="text"
              >
              </v-text-field>
              <v-select
                :items="genderList"
                item-text="label"
                item-value="value"
                outlined
                v-model="gender"
                label="Gender"
              >
              </v-select>
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="dateOfBirth"
                persistent
                width="320px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    outlined
                    v-model="dateOfBirth"
                    label="Date of birth"
                    append-icon="mdi-event"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dateOfBirth"
                  style="border: solid 1px; border-color: #474747;"
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(dateOfBirth)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-dialog>
              <v-text-field
                outlined
                v-model="userName"
                label="User Name"
                :rules="[rule.required, rule.min]"
                type="text"
              >
              </v-text-field>

              <v-text-field
                :rules="[rule.required, rule.min]"
                outlined
                v-model="email"
                label="Email"
                type="text"
              >
              </v-text-field>
              <v-text-field
                outlined
                :rules="[rule.required, rule.min, rule.phoneNumber]"
                v-model="phoneNumnber"
                label="Phone Number"
                type="text"
              >
              </v-text-field>
              <v-text-field
                outlined
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                :rules="[rule.required, rule.min]"
                v-model="password"
                @click:append="show1 = !show1"
                label="Password"
              >
              </v-text-field>
              <v-text-field
                outlined
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rule.required, passwordConfirmationRule, rule.min]"
                v-model="confirmPassword"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
                label="Confirm Password"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex flex-column">
            <v-hover v-slot:default="{ hover }">
              <v-btn
                @click="handleRegisterClick"
                :disabled="valid ? false : true"
                :color="hover ? '#FFAB00' : '#FFC400'"
                large
                block
              >
                Register
              </v-btn>
            </v-hover>
            <p class="mt-3">
              Already got an account? <nuxt-link to="/login">Login</nuxt-link>
            </p>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Register extends Vue {
  genderList = [
    {
      label: 'Male',
      value: 1,
    },
    {
      label: 'Female',
      value: 2,
    },
  ]
  show1 = false
  show2 = false
  valid = false
  menu = false
  modal = false
  userName = ''
  gender = ''
  password = ''
  confirmPassword = ''
  name = ''
  dateOfBirth = new Date().toISOString().substr(0, 10)
  email = ''
  phoneNumnber = ''
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
  handleRegisterClick() {
    console.log({
      name: this.name,
      userName: this.userName,
      password: this.password,
      gender: this.gender = 1 ? 'male' : 'female',
      dateOfBirth: this.dateOfBirth,
      phoneNumnber: this.phoneNumnber,
      email: this.email,
    })
    this.$store.dispatch('registerUser', {
      name: this.name,
      userName: this.userName,
      password: this.password,
      gender: this.gender,
      dateOfBirth: new Date(this.dateOfBirth).toISOString(),
      phoneNumber: this.phoneNumnber,
      email: this.email,
    })
  }
}
</script>
