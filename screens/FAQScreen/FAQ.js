import PropTypes from "prop-types"
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from "react-native"

import { HeaderText } from "../../components/Typography"
import Colors from "../../constants/Colors"
import { Shadow } from "../../lib"

const styles = StyleSheet.create({
  answerContainer: {
    marginBottom: 30,
    marginTop: 10,
  },
  questionContainer: {
    backgroundColor: Colors.cardHeader,
    borderRadius: 10,
    color: Colors.cardBackground,
    marginBottom: 5,
    padding: 20,
    ...Shadow(2),
  },
  questionText: {
    color: Colors.white,
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
        <TouchableOpacity onPress={this.toggleQuestion} activeOpacity={0.9}>
          <View style={styles.questionContainer}>
            <HeaderText style={styles.questionText}>
              {question}
            </HeaderText>
          </View>
        </TouchableOpacity>
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
