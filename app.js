window.addEventListener("load", function() {
  // 根组件
  const App = {
    template: `
    <div class="container">
      <header>后台管理系统</header>
      <section>
        <aside>
          <ul>
            <li><router-link to="/users">用户管理</router-link></li>
            <li><router-link to="/authorization">权限管理</router-link></li>
            <li><router-link to="/goods">商品管理</router-link></li>
            <li><router-link to="/orders">订单管理</router-link></li>
            <li><router-link to="/settings">系统设置</router-link></li>
          </ul>
        </aside>
        <article class="main">
          <router-view />
        </article>
      </section>
      <footer>
        版权信息
      </footer>
    </div>
  `
  };

  // 用户管理组件
  const Users = {
    data: function() {
      return {
        userList: [
          {
            id: 1,
            name: "Tom",
            age: 22
          },
          {
            id: 2,
            name: "Jerry",
            age: 20
          },
          {
            id: 3,
            name: "Jack",
            age: 21
          }
        ]
      };
    },
    template: `
    <div class="component-item">
    <p>用户管理区域</p>
    <table>
      <thead>
        <th>编号</th>
        <th>姓名</th>
        <th>年龄</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="user in userList" :key="user.id">
          <td>{{user.id}}</td>
          <td>{{user.name}}</td>
          <td>{{user.age}}</td>
          <td><a href="javascript:;" @click="goUserInfo(user.id)">详情</a></td>
        </tr>
      </tbody>
    </table>
    </div>
    `,
    methods: {
      goUserInfo: function(id) {
        // 编程式导航
        console.log(id);
        this.$router.push({
          path: "/userinfo/" + id
        });
      }
    }
  };

  // 用户详情页
  const UserInfo = {
    props: ["id"],
    template: `
      <div class="component-item">
        <p>用户详情页 id:{{id}}</p>
        <button @click="goBack">后退</button>
      </div>
    `,
    methods: {
      goBack: function() {
        this.$router.go(-1);
      }
    }
  };
  const Authorization = {
    template: `<div class="component-item"><p>权限管理组件</p></div>`
  };
  const Goods = {
    template: `<div class="component-item"><p>商品管理组件</p></div>`
  };
  const Orders = {
    template: `<div class="component-item"><p>用户管理组件</p></div>`
  };
  const Settings = {
    template: `<div class="component-item"><p>系统设置组件</p></div>`
  };
  // 创建路由对象
  const router = new VueRouter({
    routes: [
      {
        path: "/",
        component: App,
        // 重定向到用户组件
        redirect: "/users",
        // 为子组件添加路由
        children: [
          { path: "/users", component: Users },
          { path: "/userinfo/:id", component: UserInfo, props: true },
          { path: "/authorization", component: Authorization },
          { path: "/goods", component: Goods },
          { path: "/orders", component: Orders },
          { path: "/settings", component: Settings }
        ]
      }
    ]
  });
  const vm = new Vue({
    el: "#app",
    data: {},
    // 挂载路由对象
    router
  });
});
