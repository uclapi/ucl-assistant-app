import React, { useCallback, useState } from 'react'
import {
  StyleSheet, View, ViewProps, ViewStyle,
} from "react-native"
import Button from "../../../components/Button"
import Colors from "../../../constants/Colors"
import { Shadow } from "../../../lib"

interface Style {
  answerContainer: ViewStyle,
  question: ViewStyle,
}

const styles = StyleSheet.create<Style>({
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
})

interface Props extends ViewProps {
  answer: string | React.ReactNode,
  question: string,
}

const FAQ: React.FC<Props> = ({
  question,
  answer,
  ...props
}) => {
  const [showAnswer, setShowAnswer] = useState(false)
  const toggleQuestion = useCallback(() => setShowAnswer(!showAnswer), [showAnswer])

  return (
    <View {...props}>
      <Button onPress={toggleQuestion} style={styles.question}>
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

export default FAQ
