<template>
  <TabPage :active-menu.sync="activeMenu" :submenu="submenu">
    <keep-alive>
      <component :is="activeMenu" />
    </keep-alive>
  </TabPage>
</template>

<script>
import TabPage from '@/layout/components/TabPage/index.vue'
import Announcement from './Announcement.vue'
import Vault from './Vault.vue'
import Ticket from './Ticket.vue'
import Ops from './Ops.vue'
import Chat from './Chat.vue'
import VirtualApp from './VirtualApp.vue'
import ITSM from './ITSM.vue'
import ITSMSyncJS from './ITSMSyncJS'

export default {
  name: 'Feature',
  components: { TabPage, Announcement, Vault, Ticket, Ops, Chat, VirtualApp, ITSM, ITSMSyncJS },
  data() {
    return {
      activeMenu: 'Announcement',
      submenu: [
        {
          title: this.$t('setting.Announcement'),
          name: 'Announcement'
        },
        {
          title: this.$t('setting.Ticket'),
          name: 'Ticket',
          hidden: !this.$store.getters.hasValidLicense
        },
        {
          title: this.$t('setting.AppOps'),
          name: 'Ops'
        },
        {
          title: this.$t('setting.AccountStorage'),
          name: 'Vault',
          hidden: !this.$store.getters.hasValidLicense
        },
        {
          title: this.$t('setting.ChatAI'),
          name: 'Chat',
          hidden: !this.$hasPerm('settings.change_vault')
        },
        {
          title: this.$t('setting.VirtualApp'),
          name: 'VirtualApp',
          hidden: !this.$hasPerm('settings.change_virtualapp') || !this.$store.getters.hasValidLicense
        },
        {
          title: this.$t('setting.ITSM'),
          name: 'ITSM',
          hidden: !this.$hasPerm('settings.change_itsm') || !this.$store.getters.hasValidLicense
        },
        {
          title: this.$t('setting.ITSMSyncJS'),
          name: 'ITSMSyncJS',
          hidden: !this.$hasPerm('settings.change_itsm_sync_js') || !this.$store.getters.hasValidLicense
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
