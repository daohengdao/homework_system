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
import $ from 'jquery'
import baseUrl from "@/util/config";

export default {
  name: "CompRegisterView",
  components:{
    ContentBase
  },
  setup(){
    const store=useStore();
    let competitions=ref([]);

    $.ajax({
      url:baseUrl+'/api/comp/info',
      type:'GET',
      success(resp){
        competitions.value=resp.compInfo;
      }
    })

    let teamId=store.state.user.teamId;

    const sign=(competition)=>{

      let flag=window.confirm("是否报名");
      if (flag){
          if (!competition.end_flag){

            const result={
              teamId,
              uid:competition.uid,
              comp_flag:true
            };

            $.ajax({
              url:baseUrl+'/api/comp/info',
              type:'PUT',
              data:result,
              success(resp){
                if (resp.status_code==200){
                  competition.comp_flag=true;
                  router.push({
                    name:'compGoing',
                    params:{
                      uid:competition.uid,
                      compName:competition.compName,
                    }
                  })
                }
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