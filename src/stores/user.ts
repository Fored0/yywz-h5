import type { User } from "@/types/user";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("cp-user", () => {

  const user = ref<User>()

  const setUser = (args: User) => {
    user.value = args
  }

  const delUser = () => {
    user.value = undefined
  }

  return {
    user,
    setUser,
    delUser
  }
})