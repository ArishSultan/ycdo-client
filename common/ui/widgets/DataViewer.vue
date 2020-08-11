<template>
  <v-card class="data-viewer" elevation="8">
    <v-card-title class="data-viewer__title">
      <span>{{ title }}</span>
      <v-spacer />

      <slot name="primary-action">
        <v-btn
          v-if="create"
          color="primary"
          elevation="0"
          style="padding: 0 13px 0 7px !important; border-radius: 4px; margin-right: 10px"
          @click="handleCreateEvent"
        >
          <v-icon small>mdi-plus</v-icon>

          <span>Add New</span>
        </v-btn>
      </slot>

      <v-btn icon @click="load">
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </v-card-title>

    <div class="data-viewer__search">
      <div class="data-viewer__search--spacer" />
      <v-text-field
        v-model="search"
        placeholder="Search"
        dense
        filled
        outlined
        style="margin-left: auto; width: 450px; margin-right: 20px"
        prepend-inner-icon="mdi-magnify"
      />
    </div>
    <v-data-table
      :headers="columns"
      :loading="loading"
      :search="search"
      :items="data"
      :dense="dense"
      height="500"
      fixed-header
      class="data-table__content"
    >
      <template v-slot:item.action="{ item }">
        <slot name="actions" :item="item" />
        <v-btn v-if="change" icon small @click="changeItem(item)">
          <v-icon small color="green">
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn v-if="remove" icon small @click="removeItem(item)">
          <v-icon small color="red">
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { defineComponent, onMounted, ref } from '@vue/composition-api'
import { setupDataLoader } from '../../lib/data-loader'

/**
 * @displayName DataViewer
 *
 * @version 1.0.0
 * @author Arish Khan <arishsultan104@gmail.com>
 */
export default defineComponent({
  name: 'DataViewer',

  props: {
    /**
     * Title of the Viewer, it determines the type
     * of data that is being displayed.
     *
     * @since 1.0.0
     */
    title: {
      type: String,
      required: true
    },

    /**
     * Material design related prop
     *
     * @since 1.0.0
     */
    dense: {
      type: Boolean,
      default: false
    },

    /**
     * List of columns that are required to be viewed.
     *
     * @since 1.0.0
     */
    columns: {
      type: Array,
      required: true
    },

    /**
     * Options or additional action that need to be
     * performed on the data such as, printing a summary
     * report etc.
     *
     * @since 1.0.0
     */
    options: {
      type: Array,
      required: false,
      default: () => []
    },

    /**
     * Determines if the account can create new items
     * or not.
     *
     * @since 1.0.0
     */
    create: {
      type: Boolean,
      default: false
    },

    /**
     * Determines if the account can change items or not.
     *
     * @since 1.0.0
     */
    change: {
      type: Boolean,
      default: false
    },

    /**
     * Determines if the account can create remove items
     * or not.
     *
     * @since 1.0.0
     */
    remove: {
      type: Boolean,
      default: false
    },

    /**
     * It is the Service that will make the request to
     * server including the parsing of request data and
     * response data.
     *
     * @since 1.0.0
     */
    endpoint: {
      type: String,
      required: true
    },

    pagination: {
      type: Boolean,
      default: false
    },

    createRoute: {
      type: String,
      default: null,
      required: false
    },

    changeRoute: {
      type: String,
      default: null,
      required: false
    },

    removeRoute: {
      type: String,
      default: null,
      required: false
    }
  },

  setup(props, context) {
    const loader = setupDataLoader(context.root.$axios, props.endpoint, true)

    onMounted(loader.load)

    const search = ref('')
    const filter = ref(false)

    if (props.columns[props.columns.length - 1].text !== 'Action')
      props.columns.push({
        text: 'Action',
        value: 'action',
        sortable: false,
        filterable: false,
        align: 'right',
        width: 150
      })

    function handleCreateEvent() {
      context.root.$options.router.push(props.createRoute)
    }

    async function removeItem(item) {
      if (confirm('Are you sure?')) {
        await context.root.$axios.$delete(
          props.removeRoute.replace('$id', item._id)
        )
        loader.data.value.splice(loader.data.value.indexOf(item), 1)
      }
    }

    function changeItem(item) {
      context.root.$router.push(props.changeRoute.replace('$id', item._id))
    }

    return {
      search,
      filter,
      ...loader,
      removeItem,
      changeItem,
      handleCreateEvent
    }
  }
})
</script>

<style lang="sass">
.data-viewer
  width: 100% !important
</style>
