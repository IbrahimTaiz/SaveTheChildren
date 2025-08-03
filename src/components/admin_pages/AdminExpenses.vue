<template>
  <AdminLayout>
    <div class="container mx-auto  py-10 flex flex-col items-center gap-10">
      <h2 class="text-3xl p-4 font-extrabold text-gray-900 text-center">
        Manage Expenses
      </h2>

      <!-- ✅ قسم اختيار المشروع (دائمًا في الوسط) -->
      <div
        class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-lg w-full"
      >
        <h3
          class="text-lg font-semibold mb-4 text-gray-800 dark:text-white text-center"
        >
          Select a Project
        </h3>

        <select
          v-model="selectedProjectId"
          class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Choose Project --</option>
          <option v-for="p in projects" :key="p.id" :value="p.id">
            {{ p.name }}
          </option>
        </select>
      </div>

      <!-- ✅ عند اختيار مشروع -->
      <div
        v-if="selectedProject"
        class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-3xl w-full"
      >
        <h3
          class="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center"
        >
          Expenses for "{{ selectedProject.name }}"
        </h3>

        <p class="text-center text-sm mb-6 text-gray-700 dark:text-gray-300">
          <strong>Funds Received:</strong> ${{ selectedProject.fundsReceived }} |
          <strong>Current Expenses:</strong> ${{ selectedProject.expenses || 0 }} |
          <strong>Remaining:</strong>
          ${{ selectedProject.fundsReceived - (selectedProject.expenses || 0) }}
        </p>

        <!-- ✅ جدول المصروفات -->
        <table class="w-full border border-gray-300 mb-8">
          <thead class="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th class="p-2 border">Description</th>
              <th class="p-2 border">Amount ($)</th>
              <th class="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="exp in getProjectExpenses(selectedProject.id)"
              :key="exp.id"
            >
              <td class="border p-2">{{ exp.description }}</td>
              <td class="border p-2">${{ exp.amount }}</td>
              <td class="border p-2 flex gap-2 justify-center">
                <button
                  @click="editExpense(exp)"
                  class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  @click="deleteExpense(exp.id)"
                  class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr
              v-if="getProjectExpenses(selectedProject.id).length === 0"
            >
              <td colspan="3" class="text-center text-gray-500 p-3">
                No expenses yet.
              </td>
            </tr>
          </tbody>
        </table>

        <!-- ✅ فورم إضافة / تعديل مصروف -->
        <form @submit.prevent="saveExpense" class="space-y-3">
          <input
            v-model="expenseForm.description"
            type="text"
            placeholder="Expense Description"
            class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            v-model.number="expenseForm.amount"
            type="number"
            min="1"
            placeholder="Expense Amount ($)"
            class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          <p v-if="errorMessage" class="text-red-600 text-sm">
            {{ errorMessage }}
          </p>

          <button
            type="submit"
            class="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg transition"
          >
            {{ editingExpenseId ? "Update Expense" : "Add Expense" }}
          </button>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import AdminLayout from "./components/AdminLayout.vue";

const projects = ref([]);
const expenses = ref([]);
const selectedProjectId = ref("");
const expenseForm = ref({ description: "", amount: null });
const editingExpenseId = ref(null);
const errorMessage = ref("");

// ✅ تحميل البيانات
onMounted(() => {
  const storedProjects = localStorage.getItem("projects");
  if (storedProjects) projects.value = JSON.parse(storedProjects);

  const storedExpenses = localStorage.getItem("expenses");
  if (storedExpenses) expenses.value = JSON.parse(storedExpenses);
});

const selectedProject = computed(() =>
  projects.value.find((p) => p.id === selectedProjectId.value) || null
);

const saveData = () => {
  localStorage.setItem("projects", JSON.stringify(projects.value));
  localStorage.setItem("expenses", JSON.stringify(expenses.value));
};

const getProjectExpenses = (projectId) =>
  expenses.value.filter((e) => e.projectId === projectId);

const saveExpense = () => {
  if (!selectedProject.value) return;

  const currentExpenses = selectedProject.value.expenses || 0;
  const oldAmount = editingExpenseId.value
    ? expenses.value.find((e) => e.id === editingExpenseId.value)?.amount || 0
    : 0;

  const newTotal = currentExpenses - oldAmount + expenseForm.value.amount;

  if (newTotal > selectedProject.value.fundsReceived) {
    errorMessage.value = "Expense exceeds available funds!";
    return;
  }

  errorMessage.value = "";

  if (editingExpenseId.value) {
    const expIndex = expenses.value.findIndex((e) => e.id === editingExpenseId.value);
    if (expIndex !== -1) {
      expenses.value[expIndex] = {
        ...expenses.value[expIndex],
        description: expenseForm.value.description,
        amount: expenseForm.value.amount,
      };
    }
  } else {
    expenses.value.push({
      id: Date.now(),
      projectId: selectedProject.value.id,
      description: expenseForm.value.description,
      amount: expenseForm.value.amount,
      date: new Date().toISOString(),
    });
  }

  selectedProject.value.expenses = newTotal;

  saveData();
  expenseForm.value = { description: "", amount: null };
  editingExpenseId.value = null;
};

const deleteExpense = (id) => {
  if (!confirm("Are you sure you want to delete this expense?")) return;

  const expIndex = expenses.value.findIndex((e) => e.id === id);
  if (expIndex !== -1) {
    const exp = expenses.value[expIndex];
    expenses.value.splice(expIndex, 1);

    const project = projects.value.find((p) => p.id === exp.projectId);
    if (project) {
      project.expenses = (project.expenses || 0) - exp.amount;
    }
  }

  saveData();
};

const editExpense = (expense) => {
  expenseForm.value = { description: expense.description, amount: expense.amount };
  editingExpenseId.value = expense.id;
};
</script>
