<template>
  <div class="about">
    <el-table :data="items">
      <el-table-column prop="_id" label="id" width="300"></el-table-column>
      <el-table-column prop="name" label="分类名称" width="220"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template v-slot="scope">
          <el-button type="text" size="small" 
          @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" 
          @click="remove()">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
 
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/categories");
      this.items = res.data;
    },
    async remove(){
      console.log()
    }
  },
  created() {
    //页面渲染完毕时候就会自动执行
    this.fetch();
  }
};
</script>