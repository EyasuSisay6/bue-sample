<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <card-table
        :headers="[
          'Name',
          'Total Earnings',
          'Status',
          'Phone Number',
          'Total Jobs Completed',
        ]"
        title="Bikers List"
      >
        <tr v-for="biker in bikers" :key="biker.name">
          <th
            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
          >
            <img
              :src="biker.image"
              class="h-12 w-12 bg-white rounded-full border"
              alt="..."
            />
            <span class="ml-3 font-bold text-blueGray-600">
              {{ biker.name }}
            </span>
          </th>
          <td
            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            {{ biker.earnings }}
          </td>
          <td
            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            <div v-if="biker.status === 'Available'">
              <i class="fas fa-circle text-emerald-500 mr-2"></i>
              Available
            </div>
            <div v-else>
              <i class="fas fa-circle text-red-500 mr-2"></i> Unavailable
            </div>
          </td>
          <td
            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            <div class="flex">
              {{ biker.phone }}
            </div>
          </td>
          <td
            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            <div class="flex items-center">
              <span class="mr-2">{{ biker.jobs }}%</span>
              <div class="relative w-full">
                <div
                  class="overflow-hidden h-2 text-xs flex rounded bg-red-200"
                >
                  <div
                    :style="`width: ${biker.jobs}%`"
                    class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                    :class="[
                      biker.jobs >= 90
                        ? 'bg-emerald-500'
                        : biker.jobs >= 70
                        ? 'bg-orange-500'
                        : 'bg-red-500',
                    ]"
                  ></div>
                </div>
              </div>
            </div>
          </td>
          <td
            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
          >
            <table-dropdown />
          </td>
        </tr>
      </card-table>
    </div>
  </div>
</template>
<script>
import CardTable from "@/components/Cards/CardTable.vue";
import TableDropdown from "@/components/Dropdowns/TableDropdown.vue";

import team1 from "@/assets/img/team-1-800x800.jpg";
import team2 from "@/assets/img/team-2-800x800.jpg";
import team3 from "@/assets/img/team-3-800x800.jpg";
import team4 from "@/assets/img/team-4-470x470.png";

export default {
  components: {
    CardTable,
    TableDropdown,
  },
  data() {
    return {
      team1,
      team2,
      team3,
      team4,
      bikers: [
        {
          name: "Mujib Kassim",
          image: team1,
          earnings: "2,500 ETB",
          status: "Available",
          phone: "+251 987 654 321",
          jobs: "90",
        },
        {
          name: "Leo Messi",
          image: team2,
          earnings: "22,900 ETB",
          status: "Unavailable",
          phone: "+251 987 654 321",
          jobs: "50",
        },
        {
          name: "Karim Benzema",
          image: team3,
          earnings: "500 ETB",
          status: "Unavailable",
          phone: "+251 987 654 321",
          jobs: "100",
        },
        {
          name: "Slim Shady",
          image: team4,
          earnings: "44,500 ETB",
          status: "Available",
          phone: "+251 987 654 321",
          jobs: "70",
        },
      ],
    };
  },
};
</script>
