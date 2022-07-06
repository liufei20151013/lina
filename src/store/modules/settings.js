import defaultSettings from '@/settings'
import { getPublicSettings } from '@/api/settings'
import { writeNewStyle, getIndexStyle } from '@/utils/theme/index'
import { matchColor, defaultThemeColor } from '@/utils/theme/color'

const { showSettings, fixedHeader, sidebarLogo, tagsView } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  tagsView: tagsView,
  publicSettings: null,
  hasValidLicense: false,
  themeColor: localStorage.getItem('themeColor') || defaultThemeColor
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  SET_PUBLIC_SETTINGS: (state, settings) => {
    const color = settings.INTERFACE?.theme
    state.publicSettings = settings
    state.themeColor = matchColor[color] || defaultThemeColor

    if (settings['XPACK_ENABLED']) {
      state.hasValidLicense = settings['XPACK_LICENSE_IS_VALID']
    }
  },
  setTheme(state, data) {
    state.themeColor = data
    localStorage.setItem('themeColor', state.themeColor)
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  // get user Profile
  getPublicSettings({ commit, state }, isOpen) {
    return new Promise((resolve, reject) => {
      getPublicSettings(isOpen).then(response => {
        const data = response || {}
        if (isOpen) {
          const faviconURL = data['INTERFACE']?.favicon
          let link = document.querySelector("link[rel*='icon']")
          if (!link) {
            link = document.createElement('link')
            link.type = 'image/x-icon'
            link.rel = 'shortcut icon'
            document.getElementsByTagName('head')[0].appendChild(link)
          }
          if (faviconURL) {
            link.href = faviconURL
          }
          // 动态修改Title
          document.title = data['INTERFACE']['login_title']
        }
        commit('SET_PUBLIC_SETTINGS', data)
        getIndexStyle().then(() => {
          writeNewStyle(state.themeColor)
        })
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  changeThemeStyle({ commit }, color) {
    commit('setTheme', color)
    writeNewStyle(color)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

