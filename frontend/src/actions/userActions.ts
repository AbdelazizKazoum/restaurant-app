import axios from "axios";
import { isArray } from "@vue/shared";

//----------------- Create a New user -------------------
export const createUser = async (newUser) => {
    try {
        const { data: user } = await axios.post('auth/register', {
            email: newUser.email,
            user_name: newUser.user_name,
            pass: newUser.pass,
            confirmPass: newUser.confirmPass
        });
        return {
            error: false,
            success: true,
            user,
            message: ['User created succefully']
        }
    } catch ({ response }) {
        return {
            message: [...isArray(response.data.message) ? response.data.message : Array(response.data.message)],
            error: true,
            success: false,
            user: []
        }
    }
}
//--------------------------- Login user ------------------------
export const loginUser = () => {
}
//--------------------------- Delete User -----------------------
export const deleteUser = async (id) => {
    try {
        const { data } = await axios.delete(`users/${id}`)

        console.log(data);
        return {
            message: data.message
        }
    } catch (error) {
        console.log(error)
    }
}

//--------------------------- Update User -----------------------
export const updateUser = async (id, user) => {
    try {
        const { data } = await axios.patch(`users/${id}`, user)
        if (data.affected && data.affected != 0) {
            return {
                success: true,
                message: 'User updated seccussffuly'
            }
        } else {
            return {
                error: true,
                message: 'Something went wrong !'
            }
        }

    } catch ({ response }) {
        console.log(response.data)
        return {
            error: true,
            message: response.data.message
        }
    }
}