import PropTypes from "prop-types"
import React from 'react'
import { StyleSheet, View } from "react-native"

import Button from "../../components/Button"
import Colors from "../../constants/Colors"
import { Shadow } from "../../lib"

const styles = StyleSheet.create({
  answerContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 10,
    padding: 20,
    ...Shadow(2),
  },
  question: {
    zIndex: 2,
  },
  section: {

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
        <Button onPress={this.toggleQuestion} style={styles.question}>
          {question}
        </Button>
        {showAnswer && (
          <View style={styles.answerContainer}>
            {answer}
          </View>
        )}
      </View>
    )
  }
}

export default FAQ
