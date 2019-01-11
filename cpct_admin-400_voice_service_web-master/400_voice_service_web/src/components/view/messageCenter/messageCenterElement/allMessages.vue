<template>
    <div>
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;margin-bottom:15px;"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                min-width="80">
            </el-table-column>
            <el-table-column
                prop="messageTitle"
                label="标题"
                min-width="150">
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="接收日期"
                min-width="80">
            </el-table-column>
            <el-table-column
                prop="messageType"
                label="邮件类型"
                min-width="80">
            </el-table-column>
        </el-table>
        <div style="margin-top: 10px">
            <div class="batch-work">
                <el-button type="primary" plain size="mini" style="margin-left: 14px;" @click="batchDelete">批量删除
                </el-button>
            </div>
            <el-pagination
                style="float:right;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.currentPage"
                :page-sizes="$global.pageSize"
                :page-size="page.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
            </el-pagination>
        </div>
        <!--<div @search="search"></div>-->
    </div>

</template>

<script>
    export default {
        props: ['searchMessage'],
        data() {
            return {
                form: {
                    mess: ''
                },
                tableData: [],
                page: {
                    currentPage: 1,
                    size: 10,
                    total: 1
                },
                selectedItems: [],
                ids: []
            }
        },
        methods: {
            // 修改页面显示数据大小
            handleSizeChange(val) {
                this.page.size = val;
                this.loadData();
            },

            // 修改当前显示页面
            handleCurrentChange(val) {
                this.page.currentPage = val;
                this.loadData();
            },

            search(mess) {
                this.$ajax.post('/vos/messagecenter/search', {
                    "messagecenter": {
                        "messageTitle": mess
                    },

                    "page": {
                        "pageNo": this.page.currentPage,
                        "pageSize": this.page.size
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.tableData = res.data.messagecenters;
                        this.page.total = res.data.totalCount;

                        for (let i = 0; i < this.tableData.length; i++) {

                            if (this.tableData[i].messageType == 'audit') {
                                this.tableData[i].messageType = '审核信息';
                            }
                        }
                    }
                });

            },

            handleSelectionChange(val) {
                this.selectedItems = val;
            },

            batchDelete() {
                this.$confirm('此操作将永久删除这些信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    for (let i = 0; i < this.selectedItems.length; i++) {
                        this.ids.push(this.selectedItems[i].id);

                    }
                    let IDS = this.ids.join(',');
                    this.$ajax.post('/vos/messagecenter/delete', {
                        "ids": IDS

                    }).then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                message: '删除成功!',
                                type: 'success'
                            });
                            this.loadData();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            loadData() {
                this.$ajax.post('/vos/messagecenter/getAll', {
                    "messagecenter": {
                        "messageTitle": ""
                    },

                    "page": {
                        "pageNo": this.page.currentPage,
                        "pageSize": this.page.size
                    }

                }).then((res) => {
                    if (res.code == 200) {
                        this.tableData = res.data.messagecenters;
                        this.page.total = res.data.totalCount;

                        for (let i = 0; i < this.tableData.length; i++) {

                            if (this.tableData[i].messageType == 'audit') {
                                this.tableData[i].messageType = '审核信息';
                            }
                        }
                    }
                });
            }
        },
        created() {
            this.loadData();
        }
    }
</script>

<style lang="scss" scoped>
    @import '../messageCenter';
</style>
