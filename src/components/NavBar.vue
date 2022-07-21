<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{name:'home',params:{}}">创新创业信息管理系统</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'home'}">首页</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'baseInfo',params:{}}" v-if="$store.state.user.is_login && $store.state.user.username!='admin'">个人信息</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'modifyPassword',params:{}}" v-if="$store.state.user.is_login">修改密码</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'coachTeam',params:{}}" v-if="$store.state.user.identity=='老师' && $store.state.user.is_login">指导团队</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'teamSign'}" v-if="$store.state.user.is_login && !$store.state.user.is_team && $store.state.user.identity!='队长' && $store.state.user.identity!='老师' && $store.state.user.username!='admin'">加入团队</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'compRegister'}" v-if="$store.state.user.is_login && $store.state.user.username!='admin' && $store.state.user.identity!='老师'">比赛报名</router-link>
          </li>


          <li class="nav-item dropdown" v-if="$store.state.user.is_login && $store.state.user.username!='admin' && $store.state.user.is_team && $store.state.user.identity!='老师'">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              我的团队
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link class="dropdown-item" :to="{name:'teamInfo'} " v-if="$store.state.user.identity!='老师'">团队成员</router-link></li>
              <li><router-link class="dropdown-item" :to="{name:'teamRecruit'}" v-if="$store.state.user.identity=='队长'">招新发布</router-link></li>
              <li><router-link class="dropdown-item" :to="{name:'teamReView'} " v-if="$store.state.user.identity=='队长'">团队审核</router-link></li>
            </ul>
          </li>



          <li class="nav-item dropdown" v-if="$store.state.user.is_login && $store.state.user.identity!='老师'">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              我的比赛
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link class="dropdown-item" :to="{name:'compRecruit'}" v-if="$store.state.user.username=='admin'">比赛发布</router-link></li>
              <li><router-link class="dropdown-item" :to="{name:'compReView'}" v-if="$store.state.user.username=='admin'">比赛审核</router-link></li>
              <li><router-link class="dropdown-item" :to="{name:'point'}" v-if="$store.state.user.username!='admin'">成绩查看</router-link></li>
            </ul>
          </li>
        </ul>


        <ul class="navbar-nav" v-if="!$store.state.user.is_login">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'login',params:{}}">登录</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'register',params:{}}">注册</router-link>
          </li>
        </ul>

        <ul class="navbar-nav" v-if="$store.state.user.is_login">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'baseInfo',params:{userId:$store.state.user.userId}}">{{$store.state.user.username}}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" style="cursor:pointer" :to="{name:'home'}" @click="logout">退出</router-link>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>

<script>
import {useStore} from "vuex";

export default {
  name: "NavBar",
  setup(){
    const store=new useStore();


    console.log(store.state.user.identity)
    console.log(store.state.user.identity!='老师')

    const logout=()=>{
      store.commit("logout");
    };
    return{
      logout,
    }
  }
}
</script>

<style scoped>

</style>