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
      url: '/api/v1/settings/setting/?category=itsm',
      hasReset: false,
      helpText: this.$t('setting.ITSMHelpText'),
      moreButtons: [
        {
          title: this.$t('setting.sync'),
          loading: false,
          disabled: !store.getters.publicSettings['ITSM_ENABLED'],
          callback: function(value, form, btn) {
            btn.loading = true
            vm.$axios.post(
              '/api/v1/settings/itsm/sync/',
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
            'ITSM_ENABLED',
            'ITSM_USER',
            'ITSM_ORG',
            'ITSM_SERVER',
            'ITSM_HOST',
            'ITSM_OBJECT_ID',
            'ITSM_SYNC_CRONTAB',
            'ITSM_AREA',
            'ITSM_ENVIRONMENT'
          ]
        ]
      ],
      fieldsMeta: {
        ITSM_ENABLED: {
          disabled: true,
          label: this.$t('setting.EnableITSM')
        },
        ITSM_USER: {
          hidden: (formValue) => {
            return !formValue.ITSM_ENABLED
          }
        },
        ITSM_ORG: {
          hidden: (formValue) => {
            return !formValue.ITSM_ENABLED
          }
        },
        ITSM_SERVER: {
          hidden: (formValue) => {
            return !formValue.ITSM_ENABLED
          }
        },
        ITSM_HOST: {
          hidden: (formValue) => {
            return !formValue.ITSM_ENABLED
          }
        },
        ITSM_OBJECT_ID: {
          hidden: (formValue) => {
            return !formValue.ITSM_ENABLED
          }
        },
        ITSM_SYNC_CRONTAB: {
          hidden: (formValue) => {
            return !formValue.ITSM_ENABLED
          }
        },
        ITSM_AREA: {
          hidden: (formValue) => {
            return !formValue.ITSM_ENABLED
          }
        },
        ITSM_ENVIRONMENT: {
          hidden: (formValue) => {
            return !formValue.ITSM_ENABLED
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
