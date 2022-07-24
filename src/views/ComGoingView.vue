<template>
<ContentBase>
  <form @submit.prevent="getGithub">
    <div>比赛名称：{{compName}}</div>
    <div class="mb-3">
      <label for="username" class="form-label" >github项目地址</label>
      <input  type="text" class="form-control" id="github" v-model="github">
    </div>
    <div class="error_msg">{{error_msg}}</div>
    <button type="submit" class="btn btn-primary">提交</button>
  </form>
</ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";
import {useRoute} from 'vue-router'
import router from "@/router";
import {ref} from "vue";
import {useStore} from "vuex";
import $ from 'jquery'
import baseUrl from "@/util/config";



export default {
  name: "ComGoing",
  components:{
    ContentBase
  },



  setup(){
    const store=useStore();
    const route=useRoute();

    const teamId=store.state.user.teamId;
    const compName=route.params.compName;
    const compId=route.params.uid;

    const github=ref('');
    const error_msg=ref('');

    if (typeof(compName)=='undefined' ){
      router.push({
        name:'404'
      });
    }



    const getGithub=()=>{
      let match=github.value.match(/(https:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/?/);
      console.log(match);
      if (match==null){
        error_msg.value='请输入正确的github地址';
      }else{
        const result={
          teamId,
          compId,
          end_flag:true,
          github:github.value
        }

        $.ajax({
          url:baseUrl+'/api/comp',
          type:"POST",
          data:result,
          success(resp){
            if (resp.result=="success"){
              router.push({
                name:'success',
                params:{
                  flag:"true"
                }
              });
            }else{
              error_msg.value=resp.result;
            }
          }
        })

      }

    }

    return{
      compName,
      error_msg,
      github,
      getGithub,
    }

  }
}
</script>

<style scoped>
.error_msg{
  color: red;
}
</style>