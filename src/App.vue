<template>
  <div id="app">
    <router-view :orders="orders" />
  </div>
</template>
<script>
import { fb, db } from "@/firebase";
import { getDatabase, ref, onValue } from "firebase/database";
console.log(db, fb);

export default {
  data() {
    return {
      orders: [],
      currentOrders: 5,
      soundurl:
        "http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3",
    };
  },
  created() {
    const db = getDatabase();
    const starCountRef = ref(db, "order/");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.orders = Object.values(data);
      console.log(this.orders.length);
    });
  },
};
</script>
