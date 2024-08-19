<template>
  <GenericCreateUpdatePage :fields="fields" :initial="initial" :url="url" />
</template>

<script>
import GenericCreateUpdatePage from '@/layout/components/GenericCreateUpdatePage'

export default {
  name: 'FavoriteNodeCreateUpdate',
  components: {
    GenericCreateUpdatePage
  },
  data() {
    return {
      initial: {},
      fields: [
        [this.$t('common.Basic'), ['name']]
      ],
      url: '/api/v1/assets/favorite-nodes/'
    }
  }
}
</script>

<style>

</style>
