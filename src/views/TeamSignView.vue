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
            <button type="submit" class="btn btn-primary" v-if="!team.flag && new Date(Date.parse(team.end) )>=new Date() && new Date(Date.parse(team.begin) )<=new Date()" @click="sign(team)">报名</button>
            <button type="submit" class="btn btn-primary" v-else-if="team.flag" disabled>已报名</button>
            <button type="submit" class="btn btn-primary" v-else-if="new Date(Date.parse(team.begin)) >new Date()&& !team.flag" disabled>未开始</button>
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


    const test=[
      {
        uid:1,
        teamName:'队伍1',
        context:'测试1',
        begin:'2022-07-20T10:26',
        end:'2022-07-30T10:26',
        flag:false,
        result:""
      },
      {
        uid:2,
        teamName:'队伍2',
        context:'测试2',
        begin:'2022-07-25T10:26',
        end:'2022-07-26T10:26',
        flag:false,
        result: ""
      }
    ];

    let teams=ref([]);
    teams.value=test

    const sign=team=>{
      let flag=window.confirm("是否报名");
      if (flag){
        team.flag=true;
        console.log(team);

        router.push({
          name:'teamResume',
          params:{
            teamName:team.teamName,
            teamId:team.uid
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