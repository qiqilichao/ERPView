<template>
    <div id="Reviewproductfileregistration">
      <h1>产品档案登记复核</h1>
      <el-table
        :data="dfiletable"
        style="width: 100%"
        height="400">
        <el-table-column prop="productId" label="产品编号" width="120"></el-table-column>
        <el-table-column prop="productName" label="产品名称" width="120"></el-table-column>
        <el-table-column prop="type" label="用途类型" width="120"></el-table-column>
        <el-table-column prop="firstKindName" label="一级分类" width="120"></el-table-column>
        <el-table-column prop="secondKindName" label="二级分类" width="120"></el-table-column>
        <el-table-column prop="thirdKindName" label="三级分类" width="120"></el-table-column>
        <el-table-column prop="responsiblePerson" label="产品经理" width="120"></el-table-column>
        <el-table-column
          fixed="right"
          label="审核"
          width="100">
          <template slot-scope="scope">
            <el-button type="warning" @click="review(scope.row.id)" size="small">等待审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageno"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <!--产品复核编辑-->
      <el-dialog title="产品复核" :visible="fuhe" id="fuhe">
          <el-form :inline="true" :model="fuhez" class="fuhezh">
              <el-row>
                <el-col>
                  <el-form-item label="产品名称">
                    <el-input clearable v-model="fuhez.productName"></el-input>
                  </el-form-item>
                  <el-form-item label="制造商">
                    <el-input clearable v-model="fuhez.productName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="I级分类">
                    <el-select v-model="fuhez.firstKindName">
                    </el-select>
                  </el-form-item>
                  <el-form-item label="II级分类">
                    <el-select v-model="fuhez.secondKindName">
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="III级分类">
                    <el-select v-model="fuhez.thirdKindName">
                    </el-select>
                  </el-form-item>
                  <el-form-item label="用途类型">
                    <el-select v-model="fuhez.type">
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="档次级别">
                    <el-select v-model="fuhez.productClass">
                    </el-select>
                  </el-form-item>
                  <el-form-item label="计量单位">
                    <el-select v-model="fuhez.personalUnit">
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="保修期">
                    <el-input clearable v-model="fuhez.warranty"></el-input>
                  </el-form-item>
                  <el-form-item label="市场单价">
                    <el-input clearable v-model="fuhez.listPrice"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="产品经理">
                    <el-input clearable v-model="fuhez.responsiblePerson"></el-input>
                  </el-form-item>
                  <el-form-item label="计划成本单价">
                    <el-input clearable v-model="fuhez.costPrice"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item>
                    <el-button @click="through(fuhez.id)">审核通过</el-button>
                    <el-button @click="notthrough(fuhez.id)">审核不通过</el-button>
                  </el-form-item>
                </el-col>
                </el-row>
          </el-form>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Reviewproductfileregistration",
        data(){
        return{
            dfiletable:[],
              pageno: 1,
              pagesize: 5,
              total: 0,
              fuhe:false,
              fuhez:{}
          }
    },
      methods:{
        getdfiledata() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);

          this.$axios.post("dfile/fileShenhe.action", params).then((response) => {
            _this.dfiletable = response.data.records;
            _this.total = response.data.total;
          }).catch();
        },
        handleSizeChange(val) {  //页size变更
          this.pagesize = val;
          this.pageno = 1;
          this.getdfiledata();
        },
        handleCurrentChange(val) {  //页码变更
          this.pageno = val;
          this.getdfiledata();
        },
        review(id){
          this.fuhe=true;
          //根据id查询数据，显示在编辑页面
          var _this = this;
          var params = new URLSearchParams();
          params.append("id", id);
          this.$axios.post("dfile/shejiselectbyid.action",params).then(function (response) {
            _this.fuhez=response.data;
          }).catch()
        },
        //审核通过
        through(id){
          var _this = this;
          var params = new URLSearchParams();
          params.append("id", id);
          this.$axios.post("dfile/through.action",params).then(function (response) {
            // _this.fuhez=response.data;
            _this.fuhe=false;
            _this.getdfiledata();
          }).catch()
        },
        //审核不通过
        notthrough(id){
          var _this = this;
          var params = new URLSearchParams();
          params.append("id", id);
          this.$axios.post("dfile/notthrough.action",params).then(function (response) {
            _this.fuhe=false;
            _this.getdfiledata();
          }).catch()
        }
      },
      created(){
        this.getdfiledata();

      }

    }
</script>

<style scoped>

</style>
