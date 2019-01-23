<template>
    <div>
        <el-table
            ref="multipleTable"
            tooltip-effect="dark"
            :data="tableData"
            style="width: 100%;margin-bottom:15px;"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" min-width="80"></el-table-column>
            <el-table-column prop="title" label="标题" min-width="150"></el-table-column>
            <el-table-column prop="publishMan" label="发布人" min-width="80"></el-table-column>
            <el-table-column prop="publishTime" label="发布时间" min-width="80"></el-table-column>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="公告内容">
                            <span v-html="props.row.content"></span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 10px">
            <div class="batch-work">
                <el-button
                    type="primary"
                    plain
                    size="mini"
                    style="margin-left: 14px;"
                    @click="batchDelete"
                >批量删除</el-button>
            </div>
            <el-pagination
                style="float:right;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.currentPage"
                :page-sizes="$global.pageSize"
                :page-size="page.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                mess: ""
            },
            tableData: [],
            page: {
                currentPage: 1,
                size: 10,
                total: 1
            },
            selectedItems: [],
            ids: []
        };
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
            this.$ajax
                .post("/vos/announcement/search", {
                    page: {
                        pageNo: "1",
                        pageSize: this.page.size
                    },

                    ann: {
                        title: mess,
                        publishMan: ""
                    },

                    beforeTime: "",
                    afterTime: ""
                })
                .then(res => {
                    if (res.code == 200) {
                        this.tableData = res.data.announcements;
                        this.page.total = res.data.totalCount;
                    }
                });
        },

        handleSelectionChange(val) {
            this.selectedItems = val;
        },

        batchDelete() {
            this.$confirm("此操作将永久删除这些信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            })
                .then(() => {
                    for (let i = 0; i < this.selectedItems.length; i++) {
                        this.ids.push(this.selectedItems[i].id);
                    }
                    let IDS = this.ids.join(",");
                    this.$ajax
                        .post("/vos/announcement/delete", {
                            ids: IDS
                        })
                        .then(res => {
                            if (res.code == 200) {
                                this.$message({
                                    message: "删除成功!",
                                    type: "success"
                                });
                            }
                            if (res.code == 4005) {
                                this.$message.error("您无权操作!");
                            }
                            this.loadData();
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },

        loadData() {
            this.$ajax
                .post("/vos/announcement/getAll", {
                    ann: {
                        title: "",
                        publishMan: ""
                    },

                    page: {
                        pageNo: this.page.currentPage,
                        pageSize: this.page.size
                    }
                })
                .then(res => {
                    if (res.code == 200) {
                        this.tableData = res.data.announcements;
                        this.page.total = res.data.totalCount;
                    }
                });
        }
    },
    created() {
        this.loadData();
    }
};
</script>

<style lang="scss" scoped>
@import "../messageCenter";
</style>

<style>
.demo-table-expand{
    font-size: 0;
}

.demo-table-expand label {
    padding-top: 15px;
	width: 90px;
	color: #99a9bf;
}

.demo-table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
}
</style>
