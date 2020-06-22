<template>
  <div class="about">
     <el-table :data="items">
        <el-table-column prop="_id" label="id" width="140">
        </el-table-column>
        <el-table-column prop="name" label="分类名称" width="120">
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      items:[]
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get('/categories')
      this.items = res.data
    }
  },
  created(){  //页面渲染完毕时候就会自动执行
     this.fetch();
  }

  
}
</script>