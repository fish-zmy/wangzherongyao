<template>
  <div class="about">
    <el-table :data="items">
      <el-table-column prop="_id" label="id" width="300"></el-table-column>
      <el-table-column prop="icon" label="装备图片" width="220">
       <template slot-scope="scope">
       <img :src="scope.row.icon" style="height:3rem"/>
       </template>
      </el-table-column>
      <el-table-column prop="name" label="装备名称" width="220"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template v-slot="scope">
          <el-button type="text" size="small" 
          @click="$router.push(`/items/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" 
          @click="remove(scope.row)">删除</el-button>
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
      const res = await this.$http.get("/rest/items");
      this.items = res.data;
    },
    async remove(row){//删除操作，弹出选框
      this.$confirm(`是否要删除分类"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then( async() => {
          const res = await this.$http.delete(`/rest/items/${row._id}`);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch();
        })
    }
  },
  created() {
    //页面渲染完毕时候就会自动执行
    this.fetch();
  }
};
</script>