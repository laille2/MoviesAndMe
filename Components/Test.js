import React from 'react'
import { StyleSheet, View, Platform, Animated } from 'react-native'

class Test extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            topPosition: new Animated.Value(0),
        }
    }

    componentDidMount() {
        Animated.spring(
            this.state.topPosition,
            {
                toValue: 100, 
                speed: 12,
                bounciness: 30,
                useNativeDriver: false
            }
        ).start()
    }

  render() {
    return (
      <View style={styles.main_container}>
        <Animated.View style={[styles.animation_view, {top: this.state.topPosition}]}>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subview_container: {
    backgroundColor: Platform.OS === 'android' ? 'red' : 'blue',
    height: 50,
    width: 50
  },
  animation_view: {
    backgroundColor: 'red',
    width: 100,
    height: 100
  }
})

export default Test