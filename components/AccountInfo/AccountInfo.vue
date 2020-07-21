<template>
  <v-card class="d-flex justify-center" color="basil" flat>
    <v-col cols="6">
      <v-card-text class="mt-5">
        <v-form v-model="valid">
          <v-text-field
            outlined
            v-model="userName"
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
              <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
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
            Update Info
          </v-btn>
        </v-hover>
      </v-card-actions>
    </v-col>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
@Component({
  computed: {},
})
export default class ChangePassword extends Vue {
  //   uInfo: any
  valid = false
  menu = false
  modal = false
  userName = ''
  gender = ''
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
  get userInfo() {
    return this.$store.state.auth.user
  }
  async mounted() {
    await this.$store.dispatch('getUserInfo')
    this.userName = this.userInfo.Name
    this.phoneNumnber = this.userInfo.phoneNumber
    this.email = this.userInfo.email
    this.gender = this.userInfo.gender
    this.dateOfBirth = new Date(this.userInfo.dateOfBirth)
      .toISOString()
      .substr(0, 10)
  }
}
</script>
