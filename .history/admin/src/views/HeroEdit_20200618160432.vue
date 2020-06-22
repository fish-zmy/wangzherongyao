<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value = "skill" type = "border-card">
        <el-tab-pane label = "基础信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <!--如果上传成功就显示图片，没有就显示原来的上传的样式-->
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!--返回一个可多选的英雄类型-->
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="items of categories"
                :key="items._id"
                :label="items.name"
                :value="items._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate :max="9" show-score v-model="model.scores.difficult" style="margin-top:0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate :max="9" show-score v-model="model.scores.skills" style="margin-top:0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate :max="9" show-score v-model="model.scores.attack" style="margin-top:0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate :max="9" show-score v-model="model.scores.survive" style="margin-top:0.6rem"></el-rate>
          </el-form-item>
          <!--返回一个可多选的装备类型-->
          <el-form-item label="顺风出装推荐">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装推荐">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>

          <el-form-item label="团队技巧">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
         <el-tab-pane name = "skill" label = "技能">
         <el-button @click = "model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type = "flex" style = "flex-wrap:wrap"> 
           <el-col :md="12" v-for = "(item,i) in model.skills" :key = "i">
           <el-form-item label = "技能名">
              <el-input v-model = "item.name"></el-input>
           </el-form-item>
           <el-form-item label = "图标">
              <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="res => $set(item,icon ,res.url)"
            >
            <!--显示赋值，用$set，因为直接给item.icon可能会赋值不成功-->
              <!--如果上传成功就显示图片，没有就显示原来的上传的样式-->
              <img v-if="item.icon" :src="item.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
           </el-form-item>
           <el-form-item label = "描述">
              <el-input v-model = "item.description"></el-input>
           </el-form-item>
           <el-form-item label = "小提示">
              <el-input v-model="item.tips"></el-input>
           </el-form-item>
           </el-col>
          </el-row>
         </el-tab-pane>
      </el-tabs>
      <el-form-item>
            <el-button style = "margin-top:1rem" type="primary" native-type="submit">保存</el-button>
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
      categories: [],
      items: [],
      model: {
        scores: {
          difficult: 0
        },
        skills:[]
      }
    };
  },
  methods: {
    //上传
    afterUpload(res) {
      //一样的效果
      this.$set(this.model, "avatar", res.url);
      //  this.model.icon = res.url
    },
    //保存
    async save() {
      let res;
      //判断id是否存在，使用不同的接口
      if (this.id) {
        //请求后台的接口
        res = await this.$http.put(`/rest/heroes/${this.id}`, this.model);
      } else {
        //请求后台的接口
        res = await this.$http.post("/rest/heroes", this.model);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    //点击编辑时候，获取所有数据展示
    async fetch() {
      const res = await this.$http.get(`/rest/heroes/${this.id}`);
      //这里赋值的方式不使用原来的
      //this.model = res.data
      //使用下面这种，可以使得返回的属性是model+res.data里的，而不会让res.data去覆盖掉了原来的model
      this.model = Object.assign({}, this.model, res.data);
    },
    //获取到categories
    async fetchCategories() {
      const res = await this.$http.get(`/rest/categories`);
      this.categories = res.data;
    },
    //获取到categories
    async fetchItems() {
      const res = await this.$http.get(`/rest/items`);
      this.items = res.data;
    }
  },
  created() {
    this.fetchItems();
    this.fetchCategories();
    //如果id存在才执行
    this.id && this.fetch();
  }
};
</script>


<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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

