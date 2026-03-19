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
      url: '/api/v1/settings/setting/?category=cmdb',
      hasReset: false,
      helpText: this.$t('CMDBHelpText'),
      moreButtons: [
        {
          title: this.$t('fullSync'),
          loading: false,
          disabled: !store.getters.publicSettings['CMDB_ENABLED'],
          callback: function(value, form, btn) {
            btn.loading = true
            vm.$axios.post(
              '/api/v1/settings/cmdb/full-sync/',
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
          disabled: !store.getters.publicSettings['CMDB_ENABLED'],
          callback: function(value, form, btn) {
            btn.loading = true
            vm.$axios.post(
              '/api/v1/settings/cmdb/incremental-sync/',
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
            'CMDB_ENABLED',
            'CMDB_USERNAME',
            'CMDB_PASSWORD',
            'CMDB_BK_PAAS_HOST',
            'CMDB_BK_APP_CODE',
            'CMDB_BK_APP_SECRET',
            'CMDB_FULL_DATA_SYNC_CRONTAB',
            'CMDB_INCREMENTAL_DATA_SYNC_CRONTAB'
          ]
        ]
      ],
      fieldsMeta: {
        CMDB_ENABLED: {
          disabled: true,
          label: this.$t('enableCMDB')
        },
        CMDB_USERNAME: {
          label: this.$t('CMDBUsername'),
          hidden: (formValue) => {
            return !formValue.CMDB_ENABLED
          }
        },
        CMDB_PASSWORD: {
          label: this.$t('CMDBPassword')
        },
        CMDB_BK_PAAS_HOST: {
          label: this.$t('CMDBHost'),
          hidden: (formValue) => {
            return !formValue.CMDB_ENABLED
          }
        },
        CMDB_BK_APP_CODE: {
          label: this.$t('CMDBAppCode'),
          hidden: (formValue) => {
            return !formValue.CMDB_ENABLED
          }
        },
        CMDB_BK_APP_SECRET: {
          label: this.$t('CMDBAppSecret')
        },
        CMDB_FULL_DATA_SYNC_CRONTAB: {
          label: this.$t('CMDBFullSyncCron'),
          hidden: (formValue) => {
            return !formValue.CMDB_ENABLED
          }
        },
        CMDB_INCREMENTAL_DATA_SYNC_CRONTAB: {
          label: this.$t('CMDBIncrementalSYncCron'),
          hidden: (formValue) => {
            return !formValue.CMDB_ENABLED
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
