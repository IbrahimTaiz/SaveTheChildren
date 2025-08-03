<template>
  <AdminLayout>
  <div class="container mx-auto px-4 py-10">
    <h2 class="text-3xl font-bold mb-6">Project Details</h2>

    <div v-if="project" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h3 class="text-xl font-bold">{{ project.name }}</h3>
      <p class="text-gray-600">{{ project.description }}</p>
      <p class="mt-3"><strong>Needed Fund:</strong> ${{ project.neededFund }}</p>
      <p><strong>Funds Received:</strong> ${{ project.fundsReceived }}</p>
      <p><strong>Expenses:</strong> ${{ project.expenses }}</p>
    </div>

    <!-- ✅ التبرعات المرتبطة -->
    <h3 class="text-2xl font-bold mb-3">Donations</h3>
    <div v-if="projectDonations.length" class="mb-6 space-y-2">
      <div
        v-for="d in projectDonations"
        :key="d.id"
        class="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700"
      >
        <p><strong>Donor:</strong> {{ d.donorName }}</p>
        <p><strong>Amount:</strong> ${{ d.amount }}</p>
        <p><strong>Date:</strong> {{ new Date(d.date).toLocaleString() }}</p>
      </div>
    </div>
    <p v-else class="text-gray-500">No donations yet.</p>

    <!-- ✅ المصروفات المرتبطة -->
    <h3 class="text-2xl font-bold mb-3">Expenses</h3>
    <div v-if="projectExpenses.length" class="space-y-2">
      <div
        v-for="e in projectExpenses"
        :key="e.id"
        class="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700"
      >
        <p><strong>Description:</strong> {{ e.description }}</p>
        <p><strong>Amount:</strong> ${{ e.amount }}</p>
        <p><strong>Date:</strong> {{ new Date(e.date).toLocaleString() }}</p>
      </div>
    </div>
    <p v-else class="text-gray-500">No expenses yet.</p>
  </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import AdminLayout from "./components/AdminLayout.vue";

const route = useRoute();
const project = ref(null);
const projectDonations = ref([]);
const projectExpenses = ref([]);

onMounted(() => {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const donations = JSON.parse(localStorage.getItem("donations")) || [];
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  project.value = projects.find((p) => p.id == route.params.id);
  projectDonations.value = donations.filter((d) => d.projectId == route.params.id);
  projectExpenses.value = expenses.filter((e) => e.projectId == route.params.id);
});
</script>
