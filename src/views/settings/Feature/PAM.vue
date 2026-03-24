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
      url: '/api/v1/settings/setting/?category=pam',
      hasReset: false,
      helpText: this.$t('PAMHelpText'),
      moreButtons: [
        {
          title: this.$t('fullSync'),
          loading: false,
          disabled: !store.getters.publicSettings['PAM_ENABLED'],
          callback: function(value, form, btn) {
            btn.loading = true
            vm.$axios.post(
              '/api/v1/settings/pam/full-sync/',
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
          disabled: !store.getters.publicSettings['PAM_ENABLED'],
          callback: function(value, form, btn) {
            btn.loading = true
            vm.$axios.post(
              '/api/v1/settings/pam/incremental-sync/',
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
            'PAM_ENABLED',
            'PAM_SERVER',
            'PAM_API_KEY',
            'PAM_FULL_DATA_SYNC_CRONTAB',
            'PAM_INCREMENTAL_DATA_SYNC_CRONTAB'
          ]
        ]
      ],
      fieldsMeta: {
        PAM_ENABLED: {
          disabled: true,
          label: this.$t('enablePAM')
        },
        PAM_SERVER: {
          label: this.$t('CMDBHost'),
          hidden: (formValue) => {
            return !formValue.PAM_ENABLED
          }
        },
        PAM_API_KEY: {
          label: this.$t('APIKey'),
          hidden: (formValue) => {
            return !formValue.PAM_ENABLED
          }
        },
        PAM_FULL_DATA_SYNC_CRONTAB: {
          label: this.$t('CMDBFullSyncCron'),
          hidden: (formValue) => {
            return !formValue.PAM_ENABLED
          }
        },
        PAM_INCREMENTAL_DATA_SYNC_CRONTAB: {
          label: this.$t('CMDBIncrementalSYncCron'),
          hidden: (formValue) => {
            return !formValue.PAM_ENABLED
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
