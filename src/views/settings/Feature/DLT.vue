<template>
  <div>
    <el-alert v-sanitize="helpText" type="info" />
    <IBox>
      <GenericCreateUpdateForm v-bind="$data" />
    </IBox>
  </div>
</template>

<script>
import { GenericCreateUpdateForm } from '@/layout/components'
import IBox from '@/components/Common/IBox/index.vue'
import { openTaskPage } from '@/utils/jms/index'
import store from '@/store'

export default {
  components: {
    IBox,
    GenericCreateUpdateForm
  },
  data() {
    const vm = this
    return {
      url: '/api/v1/settings/setting/?category=dlt',
      hasReset: false,
      helpText: this.$t('DLTHelpText'),
      moreButtons: [
        {
          title: this.$t('fullSync'),
          loading: false,
          disabled: !store.getters.publicSettings['DLT_ENABLED'],
          callback: function(value, form, btn) {
            btn.loading = true
            vm.$axios.post(
              '/api/v1/settings/dlt/full-sync/',
              value
            ).then(res => {
              openTaskPage(res['task'])
            }).catch(() => {
              vm.$log.error('err occur')
            }).finally(() => { btn.loading = false })
          }
        },
        {
          title: this.$t('incrementalSync'),
          loading: false,
          disabled: !store.getters.publicSettings['DLT_ENABLED'],
          callback: function(value, form, btn) {
            btn.loading = true
            vm.$axios.post(
              '/api/v1/settings/dlt/incremental-sync/',
              value
            ).then(res => {
              openTaskPage(res['task'])
            }).catch(() => {
              vm.$log.error('err occur')
            }).finally(() => { btn.loading = false })
          }
        }
      ],
      fields: [
        [
          this.$t('Account'),
          [
            'DLT_ENABLED',
            'DLT_FULL_DATA_SYNC_CRONTAB',
            'DLT_INCREMENTAL_DATA_SYNC_CRONTAB'
          ]
        ]
      ],
      fieldsMeta: {
        DLT_ENABLED: {
          disabled: true,
          label: this.$t('enableDLT')
        },
        DLT_FULL_DATA_SYNC_CRONTAB: {
          label: this.$t('CMDBFullSyncCron'),
          hidden: (formValue) => {
            return !formValue.DLT_ENABLED
          }
        },
        DLT_INCREMENTAL_DATA_SYNC_CRONTAB: {
          label: this.$t('CMDBIncrementalSYncCron'),
          hidden: (formValue) => {
            return !formValue.DLT_ENABLED
          }
        }
      },
      submitMethod() {
        return 'patch'
      }
    }
  }
}
</script>

<style scoped>

</style>
