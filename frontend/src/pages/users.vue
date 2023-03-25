<template>
  <section class="container px-4 mx-auto">
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <div class="flex items-center gap-x-3">
          <h2 class="text-lg font-medium text-gray-800 dark:text-white">Users</h2>

          <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {{ usersCount }} Users
          </span>
        </div>

      </div>

      <div class="flex items-center mt-4 gap-x-3">


      </div>
    </div>

    <div class="mt-6 md:flex md:items-center justify-between">

      <div class="relative flex items-center mt-4 mb-4 md:mt-0">
        <span class="absolute">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </span>

        <input v-model="search" type="text" placeholder="Search"
          class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
      </div>

      <button
        class="mb-4 flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

        <span>Add User</span>
      </button>
    </div>

    <div class="flex flex-col mt-6">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col"
                    class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <span>Image</span>
                  </th>
                  <th scope="col"
                    class="py-3.5  text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <span>User name</span>
                  </th>

                  <th scope="col"
                    class="px-3.5 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Role
                  </th>

                  <th scope="col"
                    class="px-3.5 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Email
                  </th>

                  <th scope="col"
                    class=" py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Activity number</th>

                  <th scope="col" class="relative py-3.5 px-4">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                <tr v-for="user in users" :key="user.id">
                  <td class="px-3 py-1.5 text-sm whitespace-nowrap">
                    <div class="flex items-center">
                      <img
                        class="object-cover w-10 h-10 mx-2 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1256&q=80"
                        alt="">
                    </div>
                  </td>
                  <td class=" text-left py-1.5 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                    {{ user.user_name }}
                  </td>

                  <td class=" text-left  py-1.5 text-sm font-medium whitespace-nowrap">
                    <div
                      class="inline px-3 py-1.5 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                      Customer
                    </div>
                  </td>
                  <td class=" text-left text-left py-1.5 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                    {{ user.email }}
                  </td>
                  <td class="text-left py-1.5 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                    240
                  </td>


                  <td class=" text-left px-4 py-1.5 text-sm whitespace-nowrap">
                    <button
                      class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 sm:flex sm:items-center sm:justify-between ">
      <div class="text-sm text-gray-500 dark:text-gray-400">
        Page <span class="font-medium text-gray-700 dark:text-gray-100">{{ page }} of {{ lastPage }}</span>
      </div>

      <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
        <button @click.prevent="previousPage"
          class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-5 h-5 rtl:-scale-x-100">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          previous
        </button>

        <button @click.prevent="nextPage"
          class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
          <span>
            Next
          </span>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-5 h-5 rtl:-scale-x-100">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';

export default {

  setup() {

    const users = ref([]);
    const search = ref('');
    const page = ref(1);
    let lastPage = ref();
    const usersCount = ref();

    //----------------- Onload function ----------------
    onMounted(async () => {
      paginate(page, search)
    });


    //----------------- Watchers ---------------------
    watch([search, page], async () => {
      paginate(page, search)
    })

    //--------------------Pagination functions -------------------
    const paginate = async (page, search) => {
      try {
        const { data } = await axios.get(`users?search=${search.value}&page=${page.value}`);
        users.value = data.listUsers;
        lastPage.value = data.meta.lastPage;
        usersCount.value = data.meta.count;
        console.log(data);
      } catch (err) {
        console.log(err)
      }
    }

    const nextPage = () => {
      if (page.value < lastPage.value) {
        page.value += 1;
      }
    }
    const previousPage = () => {
      if (page.value != 1 && page.value > 0) {
        page.value -= 1;
      }
    }

    //Return all
    return {
      users,
      search,
      page,
      lastPage,
      usersCount,
      nextPage,
      previousPage
    }

  }


}
</script>

<style></style>