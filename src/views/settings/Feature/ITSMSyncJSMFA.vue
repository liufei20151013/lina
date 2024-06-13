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

export default {
  components: {
    IBox,
    GenericCreateUpdateForm
  },
  data() {
    return {
      url: '/api/v1/settings/setting/?category=itsm_sync_js_mfa',
      hasReset: false,
      helpText: this.$t('setting.ITSMSyncJSMFAHelpText'),
      fields: [
        [
          this.$t('setting.account'),
          [
            'ITSM_SYNC_JS_MFA_DATA_ENABLED',
            'ITSM_SYNC_JS_MFA_HOST',
            'ITSM_SYNC_JS_MFA_AK',
            'ITSM_SYNC_JS_MFA_SK'
          ]
        ]
      ],
      fieldsMeta: {
        ITSM_SYNC_JS_MFA_DATA_ENABLED: {
          disabled: true,
          label: this.$t('setting.EnableITSMSyncJSMFA')
        },
        ITSM_SYNC_JS_MFA_HOST: {
          hidden: (formValue) => {
            return !formValue.ITSM_SYNC_JS_MFA_DATA_ENABLED
          }
        },
        ITSM_SYNC_JS_MFA_AK: {
          hidden: (formValue) => {
            return !formValue.ITSM_SYNC_JS_MFA_DATA_ENABLED
          }
        },
        ITSM_SYNC_JS_MFA_SK: {
          hidden: (formValue) => {
            return !formValue.ITSM_SYNC_JS_MFA_DATA_ENABLED
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
