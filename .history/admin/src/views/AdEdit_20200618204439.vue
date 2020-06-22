<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}广告</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button @click = "model.items.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type = "flex" style = "flex-wrap:wrap"> 
           <el-col :md="12" v-for = "(item,i) in model.items" :key = "i">
           <el-form-item label = "跳转连接（url)">
              <el-input v-model = "item.url"></el-input>
           </el-form-item>
           <el-form-item label = "图标">
              <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="res => $set(item,'image',res.url)"
            >
            <!--显示赋值，用$set，因为直接给item.icon可能会赋值不成功-->
              <!--如果上传成功就显示图片，没有就显示原来的上传的样式-->
              <img v-if="item.image" :src="item.image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
           </el-form-item>
           <el-form-item>
            <el-button size="small" style="margin-top:1rem" type="danger" @click="model.items.splice(i,1)">删除</el-button>
          </el-form-item>
           </el-col>
          </el-row>
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
      model:{
        items:[]
      },
      
    };
  },
  methods: {
    //保存
    async save() {
      let res;
      //判断id是否存在，使用不同的接口
      if (this.id) {
        //请求后台的接口
        res = await this.$http.put(`/rest/ads/${this.id}`, this.model);
      } else {
        //请求后台的接口
        res = await this.$http.post("/rest/ads", this.model);
      }
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    //点击编辑分类，获取到name
    async fetch() {
      const res = await this.$http.get(`/rest/ads/${this.id}`);
      this.model =Object.assign({}, this.model, res.data);
    }
  },
  created() {
   
    //如果id存在才执行
    this.id && this.fetch();
  }
};
</script>