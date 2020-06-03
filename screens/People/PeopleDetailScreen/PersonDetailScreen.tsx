import type { RouteProp } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { ActivityIndicator } from "react-native"
import { connect, ConnectedProps } from "react-redux"

import {
  fetchPerson as fetchPersonAction, PeopleDispatch,
} from "../../../actions/peopleActions"
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
import type { PeopleNavigatorParamList } from "../PeopleNavigator"

interface Props extends PropsFromRedux {
  navigation: StackNavigationProp<PeopleNavigatorParamList>,
  // eslint-disable-next-line quotes
  route: RouteProp<PeopleNavigatorParamList, 'PeopleDetail'>,
}

interface State {
  email: string,
}

class PersonDetailScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: `Person Detail`,
  }

  constructor(props) {
    super(props)
    const { params } = props.route
    this.state = { ...params }
  }

  componentDidMount() {
    const { fetchPerson, token } = this.props
    const { email } = this.props
    fetchPerson(token, email)
  }

  sendEmail = () => {
    const { email } = this.props
    MailManager.composeAsync({
      recipients: [email],
    })
  }

  render() {
    const {
      name, status, department, email, isFetching, error,
    } = this.props
    return isFetching ? (
      <PageNoScroll>
        <ActivityIndicator size="large" />
      </PageNoScroll>
    ) : (
        <PageNoScroll>
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
          <Button onPress={this.sendEmail}>
            <PaddedIcon name="mail" size={24} color={Colors.pageBackground} />
            <ButtonText>Send Email</ButtonText>
          </Button>
        </PageNoScroll>
    )
  }
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
