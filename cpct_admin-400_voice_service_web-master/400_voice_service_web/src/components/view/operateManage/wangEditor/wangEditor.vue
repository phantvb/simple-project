<template>

    <div>
        <div id="wangEditor" ref="editorElem" style="text-align:left" v-html="editContent"></div>
    </div>


</template>

<script>
    import E from 'wangeditor'

    export default {

        name: 'wangEditor',

        data() {
            return {
                content: '',
                editor:''
            }
        },

        props: ['addContent', 'editContent'],    //接收父组件的对象

        methods:{
            test(){
                this.editor = new E('#wangEditor');

                this.editor.customConfig.onchange = (html) => {
                    this.content = html;
                    this.addContent(this.content);
                };

                this.editor.create();
            }

        }
    }

</script>

<style lang="css">

</style>
