import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi';
import FadeIn from '../Animations/FadeIn';

class FilmItem extends PureComponent {

    render() {
        const { film, displayDetailForFilm, isFavorite } = this.props;
        return (
            <FadeIn>
                <TouchableOpacity onPress={() => displayDetailForFilm(film.id)}>
                    <View style={styles.main_container}>
                        <Image style={styles.image} source={{ uri: getImageFromApi(film.poster_path) }} />
                        <View style={styles.text_container}>
                            <View style={styles.title_container}>
                                {isFavorite && <Image source={require('../Images/ic_favorite.png')} style={styles.favorite_image} />}
                                <Text style={styles.title_text}>{film.title}</Text>
                                <Text style={styles.vote_text}>{film.vote_average}</Text>
                            </View>
                            <View style={styles.description_container}>
                                <Text style={styles.description} numberOfLines={6}>{film.overview}</Text>
                            </View>
                            <View style={styles.date_container}>
                                {film.release_date!=undefined && film.release_date!="" && <Text style={styles.date}>Sorti le {film.release_date}</Text>}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </FadeIn>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        height: 200
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: '#555555'
    },
    text_container: {
        flex: 1,
        margin: 5
    },
    title_container: {
        flex: 3,
        flexDirection: 'row'
    },
    favorite_image: {
        height: 20,
        width: 20,
        margin: 5
    },
    title_text: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 20,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#555555'
    },
    description_container: {
        flex: 7
    },
    description: {
        fontStyle: 'italic',
        color: '#555555'
    },
    date_container: {
        flex: 1,
        paddingBottom: 10
    },
    date: {
        textAlign: 'right',
        fontSize: 14
    }
})

export default FilmItem