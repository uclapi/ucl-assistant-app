import React from 'react'
import { StyleSheet, View } from "react-native"

import Button from "../../../components/Button"
import Colors from "../../../constants/Colors"
import { Shadow } from "../../../lib"

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

interface Props {
  answer: string | React.ReactNode,
  question: string,
}

interface State {
  showAnswer: boolean,
}

class FAQ extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      showAnswer: false,
    }
  }

  toggleQuestion = (): void => {
    const { showAnswer } = this.state
    this.setState({ showAnswer: !showAnswer })
  }

  render(): React.ReactElement {
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
