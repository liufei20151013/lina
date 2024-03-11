<template>
  <GenericListPage :header-actions="headerActions" :table-config="tableConfig" />
</template>

<script>
import { GenericListPage } from '@/layout/components'

export default {
  components: {
    GenericListPage
  },
  data() {
    return {
      tableConfig: {
        url: '/api/v1/assets/favorite-nodes/',
        columns: ['name', 'actions'],
        columnsShow: {
          min: ['name', 'actions'],
          default: ['name', 'actions']
        }
      },
      headerActions: {
        hasExport: false,
        hasImport: false,
        createRoute: 'FavoriteNodeCreate'
      }
    }
  }
}
</script>

<style>

</style>
