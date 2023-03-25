<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <errorMessage v-show="error" :message="message" hideMessage @hideMessage="hideMessage"></errorMessage>
        <SuccessMessage v-show="success" :message="message" hideMessage @hideMessage="hideMessage"></SuccessMessage>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
                bellVie
            </a>
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create account
                    </h1>
                    <form @submit.prevent="register" class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="email"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input v-model="newUser.email" type="email" name="email" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com" required="true">
                        </div>
                        <div>
                            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User
                                name</label>
                            <input v-model="newUser.user_name" type="username" name="username" id="username"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com" required="true">
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input v-model="newUser.pass" type="password" name="password" id="password"
                                placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="true">
                        </div>
                        <div>
                            <label for="confirm-password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                                Confirm password</label>
                            <input v-model="newUser.confirmPass" type="password" name="confirm-password"
                                id="confirm-password" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="true">
                        </div>
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="terms" aria-describedby="terms" type="checkbox"
                                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                    required="true">
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a
                                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        href="#">Terms and Conditions</a></label>
                            </div>
                        </div>
                        <button type="submit"
                            class="w-full text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            Create an account
                        </button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <router-link to="/signup" href="#"
                                class="font-medium text-dark-600 hover:underline dark:text-primary-500">Login
                                here</router-link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';
import errorMessage from '../components/messages/errorMessage.vue';
import successMessage from '../components/messages/successMessage.vue';
import SuccessMessage from '../components/messages/successMessage.vue';
import { useRouter } from 'vue-router';



export default {
    components: { errorMessage, SuccessMessage },

    setup() {

        //---------------- start variables --------------------------
        const newUser = reactive({
            email: '',
            user_name: '',
            pass: '',
            confirmPass: ''
        })
        const error = ref(false);
        const success = ref(false);
        const message = ref();
        const router = useRouter();

        //------------------ Register ------------------------------
        const register = async () => {
            try {
                const { data: user } = await axios.post('auth/register', {
                    email: newUser.email,
                    user_name: newUser.user_name,
                    pass: newUser.pass,
                    confirmPass: newUser.confirmPass
                });
                success.value = true;
                message.value = 'User created, login to your account';

                console.log(user);
            } catch ({ response }) {
                message.value = response.data.message;
                error.value = true;
                console.log(message.value)
            }
        }
        //-------------------Mounted----------------------
        onMounted(async () => {
            try {
                const { data } = await axios.get('auth');

                if (data) {
                    router.push({ name: 'dashboard' })
                }

            } catch (err) {
                console.log(err)
            }
        });

        //------------ Events -----------------
        const hideMessage = () => {
            error.value = false;
            success.value = false;
        }


        return {
            newUser,
            error,
            success,
            register,
            hideMessage,
            message
        }
    }
}

</script>

<style scoped></style>