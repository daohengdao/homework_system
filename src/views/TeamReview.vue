<template>
<ContentBase>
  <table class="table">
    <thead class="table-light">
    <tr>
      <th>序号</th>
      <th>姓名</th>
      <th>用户名</th>
      <th>投递简历</th>
      <th>是否面试</th>
      <th>面试结果</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(user,index) in users" :key="index">
      <td>{{user.id}}</td>
      <td>{{user.name}}</td>
      <td>{{user.username}}</td>
      <td>{{user.context}}</td>
      <td>
        <select class="form-select" aria-label="是否面试" v-model="user.is_interview" :disabled="user.flag">
          <option value="是">是</option>
          <option value="否">否</option>
        </select>
      </td>
      <td>
        <select class="form-select"  v-model="user.result" aria-label="面试结果"  :disabled="user.flag">
          <option value="通过" selected>通过</option>
          <option value="未通过" >未通过</option>
        </select>
      </td>
      <td>
        <button type="submit" class="btn btn-primary" @click="confirm(user)" v-if="!user.flag">确认</button>
        <button type="submit" class="btn btn-primary"  v-else disabled>已审核</button>
      </td>
    </tr>
    </tbody>
  </table>
</ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";
import {ref} from "vue";
import router from "@/router";
import {useStore} from "vuex";
import $ from 'jquery'
import baseUrl from "@/util/config";

export default {
  name: "TeamReview",
  components: {
    ContentBase,
  },
  setup(){
    const store=useStore();
    let identity=store.state.user.identity;
    if (identity!="队长"){
      router.push({
        name:'404',
      });
    }

    let users=ref([]);

    $.ajax({
      url:baseUrl+'/api/team/sign',
      type:'GET',
      data:{
        teamId:store.state.user.teamId
      },
      success(resp){
        users.value=resp.userInfo;
      }
    })


    const confirm=(user)=>{
      if (user.is_interview=="否" && user.result=="通过"){
        alert("选项矛盾,请重新选择");
      }else if(user.is_interview =="" || user.result==""){
        alert('请选择下拉框')
      }else {

        let results={
          id:user.id,
          is_interview:user.is_interview,
          result:user.result,
          userId:store.state.user.userId
        }

        $.ajax({
          url:baseUrl+'/api/team/sign',
          type:'PUT',
          data:results,
          success(){
            user.flag=true;
          }
        })
      }
    }


    return{
      users,
      confirm,
    }
  }
}
</script>

<style scoped>

</style>