import { RouteProp } from '@react-navigation/native'
import React, { useCallback } from "react"
import {
  ActivityIndicator, StyleSheet, View, ViewStyle,
} from "react-native"
import { connect, ConnectedProps } from "react-redux"
import { PeopleNavigatorParamList } from ".."
import Button from "../../../components/Button"
import {
  PaddedIcon,
  PageNoScroll,
  Spacer,
} from "../../../components/Containers"
import {
  BodyText,
  ButtonText,
  ErrorText,
  TitleText,
} from "../../../components/Typography"
import type { AppStateType } from "../../../configureStore"
import Colors from "../../../constants/Colors"
import { usePerson } from "../../../hooks"
import MailManager from "../../../lib/MailManager"

interface Style {
  container: ViewStyle,
  loadingContainer: ViewStyle,
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    paddingBottom: 40,
    paddingTop: 40,
  },
  loadingContainer: {
    alignItems: `center`,
    flex: 1,
    justifyContent: `center`,
  },
})

interface Props extends PropsFromRedux {
  // eslint-disable-next-line quotes
  route: RouteProp<PeopleNavigatorParamList, 'PeopleDetail'>,
}

export const PersonDetailScreen: React.FC<Props> = (props) => {
  console.log(props)

  const {
    token,
    route: {
      params: {
        email,
      },
    },
  } = props
  const {
    status: fetchStatus,
    data: {
      name,
      status,
      department,
    } = {},
    error,
  } = usePerson(token, email)

  const sendEmail = useCallback(() => MailManager.composeAsync({ recipients: [email] }), [email])

  return (fetchStatus === `loading`) ? (
    <PageNoScroll style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </PageNoScroll>
  ) : (fetchStatus === `error`) ? (
    <PageNoScroll style={styles.container}>
      {error && (
        <ErrorText>
          {`Error: ${error.name} ${error.message}`}
        </ErrorText>
      )}
    </PageNoScroll>
  ) : (
    <PageNoScroll>
      <View style={styles.container}>
        <TitleText>{name}</TitleText>

        <BodyText>
          {`${status}, ${department}`}
        </BodyText>
        <BodyText>
          {`Email: ${email}`}
        </BodyText>
        <Spacer />
        <Button onPress={sendEmail}>
          <PaddedIcon name="mail" size={24} color={Colors.pageBackground} />
          <ButtonText>Send Email</ButtonText>
        </Button>
      </View>
    </PageNoScroll>
  )
}

const connector = connect(
  (state: AppStateType) => ({
    token: state.user.token,
  }),
  () => ({}),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(PersonDetailScreen)
