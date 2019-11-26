import PropTypes from "prop-types"
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from "react-native"

import { BodyText, SubtitleText } from "../../components/Typography"

const styles = StyleSheet.create({
  section: {
    marginVertical: 10,
  },
})

class FAQ extends React.Component {
  static propTypes = () => ({
    answer: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(React.Fragment),
    ]),
    question: PropTypes.string,
  })

  constructor() {
    super()
    this.state = {
      showAnswer: false,
    }
  }

  toggleQuestion = () => {
    const { showAnswer } = this.state
    this.setState({ showAnswer: !showAnswer })
  }

  render() {
    const { question, answer } = this.props
    const { showAnswer } = this.state
    return (
      <View style={styles.section}>
        <TouchableOpacity onPress={this.toggleQuestion}>
          <SubtitleText>{question}</SubtitleText>
        </TouchableOpacity>
        {showAnswer && <BodyText>{answer}</BodyText>}
      </View>
    )
  }
}

export default FAQ
