<template>
<ContentBase>
  <table class="table">
    <thead class="table-light">
    <tr>
      <th>序号</th>
      <th>比赛名称</th>
      <th>团队名称</th>
      <th>项目地址</th>
      <th>获得奖项</th>
      <th>队员评判</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(comp,index) in comps" :key="index">
      <td>{{index+1}}</td>
      <td>{{comp.compName}}</td>
      <td>{{comp.teamName}}</td>
      <td><a :href="comp.github" target="_blank">{{comp.teamName}}的项目</a></td>
      <td><select class="form-select" aria-label="奖项" v-model="reward">
        <option value="特等奖">特等奖</option>
        <option value="一等奖">一等奖</option>
        <option value="二等奖">二等奖</option>
        <option value="三等奖">三等奖</option>
        <option value="无奖项">无奖项</option>
      </select></td>
      <td>
        <router-link class="nav-link" style="cursor:pointer" v-if="!comp.is_person" :to="{name:'compPerson',params:{compId:comp.compId,teamId:comp.teamId,uid:comp.uid} }">评判地址</router-link>
        <div v-else>已评审</div>
      </td>

      <td>
        <button type="submit" class="btn btn-primary" v-if="!comp.is_review" @click="review(reward,comp)">确认</button>
        <button type="submit" class="btn btn-primary" v-else disabled>已评审</button>
      </td>
    </tr>
    </tbody>
  </table>
</ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";
import router from "@/router";
import {ref} from "vue";
import {useStore} from "vuex";
import $ from 'jquery'
import baseUrl from "@/util/config";

export default {
  name: "CompReView",
  components:{
    ContentBase
  },
  setup(){
    const store=useStore();

    let comps=ref([]);


    $.ajax({
      url:baseUrl+'/api/comp/context',
      type:'GET',
      success(resp){
        comps.value=resp.context;
      }
    })


    let username=store.state.user.username;

    if (username!="admin"){
      router.push({
        name:'404',
      });
    }

    const review=(reward,comp)=>{
      if (!comp.is_person){
        alert("请对队伍成员进行评分")
      }else if( typeof(reward)=='undefined'){
        alert('请选择奖项')
      }else {
        let flag=window.confirm("是否提交");
        if (flag){
          let result={
            uid:comp.uid,
            is_review:true,
            reward:reward
          }
          $.ajax({
            url:baseUrl+'/api/comp/context',
            type:'PUT',
            data:result,
            success(resp){
              if (resp.status.code==200){
                comp.is_review=true;
              }
            }
          })

        }
      }
    }

    return{
      comps,
      review
    }
  }
}
</script>

<style scoped>

</style>