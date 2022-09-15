<template>
  <v-app-bar color="gray" prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Matlab chart</v-toolbar-title>
  </v-app-bar>
  <v-navigation-drawer v-if="drawer" disable-resize-watcher permanent>
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-plus" title="Add chart" to="/"></v-list-item>
      <v-list-item prepend-icon="mdi-folder" title="List of charts" to="/chart/list"></v-list-item>
      <v-list-item prepend-icon="mdi-star" title="User's charts" to="/chart/user"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavbarComponent',

  data: () => ({
    drawer: false,
  }),
}
</script>