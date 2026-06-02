import './style.css';

document.querySelector('#app').innerHTML = `
  <main class="min-h-screen bg-slate-100 px-6 py-10 text-slate-900">
    <section class="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg">
      <p class="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
        Tailwind CSS
      </p>

      <h1 class="mb-4 text-4xl font-bold">
        Домашнє завдання готове до старту
      </h1>

      <p class="mb-6 text-lg text-slate-600">
        Проект налаштовано через Vite та Tailwind CSS.
      </p>

      <button class="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
        Перевірити стилі
      </button>
    </section>
  </main>
`;