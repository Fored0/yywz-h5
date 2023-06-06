<script setup lang="ts">
import { Button } from "vant"
import { useUserStore } from "./stores/user";
import request from '@/utils/request'
import type { User } from './types/user'
const userStore = useUserStore()

// 测试，请求拦截器，是否携带token，响应拦截器401拦截到登录地址
const getUserInfo = async () => {
  const res = await request('/patient/myUser')
  console.log(res)
}

// 测试，响应拦截器，出现非10000的情况，和返回剥离后的数据
const store = useUserStore()
const login = async () => {
  const res = await request<User>('/login/password', 'POST', {
    mobile: '13211112222',
    // 密码 abc123456 测试：出现非10000的情况
    password: 'abc12345'
  })
  store.setUser(res.data)
}

</script>

<template>
  <div class="name">zhangsan</div>
  <!-- <Button type="primary" @click="userStore.delUser">clear</Button>
    <Button type="primary"
      @click="userStore.setUser({ id: '1', mobile: '1', account: '1', avatar: '1', token: '1' })">set</Button> -->
  <Button type="primary" @click="getUserInfo">获取个人信息</Button>
  <Button type="primary" @click="login">登录</Button>
  <div>{{ userStore.user }}</div>
</template>

<style scoped  lang="scss">
.name {
  width: 200px;
  color: var(--cp-primary);
}
</style>