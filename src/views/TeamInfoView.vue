<template>
<ContentBase>
  <table class="table">
    <thead class="table-light">
    <tr>
      <th></th>
      <th>用户名</th>
      <th>姓名</th>
      <th>性别</th>
      <th>身份</th>
      <th>学号</th>
      <th>联系方式</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(team,index) in teams" :key="index">
      <td>{{index+1}}</td>
      <td>{{team.username}}</td>
      <td>{{team.name}}</td>
      <td>{{team.sex}}</td>
      <td>{{team.identity}}</td>
      <td>{{team.stuNum}}</td>
      <td>{{ team.phone }}</td>
    </tr>
    </tbody>
  </table>
</ContentBase>
</template>


<script>
import ContentBase from "../components/ContentBase";
import {ref} from "vue";
import {useStore} from "vuex";
import router from "@/router";
import $ from 'jquery'
import baseUrl from "@/util/config";

export default {
  name: "TeamInfo",
  components: {
    ContentBase,
  },

  setup(){

    const store=useStore();

    if (!store.state.user.is_team || store.state.user.identity=='老师'){
      router.push({
        name:'404'
      })
    }

    let teams=ref([]);
    $.ajax({
      url:baseUrl+'/api/team/member/',
      type:'GET',
      data:{
        teamId:store.state.user.teamId,
      },success(resp){
        teams.value=resp.member;
      }
    })

    return{
      teams
    }
  }
}
</script>



<style scoped>

</style>