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
      url: '/api/v1/settings/setting/?category=pilla',
      hasReset: false,
      helpText: this.$t('setting.PillaHelpText'),
      encryptedFields: ['VAULT_PILLA_TOKEN', 'VAULT_PILLA_PRIVATE_KEY'],
      fields: [
        [
          this.$t('setting.account'),
          [
            'VAULT_ENABLED',
            'VAULT_PILLA_AUTH_URL',
            'VAULT_PILLA_TOKEN',
            'VAULT_PILLA_PRIVATE_KEY'
          ]
        ]
      ],
      fieldsMeta: {
        VAULT_ENABLED: {
          disabled: true,
          label: this.$t('setting.EnablePilla')
        },
        VAULT_PILLA_AUTH_URL: {
          hidden: (formValue) => {
            return !formValue.VAULT_ENABLED
          }
        },
        VAULT_PILLA_TOKEN: {
          hidden: (formValue) => {
            return !formValue.VAULT_ENABLED
          }
        },
        VAULT_PILLA_PRIVATE_KEY: {
          hidden: (formValue) => {
            return !formValue.VAULT_ENABLED
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
