import { getPlatform, setPlatform } from '@/assets/js/cache'
const platform = {
  state: {
    platform: getPlatform()
  },
  mutations: {
    SET_PLATFORM: (state, platform) => {
      state.platform = platform
      setPlatform(platform)
    }
  }
}

export default platform
