<template>
  <div class="center-child">
    <v-card class="form">
      <slot name="title">
        <h1 class="span-2">Title</h1>
      </slot>

      <slot />
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'MyForm'
}
</script>

<style>
.center-child {
  display: flex;
  justify-content: center;
}

.form {
  width: 550px;
  padding: 40px 40px 36px;

  display: grid;
  column-gap: 20px;
  grid-template-columns: calc(50% - 10px) calc(50% - 10px);
}

.span-2 {
  grid-column: 1 / 3;
}
</style>
