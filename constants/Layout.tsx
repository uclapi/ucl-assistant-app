import { Dimensions } from "react-native"

const { width, height }: { width: number, height: number } = Dimensions.get(`window`)

export default {
  isSmallDevice: width < 375,
  window: {
    height,
    width,
  },
}
