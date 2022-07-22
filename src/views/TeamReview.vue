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

    const test=[
      {
        id:"1",
        name:"张三",
        username:"test",
        context:"特长1........",
        flag:false,
        is_interview:'',
        result:''
      },
      {
        id:"2",
        name:"李四",
        username:"test1",
        context:"特长2........",
        flag: false,
        is_interview: '',
        result: ''
      }
    ];

    let users=ref([]);
    users.value=test;


    const confirm=(user)=>{
      if (user.is_interview=="否" && user.result=="通过"){
        alert("选项矛盾,请重新选择");
      }else if(user.is_interview =="" || user.result==""){
        alert('请选择下拉框')
      }else {
        user.flag=true;
        let results={
          id:user.id,
          is_interview:user.is_interview,
          result:user.result
        }
        console.log(results);
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