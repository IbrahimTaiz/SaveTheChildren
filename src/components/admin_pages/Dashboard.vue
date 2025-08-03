<template>
  <AdminLayout>

  <div class="container mx-auto px-4 py-10 space-y-10">
    <!-- 🔹 البطاقات -->
    <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
      <DashboardCard title="Total Projects" :value="projects.length" color="bg-blue-500" />
      <DashboardCard title="Uncompleted Projects" :value="uncompletedProjectsCount" color="bg-yellow-500" />
      <DashboardCard title="Total Needed Fund" :value="'$' + totalNeededFund" color="bg-purple-500" />
      <DashboardCard title="Total Received Funds" :value="'$' + totalReceivedFunds" color="bg-red-500" />
      <DashboardCard title="Total Donations (All)" :value="'$' + totalAllDonations" color="bg-teal-500" />
      <DashboardCard title="Total Expenses" :value="'$' + totalExpenses" color="bg-red-500" />
      <DashboardCard title="Needed After Donations" :value="'$' + neededAfterDonations" color="bg-pink-500" />
      <DashboardCard title="Remaining Non-Spent Funds" :value="'$' + remainingNonSpentFunds" color="bg-indigo-500" />
    </div>

    <!-- 🔹 جدول المشاريع -->
    <DashboardTable
      title="Projects Overview"
      :headers="['Name', 'Needed', 'Received', 'Expenses', 'Remaining']"
      :rows="projects.map(p => [
        p.name,
        '$' + (p.neededFund || 0),
        '$' + (p.fundsReceived || 0),
        '$' + (p.expenses || 0),
        '$' + getRemaining(p)
      ])"
    />

    <!-- 🔹 جدول التبرعات -->
    <DashboardTable
      title="All Donations"
      :headers="['Donor', 'Amount', 'Project', 'Date']"
      :rows="donations.map(d => [
        d.donorName,
        '$' + d.amount,
        getProjectName(d.projectId) || 'General Donation',
        new Date(d.date).toLocaleDateString()
      ])"
    />

    <!-- 🔹 جدول المصروفات -->
    <DashboardTable
      title="All Expenses"
      :headers="['Project', 'Description', 'Amount', 'Date']"
      :rows="expenses.map(e => [
        getProjectName(e.projectId),
        e.description,
        '$' + e.amount,
        new Date(e.date).toLocaleDateString()
      ])"
    />
  </div>
</AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import AdminLayout from "./components/AdminLayout.vue";
import DashboardCard from "./components/DashboardCard.vue";
import DashboardTable from "./components/DashboardTable.vue";

const projects = ref([]);
const donations = ref([]);
const expenses = ref([]);

onMounted(() => {
  projects.value = JSON.parse(localStorage.getItem("projects")) || [];
  donations.value = JSON.parse(localStorage.getItem("donations")) || [];
  expenses.value = JSON.parse(localStorage.getItem("expenses")) || [];
});

const totalNeededFund = computed(() =>
  projects.value.reduce((sum, p) => sum + (p.neededFund || 0), 0)
);
const totalReceivedFunds = computed(() =>
  projects.value.reduce((sum, p) => sum + (p.fundsReceived || 0), 0)
);
const totalExpenses = computed(() =>
  expenses.value.reduce((sum, e) => sum + (e.amount || 0), 0)
);
const uncompletedProjectsCount = computed(() =>
  projects.value.filter((p) => (p.fundsReceived || 0) !== (p.expenses || 0)).length
);
const neededAfterDonations = computed(
  () => totalNeededFund.value - totalReceivedFunds.value
);
const remainingNonSpentFunds = computed(
  () => totalReceivedFunds.value - totalExpenses.value
);
const totalAllDonations = computed(() =>
  donations.value.reduce((sum, d) => sum + (d.amount || 0), 0)
);

const getRemaining = (p) =>
  Math.max((p.neededFund || 0) - (p.expenses || 0), 0);
const getProjectName = (id) => {
  const project = projects.value.find((p) => p.id === id);
  return project ? project.name : null;
};
</script>
