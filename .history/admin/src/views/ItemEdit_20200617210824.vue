<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}装备</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success = "uploaded"
        >
        <!--如果上传成功就显示图片，没有就显示原来的上传的样式-->
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    //上传
    uploaded(){
      
    },
    //保存
    async save() {
      let res;
      //判断id是否存在，使用不同的接口
      if (this.id) {
        //请求后台的接口
        res = await this.$http.put(`/rest/items/${this.id}`, this.model);
      } else {
        //请求后台的接口
        res = await this.$http.post("/rest/items", this.model);
      }
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    //点击编辑分类，获取到name
    async fetch() {
      const res = await this.$http.get(`/rest/items/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    //如果id存在才执行
    this.id && this.fetch();
  }
};
</script>

<style scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>