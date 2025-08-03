<template>

<Header></Header>
  <div class="container mx-auto px-4 py-10">
    <!-- ✅ التبرع العام -->
  <!-- ✅ التبرع العام -->
<div class="flex justify-center mb-10">
  <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-lg w-full">
    <h2 class="text-2xl p-4 font-bold text-gray-900 dark:text-white text-center mb-5">
      General Donation
    </h2>

    <form @submit.prevent="makeGeneralDonation" class="space-y-3">
      <input
        v-model="generalDonation.name"
        type="text"
        placeholder="Your Name"
        class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        v-model.number="generalDonation.amount"
        type="number"
        min="1"
        placeholder="Donation Amount ($)"
        class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        required
      />

      <button
        type="submit"
        class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
      >
        Donate
      </button>
    </form>
  </div>
</div>


    <!-- ✅ عنوان المشاريع -->
    <h2 class="text-3xl p-4 md:text-4xl font-extrabold text-gray-900 mb-10 text-center">
      Available Projects
    </h2>

    <!-- ✅ عرض المشاريع -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition"
      >
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {{ project.name }}
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
          {{ project.description }}
        </p>

        <!-- شريط التقدم -->
        <div class="mb-3">
          <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              class="h-3 rounded-full bg-blue-600 transition-all"
              :style="{ width: getProgress(project) + '%' }"
            ></div>
          </div>
          <p class="text-xs text-gray-500 mt-1">
            {{ project.fundsReceived }} / {{ project.neededFund }} USD
          </p>
        </div>

        <div class="text-sm space-y-1 mb-4">
          <p><span class="font-semibold">Needed:</span> ${{ project.neededFund }}</p>
          <p><span class="font-semibold">Received:</span> ${{ project.fundsReceived }}</p>
          <p><span class="font-semibold">Remaining:</span> ${{ getRemaining(project) }}</p>
        </div>

        <button
          @click="openDonateModal(project)"
          :disabled="getRemaining(project) === 0"
          class="w-full py-2.5 rounded-lg text-white font-semibold transition"
          :class="getRemaining(project) === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'"
        >
          {{ getRemaining(project) === 0 ? "Fully Funded" : "Donate" }}
        </button>
      </div>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-red-900 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h3 class="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          Donate to {{ selectedProject?.name }}
        </h3>
        <input
          v-model="donorName"
          type="text"
          placeholder="Your Name"
          class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-3"
          required
        />

        <input
          v-model.number="donationAmount"
          type="number"
          min="1"
          class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Enter amount (USD)"
          required
        />

        <p v-if="errorMessage" class="text-red-600 text-sm mb-3">
          {{ errorMessage }}
        </p>

        <div class="flex gap-3">
          <button
            @click="confirmDonation"
            class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          >
            Confirm
          </button>
          <button
            @click="closeModal"
            class="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const projects = ref([]);
const donations = ref([]);
const showModal = ref(false);
const selectedProject = ref(null);
const donationAmount = ref(null);
const donorName = ref("");
const errorMessage = ref("");
const generalDonation = ref({ name: "", amount: null });

onMounted(() => {
  const storedProjects = localStorage.getItem("projects");
  if (storedProjects) projects.value = JSON.parse(storedProjects);

  const storedDonations = localStorage.getItem("donations");
  if (storedDonations) donations.value = JSON.parse(storedDonations);
});

const saveDonations = () => {
  localStorage.setItem("donations", JSON.stringify(donations.value));
};

const getProgress = (project) =>
  Math.min((project.fundsReceived / project.neededFund) * 100, 100);

const getRemaining = (project) =>
  Math.max(project.neededFund - project.fundsReceived, 0);

const openDonateModal = (project) => {
  selectedProject.value = project;
  donationAmount.value = null;
  donorName.value = "";
  errorMessage.value = "";
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const confirmDonation = () => {
  if (!donorName.value || !donationAmount.value || donationAmount.value <= 0) {
    errorMessage.value = "Please fill out all fields correctly.";
    return;
  }

  const remaining = getRemaining(selectedProject.value);

  if (donationAmount.value > remaining) {
    errorMessage.value = `The maximum allowed is $${remaining}.`;
    return;
  }

  selectedProject.value.fundsReceived += donationAmount.value;

  donations.value.push({
    id: Date.now(),
    donorName: donorName.value,
    amount: donationAmount.value,
    projectId: selectedProject.value.id,
    date: new Date().toISOString(),
  });

  localStorage.setItem("projects", JSON.stringify(projects.value));
  saveDonations();

  showModal.value = false;
};

const makeGeneralDonation = () => {
  if (!generalDonation.value.name || !generalDonation.value.amount || generalDonation.value.amount <= 0) {
    return alert("Please fill out all fields correctly!");
  }

  donations.value.push({
    id: Date.now(),
    donorName: generalDonation.value.name,
    amount: generalDonation.value.amount,
    projectId: null,
    date: new Date().toISOString(),
  });

  saveDonations();

  generalDonation.value = { name: "", amount: null };
  alert("Thank you for your donation!");
};
</script>
