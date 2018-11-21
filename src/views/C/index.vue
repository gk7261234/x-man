<template>
  <div>
    <h3 v-permission:C="['query']">this is C query</h3>
    <h3 v-permission:C="['put']">this is C button</h3>
    <h3 v-permission:C="['delete']">this is C delete</h3>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
export default{
  name: 'C',
  directives: { permission }

}
</script>

<style lang="sass" scoped>

</style>
