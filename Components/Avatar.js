import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { connect } from 'react-redux'

class Avatar extends React.Component {

  constructor(props) {
    super(props)
    this._avatarClicked = this._avatarClicked.bind(this)
  }

  _avatarClicked() {
    launchImageLibrary({}, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('L\'utilisateur a annulé')
      }
      else if (response.error) {
        console.log('Erreur : ', response.error)
      }
      else {
        console.log('Photo : ', response.assets[0].uri)
        let requireSource = { uri: response.assets[0].uri }
        const action = { type: 'SET_AVATAR', value: requireSource }
        this.props.dispatch(action)
      }
    })
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={this._avatarClicked}>
        <Image style={styles.avatar} source={this.props.avatar} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 2
  }
})

/* export default Avatar */

const mapStateToProps = (state) => {
  return {
      avatar: state.setAvatar.avatar
  };
}
export default connect(mapStateToProps)(Avatar);