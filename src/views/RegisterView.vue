<template>
  <ContentBase>
    <form @submit.prevent="register">
      <div class="row mb-3">
        <label for="name" class="col-sm-2 col-form-label">姓名</label>
        <div class="col-sm-10">
          <input type="text" v-model="useInfo.name" class="form-control" id="name">
        </div>
      </div>
      <div class="row mb-3">
        <label for="username" class="col-sm-2 col-form-label">用户名</label>
        <div class="col-sm-10">
          <input type="text" v-model="useInfo.username" class="form-control" id="username">
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputPassword" class="col-sm-2 col-form-label">密码</label>
        <div class="col-sm-10">
          <input type="password" v-model="useInfo.password" class="form-control" id="inputPassword">
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputPassword2" class="col-sm-2 col-form-label">确认密码</label>
        <div class="col-sm-10">
          <input type="password" v-model="useInfo.is_password" class="form-control" id="inputPassword2">
        </div>
      </div>

      <div class="row mb-3">
        <label for="name" class="col-sm-2 col-form-label">联系方式</label>
        <div class="col-sm-10">
          <input type="text" v-model="useInfo.phone" class="form-control" id="phone">
        </div>
      </div>

      <div class="row mb-3" v-if="check_identity!='老师'">
        <label for="stuNum" class="col-sm-2 col-form-label">学号</label>
        <div class="col-sm-10">
          <input type="text" v-model="useInfo.stuNum"  class="form-control" id="stuNum">
        </div>
      </div>


      <div class="row mb-3" v-if="check_identity=='队长'">
        <label for="stuNum" class="col-sm-2 col-form-label">团队名</label>
        <div class="col-sm-10">
          <input type="text" v-model="useInfo.teamName"  class="form-control" id="teamName">
        </div>
      </div>

      <fieldset class="row mb-3">
        <legend class="col-form-label col-sm-2 pt-0">身份</legend>
        <div class="col-sm-10">
          <div class="form-check">
            <input class="form-check-input" v-model="useInfo.identity" @change="getIdentity" type="radio" name="gridRadios" id="gridRadios1" value="队长">
            <label class="form-check-label" for="gridRadios1">
              队长
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" v-model="useInfo.identity" @change="getIdentity" name="gridRadios" id="gridRadios2" value="队员">
            <label class="form-check-label" for="gridRadios2">
              队员
            </label>
          </div>
          <div class="form-check disabled">
            <input class="form-check-input" type="radio" name="gridRadios" v-model="useInfo.identity" @change="getIdentity" id="gridRadios3" value="老师">
            <label class="form-check-label" for="gridRadios3">
              老师
            </label>
          </div>
        </div>
      </fieldset>


      <fieldset class="row mb-3">
        <legend class="col-form-label col-sm-2 pt-0">性别</legend>
        <div class="col-sm-10">
          <div class="form-check">
            <input class="form-check-input" v-model="useInfo.sex" type="radio" name="Radios"  id="Radios1" value="男">
            <label class="form-check-label" for="Radios1">
              男
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" v-model="useInfo.sex" type="radio" name="Radios" id="Radios2" value="女">
            <label class="form-check-label" for="Radios2">
              女
            </label>
          </div>
        </div>
      </fieldset>

      <div class="error_msg">{{error_msg}}</div>
      <div class="error-message"></div>
      <button type="submit" class="btn btn-primary">注册</button>
    </form>
  </ContentBase>
</template>

<script>
import ContentBase from '../components/ContentBase';
import {ref} from "vue";
import router from "@/router";
import $ from 'jquery'
import baseUrl from "@/util/config";
import {useStore} from "vuex";

export default {
  name: 'RegisterView',
  components: {
    ContentBase,
  },
  setup(){
    const store=useStore();

    const useInfo={
      name:'',
      username:'',
      password:'',
      is_password:'',
      phone:'',
      stuNum:'',
      teamName:'',
      identity:'',
      sex:'',
    }

    const check_identity=ref('');

    const error_msg=ref('');

    const getIdentity=()=>{
      check_identity.value=useInfo.identity;
    }

    const register=()=>{
      error_msg.value='';

      $.ajax({
        url:baseUrl+'/api/register',
        type:"POST",
        data:useInfo,
        success(resp){
          if (resp.result=="success"){
            store.dispatch("login",{
              username:useInfo.username,
              password:useInfo.password,
              success(){
                router.push({name:'home'})
              },error(){
                error_msg.value='系统异常,请稍后重试';
              }
            })
          }else{
            error_msg.value=resp.result;
          }
        }
      })
    }

    return{
      useInfo,
      register,
      getIdentity,
      check_identity,
      error_msg
    }
  }
}
</script>


<style scoped>
button{
  width:100%;
}

.error-message{
  color:red;
}
</style>