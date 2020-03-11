import PropTypes from "prop-types"
import { ViewPropTypes } from "react-native"

export const propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
}

export const defaultProps = {
  children: ``,
  disabled: false,
  loading: false,
  onPress: () => { },
  style: {},
}
