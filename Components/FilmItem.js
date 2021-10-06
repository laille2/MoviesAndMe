import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi';

class FilmItem extends React.Component {
    render() {
        const film = this.props.film;
        return (
            <View style={styles.main_container}>
                <Image style={styles.image} source={{uri: getImageFromApi(film.poster_path)}} />
                <View style={styles.text_container}>
                    <View style={styles.title_container}>
                        <Text style={styles.title_text}>{film.title}</Text>
                        <Text style={styles.vote_text}>{film.vote_average}</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description} numberOfLines={6}>{film.overview}</Text>
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date}>Sorti le {film.release_date}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        /* margin: 10, */
        flexDirection: 'row',
        height: 200/* ,
        padding: 10 */
    },
    image: {
        /* flex: 2, */
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
    title_text: {
        flex: 1,
        /* paddingLeft: 10, */
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