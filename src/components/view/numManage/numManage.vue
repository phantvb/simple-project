<template>
    <div id="numManage">
        <el-tabs v-model="active">
            <el-tab-pane label="自助直销" name="1"></el-tab-pane>
            <el-tab-pane label="渠道" name="2"></el-tab-pane>
            <div class="search">
                <ul>
                    <li>
                        <el-input v-model="form.name" placeholder="请输入内容" size="mini">
                            <template slot="prepend" style="width:80px;">400号码</template>
                        </el-input>
                    </li>
                    <li>
                        <el-input v-model="form.person" placeholder="请输入内容" size="mini">
                            <template slot="prepend">引示号码</template>
                        </el-input>
                    </li>
                    <li>
                        <el-input v-model="form.person" placeholder="请输入内容" size="mini">
                            <template slot="prepend">企业名称</template>
                        </el-input>
                    </li>
                </ul>
                <div class="block left" style="margin-left:68px;">
                    <el-button type="primary" size="mini" style="width:80px;">搜索</el-button>
                    <el-button type="primary" plain size="mini" style="width:80px;">重置</el-button>
                </div>
            </div>
            <section class="left block lineTop">
                <el-button type="primary" size="mini">启用</el-button>
                <el-button type="primary" plain size="mini">关停</el-button>
                <div style="float:right">
                    <span class="fmini">状态：</span>
                    <el-select v-model="status" placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </section>
            <el-table
            :data="tableData"
            style="width: 100%;margin-bottom:15px;">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="400号码"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="引示号码"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="number"
                    label="企业名称"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="person"
                    label="套餐名称"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="套餐到期时间"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="操作"
                    min-width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text">停用</el-button>
                        <el-button size="mini" type="text">注销</el-button>
                        <el-button size="mini" type="text">号码设置</el-button>
                        <el-button size="mini" type="text">详情</el-button>
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
    </div>
</template>
<style lang="scss" scoped>
@import './common.scss';
</style>
<script>
export default {
    name:'numManage',
    data(){
        return {
            active:'1',
            form:{
                name:'',
                person:'',
                number:'',
                date:null,
                status
            },
            status:'',
            options: [{
                value: '',
                label: '全部'
            }, {
                value: '选项2',
                label: '启用'
            }, {
                value: '选项3',
                label: '停用'
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
    }
}
</script>

