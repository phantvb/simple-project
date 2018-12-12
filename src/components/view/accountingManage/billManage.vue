<template>
    <div id="billManage">
        <el-tabs v-model="active">
            <el-tab-pane label="自助直销" name="1"></el-tab-pane>
            <el-tab-pane label="渠道" name="2"></el-tab-pane>
            <div class="left">
                <button :class="billType==0?'active':'plain'" @click="billTypeSel(0)">号码月账单</button>
                <button :class="billType==1?'active':'plain'" @click="billTypeSel(1)">每月总账单</button>
            </div>
            <div class="search">
                <ul>
                    <li>
                        <span class="demonstration">400号码：</span>
                        <el-input v-model="form.name" placeholder="请输入内容" size="mini">
                        </el-input>
                    </li>
                    <li>
                        <span class="demonstration">企业名称：</span>
                        <el-input v-model="form.person" placeholder="请输入内容" size="mini">
                        </el-input>
                    </li>
                    <li>
                        <span class="demonstration">套餐：</span>
                        <el-select v-model="form.number" placeholder="请选择" size="mini">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                </ul>
                <div class="block left">
                    <span class="demonstration">月份：</span>
                    <el-date-picker
                    style="margin-right:15px;"
                    v-model="form.date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="mini">
                    </el-date-picker>
                    <el-button type="primary" size="mini" style="width:80px;">搜索</el-button>
                    <el-button type="primary" plain size="mini" style="width:80px;">重置</el-button>
                </div>
            </div>
            <section class="right block lineTop">
                <el-button type="primary" plain size="mini">导出</el-button>
            </section>
            <el-table
            v-show="billType==0"
            :data="tableData"
            style="width: 100%;margin-bottom:15px;">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="月份"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="企业名称"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="number"
                    label="400号码"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="person"
                    label="套餐"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="套餐内计费"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="超额计费"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="时长包计费"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="增值业务费用"
                    min-width="150">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="费用合计"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="操作"
                    min-width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="showBillDetail(true)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table
            v-show="billType==1"
            :data="tableData"
            style="width: 100%;margin-bottom:15px;">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="月份"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="总时长（秒）"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="number"
                    label="总分钟数"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="套餐内计费"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="超额计费"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="时长包计费"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="费用合计"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="线路成本"
                    min-width="100">
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.num"
                :page-sizes="$global.pageSize"
                :page-size="page.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
            </el-pagination>
        </el-tabs>
        <billDetail :show="billDetail" @close="showBillDetail(false)"></billDetail>
    </div>
</template>
<style lang="scss" scoped>
@import './common.scss';
</style>
<script>
import billDetail from './component/billDetail.vue'
export default {
    name:'billManage',
    components:{
        billDetail
    },
    data(){
        return {
            active:'1',
            billType:0,
            billDetail:false,
            form:{
                name:'',
                person:'',
                number:'',
                date:null,
                status
            },
            options: [{
                value: '',
                label: '全部'
            }, {
                value: '选项2',
                label: '等待送审'
            }, {
                value: '选项3',
                label: '待审核'
            }, {
                value: '选项4',
                label: '审核通过'
            }, {
                value: '选项5',
                label: '被驳回'
            }],
            tableData:[],
            page:{
                num:1,
                size:10,
                total:1
            }
        }
    },
    methods:{
        handleSizeChange(){

        },
        handleCurrentChange(){

        },
        billTypeSel(type){
            this.billType=type;
        },
        showBillDetail(bol,data){
            this.billDetail=bol;
        }
    }
}
</script>

