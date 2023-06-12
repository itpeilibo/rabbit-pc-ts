<script lang="tsx" >
// 即包含了结构描述，也包含了逻辑
// => 这种jsx/tsx的写法，逻辑 和 js描述的结构混合，可以任意通过 js 代码动态控制结构
// => 灵活性强
export default {
    data() {
        return {
          msg: 'zs'
        }
    },
    // 通过 render 函数，决定组件结构（虚拟dom）而不是template
    render() {
        // return h('div',{title:'大标题',className: 'box'},'我是内容')
        return (
            <div>
                <h3>123</h3>
                <ul>
                    <li>{this.msg }</li>
                    <li>123</li>
                    <li>123</li>
                    <li>123</li>
                </ul>
            </div>
        )
    }
}
</script>

<style scoped lang="less">
.box {
  width: 200px;
  height: 200px;
  background-color: pink;
}
</style>
