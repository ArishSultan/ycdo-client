<template>
  <v-app>
    <v-navigation-drawer
      v-if="navigation"
      v-model="state.drawer"
      app
      class="drawer"
    >
      <span class="drawer__list">
        <v-list nav dense style="height: 100%; max-height: 100%">
          <v-list-item-group color="primary">
            <div v-for="(link, i) of navigation.pages" :key="i">
              <v-subheader v-if="typeof link === 'string'">{{
                link
              }}</v-subheader>

              <v-list-item v-else :to="link.to" class="list-item " dense>
                <v-list-item-avatar>
                  <v-icon small>{{ link.icon }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ link.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list-item-group>
        </v-list>
      </span>

      <v-list>
        <v-menu bottom right>
          <v-card>
            <v-list>
              <v-list-item to="/administrator/report/tokens">
                Token Summary
              </v-list-item>
              <v-list-item>asd</v-list-item>
              <v-list-item>asd</v-list-item>
              <v-list-item>asd</v-list-item>
              <v-list-item>asd</v-list-item>
              <v-list-item>asd</v-list-item>
            </v-list>
          </v-card>
          <template v-slot:activator="{ on }">
            <v-list-item
              v-ripple
              dense
              class="list-item list-item--no-radius"
              v-on="on"
            >
              <v-list-item-avatar>
                <v-icon small>mdi-printer</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Summaries</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon small>mdi-chevron-right</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-menu>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark dense elevate-on-scroll app color="primary">
      <v-app-bar-nav-icon
        v-if="navigation"
        @click.stop="state.drawer = !state.drawer"
      />
      <v-toolbar-title class="title">YCDO HCC</v-toolbar-title>
      <v-spacer />
      <v-btn @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-content class="my-container">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { defineComponent, reactive, ref } from '@vue/composition-api'
import { resolveNav } from '@/utils/navigation/resolver'

export default defineComponent({
  setup(_, context) {
    const auth = context.root.$auth
    const navigation = ref(null)

    const state = reactive({
      drawer: false
    })

    function logout() {
      context.root.$auth.logout()
    }

    navigation.value = resolveNav(auth?.user?.scope)

    return { state, navigation, logout }
  }
})
</script>

<style lang="sass" scoped>
.drawer
  height: 100% !important
  display: flex !important
  flex-direction: column !important

  &__list
    flex: 1 auto !important
    display: block !important
    overflow-y: auto !important

.title
  font-size: 17px !important
  font-weight: bold !important
  padding-top: 2px !important
  font-family: google-sans, sans-serif !important

.home-page-link
  border: 2px solid rgba(black, 0.3) !important

.separator
  width: calc(100% - 50px)
  height: 1px
  margin-left: 25px
  margin-right: 25px
  margin-top: 20px
  border-top: 1px solid rgba(black, 0.14) !important

.list-item
  height: 40px !important

  &--no-radius
    border-radius: 0 !important

  *
    color: rgba(black, 0.65) !important

.my-container
  display: flex
  justify-content: center
  height: 100vh !important
  background: linear-gradient(#1976d2 35%, white 35%)
</style>

<style lang="sass">
.v-navigation-drawer__content
  display: flex !important
  flex-direction: column !important

.v-subheader
  font-size: 13px !important
  font-weight: 600
  font-family: google-sans, sans-serif !important
</style>
