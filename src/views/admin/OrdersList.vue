<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <card-table
        :headers="[
          'Customer',
          'Restaurant',
          'Order',
          'Total Price',
          'Phone Number',
          'Status',
          'Actions',
        ]"
        :title="
          filter === 'Incoming'
            ? 'Incoming Orders'
            : filter === 'Approved'
            ? 'Approved Orders'
            : filter === 'Accepted'
            ? 'Accepted Orders'
            : 'All Orders'
        "
      >
        <tr
          v-for="(biker, i) in filter === 'Incoming'
            ? pending
            : filter === 'Approved'
            ? approved
            : filter === 'Accepted'
            ? accepted
            : orders"
          :key="i"
        >
          <td
            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            <span class="ml-3 font-bold text-blueGray-600">
              {{ biker?.customer?.name }}
            </span>
          </td>

          <td
            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            <span class="ml-3 font-bold text-blueGray-600">
              {{ biker?.restaurant }}
            </span>
          </td>
          <td
            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            <p v-for="order in biker.orderItems" :key="order">
              {{ order?.food?.name }}
            </p>
          </td>
          <td
            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            {{
              //sum of all the prices of the order
              biker?.orderItems?.reduce((acc, curr) => {
                return acc + curr.food.price;
              }, 0)
            }}
          </td>
          <td
            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            <div class="flex">
              {{ biker?.customer?.phoneNo }}
            </div>
          </td>

          <td
            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            <div v-if="biker.status === 'accepted'">
              <i class="fas fa-circle text-emerald-500 mr-2"></i>
              Accepted
            </div>
            <div v-else-if="biker.status === 'approved'">
              <i class="fas fa-circle text-emerald-500 mr-2"></i>
              Approved
            </div>
            <div v-else-if="biker.status === 'pending'">
              <i class="fas fa-circle text-orange-500 mr-2"></i>
              Pending
            </div>
            <div v-else-if="biker.status === 'in-route'">
              <i class="fas fa-circle text-orange-500 mr-2"></i>
              In-route
            </div>
            <div v-else-if="biker.status === 'cancelled'">
              <i class="fas fa-circle text-red-500 mr-2"></i>
              Cancelled
            </div>
            <div v-else>
              <i class="fas fa-circle text-emerald-500 mr-2"></i>
              Completed
            </div>
          </td>
          <td
            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
          >
            <!-- <table-dropdown /> -->
            <button
              class="bg-emerald-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              @click="writeOrderData(keys[i], { ...biker, status: 'approved' })"
            >
              Approve
            </button>

            <button
              class="bg-red-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              @click="
                writeOrderData(keys[i], { ...biker, status: 'cancelled' })
              "
            >
              Cancel
            </button>
          </td>
        </tr>
      </card-table>
    </div>
  </div>
</template>
<script>
import CardTable from "@/components/Cards/CardTable.vue";
// import TableDropdown from "@/components/Dropdowns/TableDropdown.vue";

import team1 from "@/assets/img/team-1-800x800.jpg";
import team2 from "@/assets/img/team-2-800x800.jpg";
import team3 from "@/assets/img/team-3-800x800.jpg";
import team4 from "@/assets/img/team-4-470x470.png";
import { fb, db } from "@/firebase";
import { getDatabase, ref, onValue, set } from "firebase/database";

console.log(db, fb);

export default {
  components: {
    CardTable,
    // TableDropdown,
  },
  props: {
    filter: {
      required: true,
    },
  },
  methods: {
    getOrders(item) {
      console.log(item);
    },

    writeOrderData(orderId, status) {
      const db = getDatabase();
      set(ref(db, "order/" + orderId), {
        ...status,
      }).then;
    },
  },
  computed: {
    pending() {
      //return all the orders that are pending
      return this.orders.filter((order) => order.status === "pending");
    },
    completed() {
      return this.orders.filter((order) => order.status === "completed");
    },
    inRoute() {
      return this.orders.filter((order) => order.status === "in-route");
    },
    cancelled() {
      return this.orders.filter((order) => order.status === "cancelled");
    },
    accepted() {
      return this.orders.filter((order) => order.status === "accepted");
    },
    approved() {
      return this.orders.filter((order) => order.status === "approved");
    },
  },
  data() {
    return {
      team1,
      team2,
      team3,
      team4,
      keys: [],
      bikers: [
        {
          customer: "Mujib Kassim",
          deliverer: "Karim Benzema",
          image: team1,
          totalPrice: "2,500 ETB",
          restaurant: "KFC",
          order: "Chicken",
          status: "Available",
          phone: "+251 987 654 321",
          jobs: "90",
        },
        {
          customer: "Leo Messi",
          deliverer: "Slim Shady",
          image: team2,
          totalPrice: "22,900 ETB",
          restaurant: "McDonalds",
          order: "Burger",
          status: "Unavailable",
          phone: "+251 987 654 321",
          jobs: "50",
        },
        {
          customer: "Karim Benzema",
          deliverer: "Leo Messi",
          image: team3,
          totalPrice: "500 ETB",
          restaurant: "KFC",
          order: "Chicken",
          status: "Unavailable",
          phone: "+251 987 654 321",
          jobs: "100",
        },
        {
          customer: "Slim Shady",
          deliverer: "Karim Benzema",
          image: team4,
          totalPrice: "44,500 ETB",
          restaurant: "Burger King",
          order: "Burger",
          status: "Available",
          phone: "+251 987 654 321",
          jobs: "70",
        },
      ],
      orders: [],
    };
  },
  //order from realtime database firebase
  created() {
    const db = getDatabase();
    const starCountRef = ref(db, "order/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.keys = Object.keys(data);
      this.orders = Object.values(data);
    });
  },
};
</script>
