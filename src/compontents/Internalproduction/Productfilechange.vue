<template>
    <div id="Productfilechange">
      <h1>产品档案变更</h1>
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
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="warning" @click="review(scope.row.id)" size="small">编辑</el-button>
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
      <el-dialog title="产品复核" :visible="editwinshow">

        <el-form label-width="100px" :modal="editform">
          <el-row>
            <el-col>
              <el-form-item label="id" >
                <el-input clearable v-model="editform.id"  disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="产品名称">
                <el-input clearable v-model="editform.productName"></el-input>
              </el-form-item>
              <el-form-item label="制造商">
                <el-input clearable v-model="editform.factoryName"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="I级分类">
                <el-select v-model="editform.firstKindName">
                </el-select>
              </el-form-item>
              <el-form-item label="II级分类">
                <el-select v-model="editform.secondKindName">
                </el-select>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="III级分类">
                <el-select v-model="editform.thirdKindName">
                </el-select>
              </el-form-item>
              <el-form-item label="用途类型">
                <el-select v-model="editform.type">
                </el-select>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="档次级别">
                <el-select v-model="editform.productClass">
                </el-select>
              </el-form-item>
              <el-form-item label="计量单位">
                <el-select v-model="editform.personalUnit">
                </el-select>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="保修期">
                <el-input clearable v-model="editform.warranty"></el-input>
              </el-form-item>
              <el-form-item label="市场单价">
                <el-input clearable v-model="editform.listPrice"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="产品经理">
                <el-input clearable v-model="editform.responsiblePerson"></el-input>
              </el-form-item>
              <el-form-item label="计划成本单价">
                <el-input clearable v-model="editform.costPrice"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item>
                  <el-button @click="editwinshow = false">取 消</el-button>
                  <el-button type="primary" @click="btnsave">确 定</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Productfilechange",
      data(){
        return{
          dfiletable:[],
          pageno: 1,
          pagesize: 5,
          total: 0,
          editwinshow:false,
          editform:{}
        }
      },
      methods:{
        getdfiledata() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);

          this.$axios.post("dfile/approved.action", params).then((response) => {
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
          this.editwinshow=true;
          //根据id查询数据，显示在编辑页面
          var _this = this;
          var params = new URLSearchParams();
          params.append("id", id);
          this.$axios.post("dfile/shejiselectbyid.action",params).then(function (response) {
            _this.editform=response.data;
          }).catch()
        },
        btnsave(){   //编辑模态框  保存按钮按下
          this.editwinshow = false;
          var _this =this;
          //将数据保存到db
          //this.editform
          var params = new URLSearchParams();
          Object.keys(this.editform).forEach(function (item) {
            if(_this.editform[item]!=null){
              params.append(item,_this.editform[item]);
            }

          })

          this.$axios.post("dfile/modifythe.action",params).then(function (response) {
            if (response.data == true) {
              _this.$notify({
                title: '成功',
                message: '编辑成功',
                type: 'success'
              });
            } else {
              _this.$notify({
                title: '失败',
                message: '编辑失败',
                type: 'danger'
              });
            }
            _this.pageno = 1;
            //刷新表格数据
            _this.getdfiledata();
          }).catch();
        }
      },
      created(){
        this.getdfiledata();
      }
    }
</script>

<style scoped>

</style>
