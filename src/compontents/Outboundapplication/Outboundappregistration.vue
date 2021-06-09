<template>
<!--  出库申请登记-->
    <div id="Outboundappregistration">
      <div >
        <el-button type="success" @click="inspro">添加产品</el-button>
        <el-button type="danger">删除产品</el-button>
        <el-button type="primary" >提交</el-button>
      </div>
      <div>
        <h1>出库申请单</h1>
        <el-form :inline="true" :model="updstu" class="demo-form-inline" >
          <el-form-item label="出库人：">
            <el-input v-model="updstu.id" style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item style="padding-left: 150px" label="出库理由：">
            <el-select v-model="updstu.aa" clearable style="width: 400px" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item><br>
          <el-form-item label="是否归还：">
            <!--          <el-input v-model="updstu.age" style="width: 386px" placeholder="请输入年龄"></el-input>-->
            <el-select v-model="updstu.value" clearable style="width: 386px" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="padding-left: 150px" label="归还时间：">
            <!--          <el-input v-model="updstu.age" style="width: 400px" placeholder="请输入年龄"></el-input>-->
            <div class="block" >
              <!--            <span class="demonstration">设置默认时间</span>-->
              <el-date-picker style="width: 400px"
                              v-model="updstu.age"
                              type="datetime"
                              placeholder="选择日期时间"
                              default-time="12:00:00"
                              :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-form>
        <el-table :data="outapp"  border style="width: 100%">
          <el-table-column
          prop="id"
          label="点选"
          width="70px">
            <el-checkbox v-model="checked">
            </el-checkbox>
          </el-table-column>
          <el-table-column
            prop="id"
            label="产品名称"
            width="185">
          </el-table-column>
          <el-table-column
            prop="name"
            label="产品编号"
            width="185">
          </el-table-column>
          <el-table-column
            prop="name"
            label="描述"
            width="185">
          </el-table-column>
          <el-table-column
            prop="name"
            label="数量"
            width="185">
          </el-table-column>
          <el-table-column
            prop="name"
            label="单位"
            width="185">
          </el-table-column>
          <el-table-column
            prop="name"
            label="成本单价（元）"
            width="185">
          </el-table-column>
          <el-table-column
            prop="name"
            label="小计（元）"
            width="185">
          </el-table-column>
        </el-table>
        <br>
        <el-form :inline="true" :model="updstu" class="demo-form-inline" >
          <el-form-item label="总件数：">
            <el-input v-model="updstu.id" style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item style="padding-left: 150px" label="总金额：">
            <el-input v-model="updstu.id" style="width: 400px"></el-input>
          </el-form-item><br>
          <el-form-item label="登记人：">
            <el-input v-model="updstu.age" style="width: 400px" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item style="padding-left: 150px" label="登记时间：">
            <div class="block" >
              <!--            <span class="demonstration">设置默认时间</span>-->
              <el-date-picker style="width: 400px"
                              v-model="updstu.age"
                              type="datetime"
                              placeholder="选择日期时间"
                              default-time="12:00:00"
                              :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
          </el-form-item>
          <br>
          <el-form-item label="备注:" style="padding-left: 100px">
            <el-input   v-model="updstu.ms" style="width: 800px" type="textarea"></el-input>
<!--        resize="none"    -->
          </el-form-item>
        </el-form>

        <el-dialog title="修改"
                   :visible.sync="upddialog"
                   width="70%"
                   :before-close="handleClose">
          <span>符合条件的产品档案总数：{{}}列</span>
          <el-table :data="outproapp"  border style="width: 100%">
            <el-table-column
              prop="id"
              label="产品编号"
              width="300px">
            </el-table-column>
            <el-table-column
              prop="id"
              label="产品名称"
              width="165">
            </el-table-column>
            <el-table-column
              prop="name"
              label="用途类型"
              width="165">
            </el-table-column>
            <el-table-column
              prop="name"
              label="单位"
              width="165">
            </el-table-column>
            <el-table-column
              prop="name"
              label="成本单价"
              width="165">
            </el-table-column>
            <el-table-column label="出库">
              <template slot-scope="scope">
                <el-button size="mini"
                           @click="handleEdit(scope.row.id)">出库</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Outboundappregistration",
      data(){
          return {
            updstu:[],
            options1: [{
              value: 'C002-1',
              label: '生产领料'
            }, {
              value: 'C002-2',
              label: '赠送'
            }, {
              value: 'C002-3',
              label: '内部借领  '
            }, {
              value: 'C002-4',
              label: '其他借领'
            }],
            options2:[{value:"1",label:"是"}],
            value:'',
            pickerOptions1: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              },
            },
            outapp:[],
            checked:false,
            upddialog:false,
            outproapp:[]
          }
      },
      methods:{
        //  关闭模态框
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        handleEdit(ids){

        },
        inspro(){
          this.upddialog=true;
          // this.$axios.post().then(response =>{
          //
          // }).catch()
        }
      }
    }
</script>

<style scoped>
  .inp{
    border:none;
    border-bottom: 1px solid #000
  }
</style>
