<template>
  <v-app>
    <v-app-bar color="primary" app dense elevate-on-scroll>
      <v-btn icon dark @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container
        class="center-parent"
        style="background: linear-gradient(dodgerblue 30%, white 30%) !important"
      >
        <nuxt class="center-content" />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="sass">
.center-content-parent
  width: 100%
  height: 200px
  position: relative !important

.center-content
  left: 50%
  margin-top: 50px
  position: absolute
  margin-bottom: 50px
  transform: translateX(-50%)
</style>
