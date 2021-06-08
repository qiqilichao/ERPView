<template>
    <div id="Storagescheduling">
      <span>当前等待做调度的入库单总数：{{total}}列</span>
      <el-table :data="storagetable"  border style="width: 100%">
        <el-table-column
          prop="id"
          label="入库单编号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="入库理由"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="入库详情理由"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="登记时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="总件数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="总金额（元）"
          width="175">
        </el-table-column>
        <el-table-column label="入库调度">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.row.id)">入库调度</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button @click="handleEdit(1)">
        aaa
      </el-button>

      <el-dialog
        title="入库调度单"
        :visible.sync="upddialog"
        width="80%"
        :before-close="handleClose">
        <span>入库单编号：</span>&nbsp;&nbsp;&nbsp;&nbsp;{{te1}}<br>
        <span>入库理由：</span>&nbsp;&nbsp;&nbsp;&nbsp;{{}}
        <span style="padding-left: 400px">入库详情理由：</span>&nbsp;&nbsp;&nbsp;&nbsp;{{}}

        <el-table :data="updstorage"  border style="width: 100%">
          <el-table-column
            prop="id"
            label="入库单编号"
            width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            label="入库理由"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="入库详情理由"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="登记时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="总件数"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="总金额（元）"
            width="175">
          </el-table-column>
          <el-table-column label="入库调度">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="handleEdit(scope.row.id)">入库调度</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--      <el-form :inline="true" :model="updstorage" class="demo-form-inline" style="text-align: center">-->
        <!--        <el-form-item label="编号">-->
        <!--          <el-input v-model="updstorage.id" disabled></el-input>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="姓名">-->
        <!--          <el-input v-model="updstorage.name" placeholder="请输入姓名"></el-input>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="性别">-->
        <!--          <el-input v-model="updstorage.age" placeholder="请输入年龄"></el-input>-->
        <!--        </el-form-item>-->
        <!--      </el-form>-->
        <span slot="footer" class="dialog-footer">
        <el-button @click="a">取 消</el-button>
        <el-button type="primary" @click="b">确 定</el-button>
     </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Storagescheduling",
      data(){
          return {
            tatol:0,
            storagetable:[],
            updstorage:[],
            upddialog:false,
            te1:2312323
          }
      },
      methods:{
        handleEdit(ids){
          this.upddialog = true;

          var params = new URLSearchParams();
          params.append("id",ids);

          this.$axios.post("gather/Storagesboundscheduling",params).then(response => {
            this.updstorage = response.data.records;
            this.tatol =  response.data.total;
          }).catch()
        },
        //  关闭模态框
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
      }
    }
</script>

<style scoped>

</style>
