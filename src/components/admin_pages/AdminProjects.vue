<template>
    <AdminLayout>

    <div class="min-h-screen flex flex-col items-center px-4 py-10">
        <!-- 🔹 العنوان -->
        <h2 class="text-3xl md:text-4xl p-4 font-extrabold text-gray-900 mb-8 text-center">
            Manage Projects
        </h2>

        <!-- 🔹 الفورم -->
        <div
            class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md border border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold mb-5 text-gray-800 dark:text-white text-center">
                {{ editIndex !== null ? "Edit Project" : "Add New Project" }}
            </h3>

            <form @submit.prevent="saveProject" class="space-y-4">
                <input v-model="form.name" type="text" placeholder="Project Name"
                    class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" required />

                <textarea v-model="form.description" placeholder="Project Description" rows="3"
                    class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                    required></textarea>

                <input v-model.number="form.neededFund" type="number" placeholder="Needed Fund ($)"
                    class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" required />

                <button type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
                    {{ editIndex !== null ? "Update Project" : "Add Project" }}
                </button>
            </form>
        </div>

        <!-- 🔹 مسافة بين الفورم والمشاريع -->
        <div class="mt-14 w-full">
            <h3 class="text-2xl p-4 font-bold text-gray-800 dark:text-white mb-6 text-center">
                Projects List
            </h3>

            <!-- 🔹 عرض المشاريع -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(project, index) in projects" :key="project.id"
                    class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-5 transition hover:shadow-lg">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {{ project.name }}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                        {{ project.description }}
                    </p>

                    <div class="space-y-1 text-sm mb-4 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                        <p><span class="font-semibold">Needed Fund:</span> ${{ project.neededFund }}</p>
                        <p><span class="font-semibold">Funds Received:</span> ${{ project.fundsReceived }}</p>
                        <p><span class="font-semibold">Expenses:</span> ${{ project.expenses }}</p>
                    </div>

                    <div class="flex gap-3">
                        <button @click="editProject(index)"
                            class="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition">
                            ✏️ Edit
                        </button>
                        <button @click="deleteProject(index)"
                            class="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition">
                            🗑 Delete
                        </button>
                        <button @click="$router.push(`/ProjectDetails/${project.id}`)"
                            class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
                            🔍 View
                        </button>
                    </div>
                </div>
            </div>

            <p v-if="projects.length === 0" class="text-center text-gray-500 mt-10">
                No projects added yet.
            </p>
        </div>
    </div>
    </AdminLayout>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import AdminLayout from "./components/AdminLayout.vue";

const projects = ref([]);
const form = ref({
    id: null,
    name: "",
    description: "",
    neededFund: null,
    fundsReceived: 0,
    expenses: 0,
});
const editIndex = ref(null);

onMounted(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
        projects.value = JSON.parse(storedProjects);
    }
});

watch(
    projects,
    (newVal) => {
        localStorage.setItem("projects", JSON.stringify(newVal));
    },
    { deep: true }
);

const saveProject = () => {
    if (editIndex.value !== null) {
        projects.value[editIndex.value] = { ...form.value };
        editIndex.value = null;
    } else {
        const newId = Date.now();
        projects.value.push({ ...form.value, id: newId });
    }

    form.value = { id: null, name: "", description: "", neededFund: null, fundsReceived: 0, expenses: 0 };
};

const editProject = (index) => {
    form.value = { ...projects.value[index] };
    editIndex.value = index;
};

const deleteProject = (index) => {
    if (confirm("Are you sure you want to delete this project?")) {
        projects.value.splice(index, 1);
    }
};
</script>
