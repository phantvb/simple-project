<template>
    <div id="accountingManage">
        <el-tabs v-model="active">
            <el-tab-pane label="自助直销" name="1"></el-tab-pane>
            <el-tab-pane label="渠道" name="2"></el-tab-pane>
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
                    <span class="demonstration">起止时间：</span>
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
                <el-button type="primary" plain size="mini">导出列表</el-button>
                <el-button type="primary" plain size="mini">导出详单</el-button>
            </section>
            <el-table
            :data="tableData"
            style="width: 100%;margin-bottom:15px;">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="商品名称">
                        <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="所属店铺">
                        <span>{{ props.row.shop }}</span>
                    </el-form-item>
                    <el-form-item label="商品 ID">
                        <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="店铺 ID">
                        <span>{{ props.row.shopId }}</span>
                    </el-form-item>
                    <el-form-item label="商品分类">
                        <span>{{ props.row.category }}</span>
                    </el-form-item>
                    <el-form-item label="店铺地址">
                        <span>{{ props.row.address }}</span>
                    </el-form-item>
                    <el-form-item label="商品描述">
                        <span>{{ props.row.desc }}</span>
                    </el-form-item>
                    </el-form>
                </template>
                </el-table-column>

                <el-table-column
                    prop="type"
                    label="400号码"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="企业名称"
                    min-width="200">
                </el-table-column>
                <el-table-column
                    prop="number"
                    label="套餐"
                    min-width="150">
                </el-table-column>
                <el-table-column
                    prop="person"
                    label="数量"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="单位"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="金额（元）"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="起止时间"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="实收"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="到账时间"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="备注"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="操作"
                    min-width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="addfavourable(true)">添加优惠</el-button>
                        <el-button size="mini" type="text">确认到账</el-button>
                        <el-button size="mini" type="text">修改</el-button>
                        <el-button size="mini" type="text">删除</el-button>
                    </template>
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
        <favourable :show="favourable" @close="addfavourable(false)"></favourable>
    </div>
</template>
<style lang="scss" scoped>
@import './common.scss';
</style>
<script>
import favourable from './component/favourable.vue'
export default {
    name:'accountingManage',
    components:{
        favourable
    },
    data(){
        return {
            active:'1',
            favourable:false,
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
        addfavourable(bol){
            this.favourable=bol;
        },
        handleSizeChange(){

        },
        handleCurrentChange(){

        }
    }
}
</script>

