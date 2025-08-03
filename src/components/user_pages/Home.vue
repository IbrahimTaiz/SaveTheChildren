<template>
    <Header></Header>
<main class="container mx-auto">

    <section
    class="relative bg-[url('../images/One.jpg')] bg-cover bg-center min-h-[60vh] md:min-h-[80vh] flex items-center justify-center">
    <div class="absolute inset-0 bg-black/50"></div>
    <div class="relative z-10 max-w-2xl text-center text-white px-6">
      <h1 class="text-3xl md:text-5xl font-bold mb-6 leading-tight">
        Standing for Dignity and Equality
      </h1>
      <a href="https://www.savethechildren.ma/the-waed-network"
        class="inline-block bg-red-700 hover:bg-red-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
        The Wa’ed Network
      </a>
    </div>
  </section>

<section id="our-work" class="py-20 bg-white">
  <div class="container mx-auto px-4 flex flex-col items-center text-center">
    <div class="max-w-3xl">
      <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-snug">
        Ending violence against women and girls. Ensuring women can
        participate in the decisions that affect them.
      </h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        SaveTheChildren is a network of civil society groups and activists in 13
        countries in Africa and the Arab region. We provide an international
        platform for women to share skills and knowledge, and be part of a
        regional movement.
      </p>
    </div>
  </div>
</section>

<section id="home" class="py-20 bg-gray-50">
  <div class="container mx-auto px-4 flex flex-col items-center text-center">
    <div class="max-w-2xl">
      <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-snug">
        Beijing +30: Reflections from activists in Africa and the Arab region
      </h2>
      <button
        class="bg-red-700 hover:bg-red-800 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-transform transform hover:scale-105">
        Learn More
      </button>
    </div>
  </div>
</section>


  <section id="our-history" class="py-16 bg-white">
    <div class="container mx-auto px-4">
<section id="about-us" class="py-20 bg-white">
  <div class="container mx-auto px-4 flex flex-col items-center text-center">
    <div class="max-w-3xl">
      <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-snug">
        About Us
      </h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Discover our journey, milestones, and continuous commitment to
        women's rights and empowerment across the Arab region.
      </p>
    </div>
  </div>
</section>
      <div class="flex flex-col gap-12">
        <div class="flex flex-col md:flex-row gap-8 items-center">
          <div class="flex-1">
            <img src="../../../../images/L1009660.jpg" alt="Foundation founding"
              class="w-full h-64 object-cover rounded-lg" />
          </div>
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Our mission</h3>
            <p class="text-gray-600 mb-4">
              SaveTheChildren aims to end all kinds of violence against women in the Arab
              region. We mobilize women’s influence and participation across all
              sectors - political, legal and civil activism - to address women’s
              advancement, security, protection, and participation.
            </p>
            <span
              class="inline-block bg-red-700 text-white px-3 py-1 rounded text-sm font-medium">
              Read More
            </span>
          </div>
        </div>
        <div class="flex flex-col md:flex-row-reverse gap-8 items-center">
          <div class="flex-1">
            <img src="../../../../images/IMG-20190410-WA0001.jpg" alt="Team growth"
              class="w-full h-64 object-cover rounded-lg" />
          </div>
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Our approach</h3>
            <p class="text-gray-600 mb-4">
              Help children
            </p>
            <span
              class="inline-block bg-red-700 text-white px-3 py-1 rounded text-sm font-medium">
              Read More
            </span>
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-8 items-center">
          <div class="flex-1">
            <img src="../../../../images/IMG-20190429-WA0034.jpg" alt="Our priorities"
              class="w-full h-64 object-cover rounded-lg" />
          </div>
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Our priorities</h3>
            <p class="text-gray-600 mb-4">
              Activists in the SaveTheChildren network work across Africa and the Middle
              East to dismantle legal frameworks that ingrain inequality,
              replacing them with modern laws that protect women and girls.
              SaveTheChildren supports its partners to help them achieve meaningful
              impact and sustainable results.
            </p>
            <span
              class="inline-block bg-red-700 text-white px-3 py-1 rounded text-sm font-medium">
              Read More
            </span>
          </div>
        </div>

      </div>
    </div>
  </section>

</main>
<Footer></Footer>
</template>

<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

</script>