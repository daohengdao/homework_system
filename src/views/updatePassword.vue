<template>
<ContentBase>
  <div class="row justify-content-md-center">
    <div class="col-3">
      <form @submit.prevent="modify">
        <div class="mb-3">
          <label for="username" class="form-label">原密码</label>
          <input v-model="modifyPassword.old_password" type="text" class="form-control" id="old">
        </div>
        <div class="mb-3">
          <label for="username" class="form-label">新密码</label>
          <input v-model="modifyPassword.new_password" type="text" class="form-control" id="new">
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">确认密码</label>
          <input v-model="modifyPassword.new_passComfirm" type="password" class="form-control" id="confirm">
        </div>
        <div class="error_msg">{{error_msg}}</div>
        <button type="submit" class="btn btn-primary">修改</button>
      </form>
    </div>
  </div>
</ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";
import {useStore} from "vuex";
import {ref} from "vue";
import router from "@/router";

export default {
  name: "updatePassword",
  components:ContentBase,
  setup(){



    const store=useStore();



    const modifyPassword={
      username:store.state.user.username,
      old_password:'',
      new_password:'',
      new_passComfirm:''
    }

    const error_msg=ref('');

    if(!store.state.user.is_login){
      router.push({
        name:'login'
      })
    }

    const modify=()=>{
      if (modifyPassword.new_password!=modifyPassword.new_passComfirm){
        error_msg.value='两次输入的密码不一致'
      }else {
        console.log(modifyPassword);
        router.push({
          name:'success',
          params:{
            flag:true
          }
        })
      }
    }

    return{
      modifyPassword,
      error_msg,
      modify
    }
  }
}
</script>

<style scoped>
.error_msg{
  color: red;
}
</style>