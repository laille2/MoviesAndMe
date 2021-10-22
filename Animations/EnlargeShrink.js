import React from 'react'
import { Animated, Image } from 'react-native'

class EnlargeShrink extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            size: this.props.source===require('../Images/ic_favorite.png') ? new Animated.Value(80) : new Animated.Value(40),
        }
    }

    componentDidUpdate() {
        Animated.spring(
            this.state.size,
            {
                toValue: this.props.sizeGoal,
                useNativeDriver: false
            }
        ).start()
    }

    render() {
        return (
            <Animated.Image
                style={{ width: this.state.size, height: this.state.size }}
                source={this.props.source}
            >
            </Animated.Image>
        )
    }
}

export default EnlargeShrink