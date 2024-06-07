<template>
  <div>
    <el-alert type="success" v-html="helpText" />
    <IBox>
      <GenericCreateUpdateForm v-bind="$data" />
    </IBox>
  </div>
</template>

<script>
import { GenericCreateUpdateForm } from '@/layout/components'
import IBox from '@/components/IBox/index.vue'
import { openTaskPage } from '@/utils/jms'
import store from '@/store'

export default {
  components: {
    IBox,
    GenericCreateUpdateForm
  },
  data() {
    const vm = this
    return {
      url: '/api/v1/settings/setting/?category=itsm_sync_js',
      hasReset: false,
      helpText: this.$t('setting.ITSMSyncJSHelpText'),
      moreButtons: [
        {
          title: this.$t('setting.sync'),
          loading: false,
          disabled: !store.getters.publicSettings['ITSM_SYNC_JS_DATA_ENABLED'],
          callback: function(value, form, btn) {
            btn.loading = true
            vm.$axios.post(
              '/api/v1/settings/itsm/sync/js/',
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
          this.$t('setting.account'),
          [
            'ITSM_SYNC_JS_DATA_ENABLED',
            'ITSM_SYNC_JS_HOST',
            'ITSM_SYNC_JS_AK',
            'ITSM_SYNC_JS_SK',
            'ITSM_SYNC_JS_CRONTAB'
          ]
        ]
      ],
      fieldsMeta: {
        ITSM_SYNC_JS_DATA_ENABLED: {
          disabled: true,
          label: this.$t('setting.EnableITSMSyncJS')
        },
        ITSM_SYNC_JS_HOST: {
          hidden: (formValue) => {
            return !formValue.ITSM_SYNC_JS_DATA_ENABLED
          }
        },
        ITSM_SYNC_JS_AK: {
          hidden: (formValue) => {
            return !formValue.ITSM_SYNC_JS_DATA_ENABLED
          }
        },
        ITSM_SYNC_JS_SK: {
          hidden: (formValue) => {
            return !formValue.ITSM_SYNC_JS_DATA_ENABLED
          }
        },
        ITSM_SYNC_JS_CRONTAB: {
          hidden: (formValue) => {
            return !formValue.ITSM_SYNC_JS_DATA_ENABLED
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
