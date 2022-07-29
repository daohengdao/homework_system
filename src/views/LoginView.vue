<template>
  <ContentBase>
    <div class="row justify-content-md-center">
      <div class="col-3">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <input v-model="username" type="text" class="form-control" id="username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="password" type="password" class="form-control" id="password">
          </div>
          <div class="error-msg">{{error_msg}}</div>
          <button type="submit" class="btn btn-primary">登录</button>
        </form>
      </div>
    </div>
  </ContentBase>
</template>

<script>
import ContentBase from '../components/ContentBase';
import {useStore} from "vuex";
import {ref} from "vue";
import router from "@/router";


export default {
  name: 'LoginView',
  components: {
    ContentBase,
  },
  setup(){
    const store=useStore();

    let username=ref('');
    let password=ref('');
    let error_msg=ref('');

    const login=()=>{
      error_msg.value='';
      store.dispatch("login",{
        username:username.value,
        password:password.value,
        success(){
          if(username.value!="admin"){
            router.push({name:"baseInfo"});
          }else {
            router.push({name: 'home'});
          }
        },
        error(){
          error_msg.value="用户名或者密码错误";
        }
      });

    }

    return{
      username,
      password,
      error_msg,
      login
    }
  }
}
</script>


<style scoped>
button{
  width:100%;
}

.error-msg{
  color:red;
}
</style>