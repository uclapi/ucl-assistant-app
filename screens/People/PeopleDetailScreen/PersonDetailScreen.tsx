import React, { useCallback, useEffect } from "react"
import {
  ActivityIndicator, StyleSheet, View, ViewStyle,
} from "react-native"
import { connect, ConnectedProps } from "react-redux"
import { fetchPerson as fetchPersonAction, PeopleDispatch } from "../../../actions/peopleActions"
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

export const PersonDetailScreen: React.FC<PropsFromRedux> = ({
  name, status, department, email, isFetching, error, token, fetchPerson,
}) => {
  const sendEmail = useCallback(() => MailManager.composeAsync({ recipients: [email] }), [email])

  useEffect(() => {
    fetchPerson(token, email)
  })

  return isFetching ? (
    <PageNoScroll style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </PageNoScroll>
  ) : (
    <PageNoScroll>
      <View style={styles.container}>
        <TitleText>{name}</TitleText>
        {error.length > 0 && (
          <ErrorText>
            {`Error: ${error}`}
          </ErrorText>
        )}
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
    department: state.people.person.department,
    email: state.people.person.email,
    error: state.people.fetchError,
    isFetching: state.people.isFetching,
    name: state.people.person.name,
    status: state.people.person.status,
    token: state.user.token,
  }),
  (dispatch: PeopleDispatch) => ({
    fetchPerson: (token, email) => dispatch(fetchPersonAction(token, email)),
  }),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(PersonDetailScreen)
