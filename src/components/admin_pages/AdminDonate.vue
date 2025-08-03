<template>
<AdminLayout>
  <div class="container mx-auto px-4 py-10">
    <h2 class="text-3xl p-4 font-extrabold text-center mb-8">All Donations</h2>
<div class="flex flex-col gap-10">
    <!-- ✅ التبرعات العامة -->
    <div class="bg-white dark:bg-red-900 p-6 m-6 rounded-xl shadow-lg mb-12">
      <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">General Donations</h3>

      <table class="w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr class="bg-gray-100 dark:bg-red-800">
            <th class="border p-2">Donor</th>
            <th class="border p-2">Amount</th>
            <th class="border p-2">Date</th>
            <th class="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="donation in generalDonations"
            :key="donation.id"
            class="text-center"
          >
            <td class="border p-2">{{ donation.donorName }}</td>
            <td class="border p-2">${{ donation.amount }}</td>
            <td class="border p-2">{{ formatDate(donation.date) }}</td>
            <td class="border p-2">
              <button
                @click="openAssignModal(donation)"
                class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
              >
                Assign to Project
              </button>
            </td>
          </tr>
          <tr v-if="generalDonations.length === 0">
            <td colspan="4" class="border p-3 text-gray-500">No general donations.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ✅ التبرعات المرتبطة بالمشاريع -->
    <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
      <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Project Donations</h3>

      <table class="w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-800">
            <th class="border p-2">Donor</th>
            <th class="border p-2">Amount</th>
            <th class="border p-2">Project</th>
            <th class="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="donation in projectDonations"
            :key="donation.id"
            class="text-center"
          >
            <td class="border p-2">{{ donation.donorName }}</td>
            <td class="border p-2">${{ donation.amount }}</td>
            <td class="border p-2">{{ getProjectName(donation.projectId) }}</td>
            <td class="border p-2">{{ formatDate(donation.date) }}</td>
          </tr>
          <tr v-if="projectDonations.length === 0">
            <td colspan="4" class="border p-3 text-gray-500">No project donations.</td>
          </tr>
        </tbody>
      </table>
    </div>
</div>
    <!-- ✅ نافذة إسناد التبرع -->
    <div
      v-if="showAssignModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h3 class="text-xl font-bold mb-4 text-center">Assign Donation</h3>

        <label class="block mb-2 font-semibold">Select Project:</label>
        <select
          v-model="selectedProjectId"
          class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
        >
          <option v-for="project in projects" :key="project.id" :value="project.id">
            {{ project.name }} (Remaining: ${{ getRemaining(project) }})
          </option>
        </select>

        <div class="flex gap-3">
          <button
            @click="assignDonation"
            class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          >
            Confirm
          </button>
          <button
            @click="closeAssignModal"
            class="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import AdminLayout from "./components/AdminLayout.vue";


const donations = ref([]);
const projects = ref([]);
const showAssignModal = ref(false);
const donationToAssign = ref(null);
const selectedProjectId = ref(null);

onMounted(() => {
  const storedDonations = localStorage.getItem("donations");
  if (storedDonations) donations.value = JSON.parse(storedDonations);

  const storedProjects = localStorage.getItem("projects");
  if (storedProjects) projects.value = JSON.parse(storedProjects);
});

const generalDonations = computed(() =>
  donations.value.filter((d) => d.projectId === null)
);

const projectDonations = computed(() =>
  donations.value.filter((d) => d.projectId !== null)
);

const getProjectName = (id) => {
  const p = projects.value.find((proj) => proj.id === id);
  return p ? p.name : "Unknown";
};

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const getRemaining = (project) =>
  Math.max(project.neededFund - project.fundsReceived, 0);

const openAssignModal = (donation) => {
  donationToAssign.value = donation;
  selectedProjectId.value = null;
  showAssignModal.value = true;
};

const closeAssignModal = () => {
  showAssignModal.value = false;
};

const assignDonation = () => {
  if (!selectedProjectId.value) {
    alert("Please select a project!");
    return;
  }

  const project = projects.value.find((p) => p.id === selectedProjectId.value);

  if (!project) return;

  // تحقق من أن المبلغ لا يتجاوز المبلغ المتبقي
  if (donationToAssign.value.amount > getRemaining(project)) {
    alert(`This project can only receive up to $${getRemaining(project)}!`);
    return;
  }

  // تحديث المشروع
  project.fundsReceived += donationToAssign.value.amount;

  // تحديث التبرع
  donationToAssign.value.projectId = project.id;

  // حفظ البيانات
  localStorage.setItem("projects", JSON.stringify(projects.value));
  localStorage.setItem("donations", JSON.stringify(donations.value));

  showAssignModal.value = false;
};
</script>
