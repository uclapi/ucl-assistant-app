import PropTypes from "prop-types"
import React, { Component } from "react"
import { ActivityIndicator } from "react-native"
import { connect } from "react-redux"

import { fetchPerson as fetchPersonAction } from "../actions/peopleActions"
import Button from "../components/Button"
import { PaddedIcon, PageNoScroll, Spacer } from "../components/Containers"
import {
  BodyText,
  ButtonText,
  ErrorText,
  TitleText,
} from "../components/Typography"
import Colors from "../constants/Colors"
import MailManager from "../lib/MailManager"

class PersonDetailScreen extends Component {
  static navigationOptions = {
    title: `Person Detail`,
  }

  static propTypes = {
    department: PropTypes.string,
    email: PropTypes.string,
    error: PropTypes.string,
    fetchPerson: PropTypes.func,
    isFetching: PropTypes.bool,
    /* eslint-disable react/no-unused-prop-types */
    name: PropTypes.string,
    navigation: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
    status: PropTypes.string,
    token: PropTypes.string,
    /* eslint-enable react/no-unused-prop-types */
  }

  static defaultProps = {
    department: ``,
    email: ``,
    error: ``,
    fetchPerson: () => { },
    isFetching: false,
    name: ``,
    status: ``,
    token: ``,
  }

  static mapStateToProps = (state) => ({
    department: state.people.person.department,
    email: state.people.person.email,
    error: state.people.fetchError,
    isFetching: state.people.isFetching,
    name: state.people.person.name,
    status: state.people.person.status,
    token: state.user.token,
  })

  static mapDispatchToProps = (dispatch) => ({
    fetchPerson: (token, email) => dispatch(fetchPersonAction(token, email)),
  })

  constructor(props) {
    super(props)
    const { params } = props.route
    this.state = { ...params }
  }

  componentDidMount() {
    const { fetchPerson, token } = this.props
    const { email } = this.state
    fetchPerson(token, email)
  }

  sendEmail = () => {
    const { email } = this.state
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

export default connect(
  PersonDetailScreen.mapStateToProps,
  PersonDetailScreen.mapDispatchToProps,
)(PersonDetailScreen)
