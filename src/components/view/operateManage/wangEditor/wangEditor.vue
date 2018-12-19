<template>
  <div>
    <div id="editor" style="text-align:left"></div>
  </div>
</template>

<script>
  //import E from 'wangeditor'

  export default {
    name: 'editor',
    data () {
      return {
        editor: null
      }
    },
    props: {
      value: {
        default: ''
      }
    },
    mounted () {
      var editor = new E('#editor')
      editor.customConfig.onchange = (html) => {
        this.formArticle.content = html
      }
      editor.create()
      this.editor.txt.html(this.value) // 设置内容
    }
  }
</script>
