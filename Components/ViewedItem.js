import React from 'react'
import { StyleSheet, View, Text, Image, Pressable } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi';
import FadeIn from '../Animations/FadeIn';

class ViewedItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showDate: false
        }

        this._displayDate = this._displayDate.bind(this)
    }

    _displayDate(bool) {
        if (bool!=this.state.showDate){
            this.setState({
                showDate: bool
            })
        } 
    }

    render() {
        const { film } = this.props;
        return (
            <FadeIn>
                <Pressable 
                onLongPress={() => {this._displayDate(true)}} 
                onPressOut={() => {this._displayDate(false)}}
                onPress={() => {this.props.displayDetailForFilm(film.id)}}>
                    <View style={styles.main_container}>
                        <Image style={styles.image} source={{ uri: getImageFromApi(film.poster_path) }} />
                        <View style={styles.text_container}>
                                {!this.state.showDate ? <Text style={styles.title_text}>{film.title}</Text> :
                                <Text style={styles.date}>Sorti le {film.release_date}</Text>}
                        </View>
                    </View>
                </Pressable>
            </FadeIn>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 90
    },
    image: {
        width: 75,
        height: 75,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#555555',
        borderRadius: 50
    },
    text_container: {
        flex: 1,
        margin: 5
    },
    title_text: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 20,
        flexWrap: 'wrap',
        paddingRight: 5,
        textAlignVertical: 'center',
    },
    date: {
        flex: 1,
        fontSize: 20,
        flexWrap: 'wrap',
        paddingRight: 5,
        fontWeight: 'bold',
        textAlignVertical: 'center',
    }
})

export default ViewedItem