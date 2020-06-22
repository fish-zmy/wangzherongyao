<template>
  <div class="about">
     <el-table :data="items">
        <el-table-column prop="_id" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="分类名称" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
  </div>
</template>
