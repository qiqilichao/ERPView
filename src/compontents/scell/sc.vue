<template>
  <div id="app" >
    <el-form  size="small" :inline="true">
      <el-row>
        <el-col :span="24"><h3>安全库存配置单</h3></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="7" :offset="3">
          <div><!--产品名称：笔记本-->
            <el-form-item label="产品名称:">
              <el-input type="text" v-model="msg" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7" :offset="2"><div><!--产品编号：1000000-->
          <el-form-item label="产品编号:">
            <el-input type="text" v-model="msg"/>
          </el-form-item>
        </div></el-col>
        <el-col :span="6"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1"><!--<div class="inline">库存下限数：</div>-->
          <el-form-item label="库存下限数:">
            <div class="inline div01"><el-input type="text" v-model="msg" :clearable="true"/></div>
          </el-form-item>
          <!--<div class="inline">库存报警上限数：</div>-->
          <el-form-item label="库存报警上限数:">
            <div class="inline div01" :clearable="true"><el-input type="text" v-model="msg" class="el-input" :clearable="true"/></div>
          </el-form-item>
        </el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="1">
          <div class="inline">
            <!--设置B/N或S/N：-->
            <el-form-item label="设置B/N或S/N:">
              <el-select style="border: 1px solid #DCDFE6;" class="drop-downBox " v-model="value">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

        </el-col>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="10" >
          <!--<div class="inline">设计人：</div>-->
          <el-form-item label="设计人:">
            <div class="inline div01"><el-input type="text" v-model="msg" :clearable="true"/></div>
          </el-form-item>
        </el-col>
      </el-row>
      <!--表格-->
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="20" :offset="2">
          <div>
            <el-table
              :data="tableData"
              border
              height="160"
              style="width: 100%"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              :cell-style="cellStyle">
              <el-table-column
                width="60"
                prop="id"
                label="序号">
              </el-table-column>
              <el-table-column
                width="80"
                prop="name"
                label="库房名称">
              </el-table-column>
              <el-table-column
                width="140"
                prop="ty"
                label="储存地址地址编号">
              </el-table-column>
              <el-table-column
                prop="province"
                label="储存地址名称">
              </el-table-column>
              <el-table-column
                width="110"
                prop="city"
                label="储存单元简称">
              </el-table-column>
              <el-table-column
                width="100"
                prop="address"
                label="最大储蓄量">
              </el-table-column>
              <el-table-column
                width="80"
                prop="zip"
                label="储存单位"
                style="background: pink;">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="14" :push="1">
          <!--<div class="inline">登记人：</div>-->
          <el-form-item label="登记人:">
            <div class="inline div01"><el-input type="text" v-model="msg" :clearable="true"/></div>
          </el-form-item>
        </el-col>
        <el-col :span="7" :pull="2">
          <!--<div class="inline">登记时间：</div>-->
          <el-form-item label="登记人:">
            <div class="inline">2020/12/07 12:15:16</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" :offset="3">
          <div class="aa">
            <el-form-item label="配置要求:" style="width: 80%; display: block;">
              <el-input type="textarea" :rows="4" resize="none"  placeholder="请输入内容" style="width: 100%" v-model="msg">
              </el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'sc',
    data() {
      return {
        tableData: [{
          id: '1',
          name: '成品库',
          ty:'01-01-01',
          province: '电子-计算机-服务器',
          city: 'jb',
          address: 10000,
          zip: '台'
        },{
          id: '1',
          name: '成品库',
          ty:'01-01-01',
          province: '电子-计算机-服务器',
          city: 'jb',
          address: 10000,
          zip: '台'
        },{
          id: '1',
          name: '成品库',
          ty:'01-01-01',
          province: '电子-计算机-服务器',
          city: 'jb',
          address: 10000,
          zip: '台'
        },{
          id: '1',
          name: '成品库',
          ty:'01-01-01',
          province: '电子-计算机-服务器',
          city: 'jb',
          address: 10000,
          zip: '台'
        }],
        msg:"你说啥",
        options: [{
          value: '1',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }],
        value:"否"
      }
    },
    methods: {
      //设置指定行、列、具体单元格颜色
      cellStyle({row, column, rowIndex, columnIndex}) {
        var arr=[4,5,6];
        for (var i=0;i<arr.length;i++){
          if (columnIndex === arr[i]) { //指定坐标rowIndex ：行，columnIndex ：列
            return 'background:yellow' //rgb(105,0,7)
          }
        }
      }
    }
  }
</script>

<style>
  #app {
    font-weight: bold;
    margin:0 auto;
    width: 80%;
    height: 550px;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    border-radius: 1px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .inline{/*转换行内元素*/
    display: inline-block;
  }

  .div01{/*div下边框*/
    border-bottom:1px solid black;
    width: 330px;
    text-align:left;
  }
  .drop-downBox{
    width: 333px;
  }
  .el-input__inner{
    border: none;
  }
  .aa .el-form-item--small .el-form-item__content,
  .el-form-item--small .el-form-item__labe {
    width: 83%;
  }
</style>
