<template>
  <div class="header">
    <v-container>
      <br /><br />

      <v-navigation-drawer
        fixed true
        v-model="drawer"
        :color="color"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="right"
        :permanent="permanent"
        dark
      >
        <v-list dense nav class="py-0">
          <v-list-item>
            <v-list-item-avatar> </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title></v-list-item-title>
              <v-list-item-subtitle></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AppBar",

  data: function () {
    return {
      drawer: true,
      items: [
        {
          title: "Create Resource",
          icon: "mdi-comment-plus-outline",
          to: "/CreateRS",
        },
        {
          title: "Retrieve Resource",
          icon: "mdi-checkbox-multiple-marked",
          to: "/RetrieveRS",
        },
        {
          title: "Update Resource",
          icon: "mdi-update",
          to: "/updateRS",
        },
        {
          title: "Delete Resource",
          icon: "mdi-delete-forever",
          to: "/deleteRS",
        },
        {
          title: "Notification",
          icon: "mdi-star-circle",
          to: "/notis",
        },
      ],
      color: "#3b1a9e",

      right: true,
      permanent: true,
      miniVariant: true,
      expandOnHover: true,
      background: false,
    };
  },

  methods: {},
};
</script>

<style>
.header {
  display: flex;
  align-items: center;
}
</style>
