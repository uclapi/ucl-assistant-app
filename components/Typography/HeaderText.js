import PropTypes from "prop-types"
import React from "react"
import {
  Text,
} from "react-native"

import Style from "../../styles/Typography"

const propTypes = {
  children: PropTypes.node,
  style: Text.propTypes.style,
}
const defaultProps = {
  children: ``,
  style: {},
}

const HeaderText = ({ children, style }) => (
  <Text style={[Style.headerText, style]}>{children}</Text>
)
HeaderText.propTypes = propTypes
HeaderText.defaultProps = defaultProps

export default HeaderText
