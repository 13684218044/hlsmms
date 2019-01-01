import Vue from 'vue'
import App from './App.vue'
import router from './router'
// element的js和css
import './plugins/element.js'
// 引入公共样式
import './assets/styles/public.css'
//引入axios
import axios from 'axios'
//把axios挂载在vue原型上
Vue.prototype.axios=axios;
//引入qs处理axios的post参数
import qs from 'qs'
//把axios挂载在vue原型上
Vue.prototype.qs=qs;


// //构造全局守卫
router.beforeEach((to, from, next) => {
   
  // 让ajax携带cookie证书 
  axios.defaults.withCredentials=true;

  //发起ajax到后端路由获取cookie，cookie存在就放行，否则去登录页面
  axios.get("http://127.0.0.1:9090/users/getCookie").then(result=>{
    //console.log("验证的结果",result);
    //如果登录成或者是访问的页面时登录页面就放行
    if(result.data.isok || to.path=="/login"){
      next(); //录成功放行
    }
    //否则就跳转到登录页面
    else{
      //console.log("to",to);
      next("/login");
    }
  }).catch(err=>{
    console.error("错误了!"+err.message);
  });
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
