<template>
  <Dialog
    v-if="iVisible"
    :destroy-on-close="true"
    :show-cancel="false"
    :show-confirm="false"
    :title="$tc('assets.CollectingAsset')"
    :visible.sync="iVisible"
    top="35vh"
    width="40%"
  >
    <el-row :gutter="20">
      <el-col :md="4" :sm="24">
        <div style="line-height: 34px">{{ $t('assets.FavoriteNode') }}</div>
      </el-col>
      <el-col :md="14" :sm="24">
        <select v-model="favoriteNodeId" class="el-input__inner">
          <option value="" disabled selected hidden>请选择</option>
          <option v-for="(item, index) in favoriteNodes" :key="index" :value="item.id">{{ item.name }}</option>
        </select>
      </el-col>
      <el-col :md="4" :sm="24">
        <el-button
          :loading="loading"
          size="mini"
          style="line-height:20px "
          type="primary"
          @click="dialogConfirm"
        >
          {{ this.$t('common.Confirm') }}
        </el-button>
      </el-col>
    </el-row>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog/index.vue'

export default {
  name: 'FavoriteAssetDialog',
  components: {
    Dialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    cell: {
      type: String,
      default: ''
    },
    allFavorites: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      favoriteNodeId: '',
      favoriteNodes: []
    }
  },
  computed: {
    iVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  mounted() {
    this.getAllFavoriteNodes()
  },
  methods: {
    getAllFavoriteNodes() {
      this.$axios.get('/api/v1/assets/favorite-nodes/').then(resp => {
        this.favoriteNodes = resp
      })
    },
    dialogConfirm() {
      console.log(this.cell)
      console.log(this.favoriteNodeId)
      if (this.favoriteNodeId === '') {
        return this.$message.error(this.$tc('assets.TestFavoriteNodeErrorMsg'))
      }
      const data = { asset: this.cell, favoriteNode: this.favoriteNodeId }
      const url = '/api/v1/assets/favorite-assets/'
      this.$axios.post(url, data).then((res) => {
        this.favoriteNodeId = ''
        this.allFavorites.push({ asset: this.cell })
        this.$message.success(this.$i18n.t('common.CollectionSucceed'))
      }).finally(() => {
        this.iVisible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

