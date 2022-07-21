<template>
<ContentBase>
  <div class="card edit-field">
    <div class="card-body">
      <table class="table">
        <thead class="table-light">
        <tr>
          <th>序号</th>
          <th>比赛名称</th>
          <th>比赛内容</th>
          <th>开始时间</th>
          <th>结束时间</th>
          <th></th>
          <th>提交状态</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(competition,index) in competitions" :key="index">
          <td>{{ index +1}}</td>
          <td>{{competition.compName}}</td>
          <td>{{competition.context}}</td>
          <td>{{competition.begin}}</td>
          <td>{{competition.end}}</td>
          <td>
            <button type="submit" class="btn btn-primary" v-if="!competition.comp_flag
            && new Date(Date.parse(competition.end) )>=new Date()
            && new Date(Date.parse(competition.begin) )<=new Date()" @click="sign(competition)">报名</button>
            <button type="submit" class="btn btn-primary" v-else-if="competition.comp_flag" disabled>已报名</button>
            <button type="submit" class="btn btn-primary" v-else-if="new Date(Date.parse(competition.begin)) >new Date()&& !competition.comp_flag" disabled>未开始</button>
            <button type="submit" class="btn btn-primary" v-else disabled>已截止</button>
          </td>

          <td v-if="competition.comp_flag">
            <router-link class="nav-link" style="cursor:pointer" :to="{name:'compGoing',params:{uid:competition.uid,
                compName:competition.compName}}" v-if="!competition.end_flag">提交项目</router-link>
            <div v-if="competition.end_flag">
              已提交
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";
import {ref} from "vue";
import router from "@/router";
import {useStore} from "vuex";

export default {
  name: "CompRegisterView",
  components:{
    ContentBase
  },
  setup(){
    const test=[
      {
        uid:1,
        compName:'开发大赛1',
        context:'开发的比赛',
        begin:'2022-07-20T10:26',
        end:'2022-07-30T10:26',
        comp_flag:true,
        end_flag:false,
      },
      {
        uid:2,
        compName:'开发大赛2',
        context:'开发的比赛',
        begin:'2022-07-05T10:26',
        end:'2022-07-06T10:26',
        comp_flag: false,
        end_flag: false
      },
      {
        uid:3,
        compName:'开发大赛3',
        context:'开发的比赛',
        begin:'2022-07-25T10:26',
        end:'2022-07-27T10:26',
        comp_flag: false,
        end_flag: false
      },
      {
        uid:4,
        compName:'开发大赛4',
        context:'开发的比赛',
        begin:'2022-07-05T10:26',
        end:'2022-07-06T10:26',
        comp_flag: true,
        end_flag: true
      }
    ];

    const store=useStore();
    let competitions=ref([]);
    competitions.value=test;
    let teamId=store.state.user.teamId;

    const sign=(competition)=>{

      let flag=window.confirm("是否报名");
      if (flag){
          if (!competition.end_flag){
            competition.comp_flag=true;
            const result={
              teamId,
              uid:competition.uid,
              comp_flag:true
            };
            console.log(result);
            router.push({
              name:'compGoing',
              params:{
                uid:competition.uid,
                compName:competition.compName,
              }
            })
          }


      }
    }

    return{
      competitions,
      sign,
    }
  }
}
</script>

<style scoped>
button{
  width: 100%;
}
</style>