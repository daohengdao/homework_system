<template>
<ContentBase>
  <div class="card edit-field">
    <div class="card-body">
      <table class="table">
        <thead class="table-light">
        <tr>
          <th>序号</th>
          <th>团队名称</th>
          <th>团队简介</th>
          <th>开始时间</th>
          <th>结束时间</th>
          <th></th>
          <th>审核结果</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(team,index) in teams" :key="index">
          <td>{{index+1}}</td>
          <td>{{team.teamName}}</td>
          <td>{{team.context}}</td>
          <td>{{team.begin}}</td>
          <td>{{team.end}}</td>
          <td>
            <button type="submit" class="btn btn-primary" v-if="!team.flag && new Date(new Date(Date.parse(team.end)).getTime() - 8 * 60 * 60 * 1000)>=new Date() && new Date(new Date(Date.parse(team.begin)).getTime() - 8 * 60 * 60 * 1000)<=new Date()" @click="sign(team)">报名</button>
            <button type="submit" class="btn btn-primary" v-else-if="team.flag" disabled>已报名</button>
            <button type="submit" class="btn btn-primary" v-else-if="new Date(new Date(Date.parse(team.begin)).getTime() - 8 * 60 * 60 * 1000) >new Date()&& !team.flag" disabled>未开始</button>
            <button type="submit" class="btn btn-primary" v-else disabled>已截止</button>
          </td>
          <td>{{team.result}}</td>
        </tr>
        </tbody>
      </table>

    </div>
  </div>



</ContentBase>
</template>

<script>
import ContentBase from "../components/ContentBase";
import {ref} from "vue";
import router from "@/router";
import {useStore} from "vuex";
import $ from 'jquery';
import baseUrl from "@/util/config";

export default {
  name: "TeamSign",
  components:{
    ContentBase
  },
  setup(){
    const store=useStore();
    let identity=store.state.user.identity;



    if (identity !='队员' || store.state.user.is_team){
      router.push({
        name:'404'
      })
    }

    let teams=ref([]);
    $.ajax({
      url:baseUrl+'/api/team/signs/',
      type:'GET',
      data:{
        userId:store.state.user.userId,
      },success(resp){
        teams.value=resp.teams;
      }
    })

    const sign=team=>{
      let flag=window.confirm("是否报名");
      if (flag){
        router.push({
          name:'teamResume',
          params:{
            teamName:team.teamName,
            teamId:team.teamId,
            uid:team.uid,
          }
        });
      }
    }

    return{
      sign,
      teams
    }
  }
}

</script>

<style scoped>
button{
  width: 100%;
}
</style>