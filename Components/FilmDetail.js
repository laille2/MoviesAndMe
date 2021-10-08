import React from 'react'
import { StyleSheet, View, ActivityIndicator, ScrollView, Text, Image, TouchableOpacity } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'

class FilmDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true
        }
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.route.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            })
        })
    }

    _toggleFavorite() {
        const action = { type: 'TOGGLE_FAVORITE', value: this.state.film }
        this.props.dispatch(action)
    }

    componentDidUpdate() {
        /* console.log(this.props.favoritesFilm) */
    }

    _displayFilm() {
        const film = this.state.film;
        if (film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image style={styles.image} source={{ uri: getImageFromApi(film.backdrop_path) }} />
                    <Text style={styles.title}>{film.title}</Text>
                    <TouchableOpacity
                        style={styles.favorite_container}
                        onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.overview}>{film.overview}</Text>
                    <Text style={styles.detail}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.detail}>Note : {film.vote_average} / 10</Text>
                    <Text style={styles.detail}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.detail}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                    <Text style={styles.detail}>Genre(s) : {film.genres.map(function (genre) {
                        return genre.name;
                    }).join(" / ")}
                    </Text>
                    <Text style={styles.detail}>Companie(s) : {film.production_companies.map(function (company) {
                        return company.name;
                    }).join(" / ")}
                    </Text>
                </ScrollView>
            )
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' color="#0000ff" />
                </View>
            )
        }
    }

    _displayFavoriteImage() {
        var sourceImage = require('../Images/ic_favorite_border.png')
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            sourceImage = require('../Images/ic_favorite.png')
        }
        return (
            <Image
                source={sourceImage}
                style={styles.favorite_image}
            />
        )
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayFilm()}
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    scrollview_container: {
        flex: 1,
        margin: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        height: 200,
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        margin: 5,
        fontWeight: 'bold'
    },
    overview: {
        fontStyle: 'italic',
        marginTop: 10,
        marginBottom: 10
    },
    detail: {
        fontWeight: 'bold'
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        width: 40,
        height: 40
    }
})

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    };
}
export default connect(mapStateToProps)(FilmDetail)