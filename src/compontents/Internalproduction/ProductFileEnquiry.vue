<template>
    <div id="ProductFileEnquiry">
      <h1>产品档案查询</h1>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="产品名称">
          <el-input v-model="formInline.productName" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="productId"
          label="产品编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="产品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="用途类型">
        </el-table-column>
        <el-table-column
          prop="firstKindName"
          label="I级分类">
        </el-table-column>
        <el-table-column
          prop="secondKindName"
          label="II级分类">
        </el-table-column>
        <el-table-column
          prop="thirdKindName"
          label="III级分类">
        </el-table-column>
        <el-table-column
          prop="responsiblePerson"
          label="产品经理">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name: "ProductFileEnquiry",
      data(){
          return{
            formInline:{
              productName:''
            },
            tableData:[]
          }
      },
      methods:{
        onSubmit(){

        },
        getdfiledata() {
          var _this = this;
          var params = new URLSearchParams();

          this.$axios.get("dfile/fileShenhe.action", params).then((response) => {
            _this.tableData = response.data.records;
            //_this.total = response.data.total;
          }).catch();
        },
      },
      created(){
        this.getdfiledata();
      }
    }
</script>

<style scoped>

</style>
