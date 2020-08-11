<template>
  <div class="sign-in-container">
    <v-card class="sign-in-card">
      <div class="sign-in-card__header">
        <img src="@/assets/logo.png" alt="" height="70" />

        <div style="display: flex; flex-direction: column; margin-left: 10px;">
          <p
            style="font-family: google-sans; font-size: 22px; margin-bottom: 5px"
          >
            Authenticate yourself
          </p>
          <p>provide your credentials</p>
        </div>
      </div>

      <v-text-field v-model="username" label="Username" outlined dense />
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        outlined
        dense
      />

      <v-btn color="primary" width="100%" elevation="0" @click="signIn"
        >Submit</v-btn
      >
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'none',

  data: () => ({
    username: '',
    password: ''
  }),

  methods: {
    signIn() {
      this.$auth.loginWith('local', {
        data: {
          username: this.username,
          password: this.password
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.sign-in-container
  width: 100%
  height: 90vh
  display: flex
  align-items: center
  justify-content: center

.sign-in-card
  width: 400px
  padding: 40px 40px 36px

  &__header
    display: flex
    padding-bottom: 20px
</style>
