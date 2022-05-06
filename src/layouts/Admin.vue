<template>
  <div>
    <sidebar :orders="orders" />

    <div class="relative md:ml-64 bg-blueGray-100">
      <admin-navbar />

      <header-stats @changeFilter="changeFilter" />
      <div class="px-4 md:px-10 mx-auto w-full -m-24">
        <router-view :filter="filter" />
        <footer-admin />
      </div>
    </div>
  </div>
</template>
<script>
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import HeaderStats from "@/components/Headers/HeaderStats.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";
export default {
  name: "admin-layout",
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  components: {
    AdminNavbar,
    Sidebar,
    HeaderStats,
    FooterAdmin,
  },
  data() {
    return {
      filter: "",
    };
  },
  methods: {
    changeFilter(filter) {
      console.log(filter);
      this.filter = filter;
    },
  },
};
</script>
