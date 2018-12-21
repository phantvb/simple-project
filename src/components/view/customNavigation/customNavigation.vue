<template>
    <div id="customNavigation">
        <div class="navigation">
            <div class="detailMsg">
                <p>
                    导航管理(可拖动排序)
                </p>
            </div>
            <el-tree
                    :data="navigationList"
                    node-key="id"
                    show-checkbox
                    default-expand-all
                    @node-drag-start="handleDragStart"
                    @node-drag-enter="handleDragEnter"
                    @node-drag-leave="handleDragLeave"
                    @node-drag-over="handleDragOver"
                    @node-drag-end="handleDragEnd"
                    @node-drop="handleDrop"
                    draggable
                    :allow-drop="allowDrop"
                    :allow-drag="allowDrag">
            </el-tree>

        </div>
    </div>
</template>
<script>
    export default {
        name: 'customNavigation',
        data() {
            return {
                navigationList: [{
                    id: 1,
                    label: '企业管理',
                }, {
                    id: 2,
                    label: '业务受理',
                }, {
                    id: 3,
                    label: '合同管理',
                },{
                    id: 4,
                    label: '运营管理',
                },{
                    id: 5,
                    label: '报表管理',
                },{
                    id: 6,
                    label: '预警信息',
                },{
                    id: 7,
                    label: '人工质检',
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        components: {},
        methods: {
            handleDragStart(node, ev) {
                console.log('drag start', node);
            },
            handleDragEnter(draggingNode, dropNode, ev) {
                console.log('tree drag enter: ', dropNode.label);
            },
            handleDragLeave(draggingNode, dropNode, ev) {
                console.log('tree drag leave: ', dropNode.label);
            },
            handleDragOver(draggingNode, dropNode, ev) {
                console.log('tree drag over: ', dropNode.label);
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                console.log('tree drag end: ', dropNode && dropNode.label, dropType);
            },
            handleDrop(draggingNode, dropNode, dropType, ev) {
                console.log('tree drop: ', dropNode.label, dropType);
            },
            allowDrop(draggingNode, dropNode, type) {
                if (dropNode.data.label === '二级 3-1') {
                    return type !== 'inner';
                } else {
                    return true;
                }
            },
            allowDrag(draggingNode) {
                return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
            }
        },
        computed: {}
    }
</script>
<style lang="scss" scoped>
    @import './customNavigation.scss';
</style>
