import React from 'react'
import { StyleSheet, View, Share, ActivityIndicator, ScrollView, Text, Image, TouchableOpacity, Platform } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import EnlargeShrink from '../Animations/EnlargeShrink'

class FilmDetail extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state

        if (params.film != undefined && Platform.OS == 'ios') {
            return {
                headerRight: <TouchableOpacity
                    style={styles.share_touchable_floatingactionbutton}
                    onPress={() => this._shareFilm()}>
                    <Image
                        style={styles.share_image}
                        source={require('../Images/ic_share.ios.png')} />
                </TouchableOpacity>
            }
        }
    }

    _updateNavigationParams() {
        this.props.navigation.setParams({
            shareFilm: this._shareFilm,
            film: this.state.film
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true
        }

        this._shareFilm = this._shareFilm.bind(this)
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
        var sizeGoal = 40
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            sourceImage = require('../Images/ic_favorite.png')
            sizeGoal = 80
        }
        return (
            <EnlargeShrink source={sourceImage} sizeGoal={sizeGoal}>
            </EnlargeShrink>
        )
    }

    _shareFilm() {
        const { film } = this.state;
        Share.share({ title: film.title, message: film.overview })
    }

    _displayFloatingActionButton() {
        const { film } = this.state;
        const imageIos = '../Images/ic_share.ios.png';
        const imageAndroid = '../Images/ic_share.android.png';
        if (film != undefined && Platform.OS === 'android') {
            return (
                <TouchableOpacity
                    style={styles.share_touchable_floatingactionbutton}
                    onPress={() => this._shareFilm()}>
                    <Image
                        style={styles.share_image}
                        source={require('../Images/ic_share.android.png')} />
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayFilm()}
                {this._displayLoading()}
                {this._displayFloatingActionButton()}
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
        flex: 1,
        width: null,
        height: null
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_image: {
        width: 30,
        height: 30
    }
})

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    };
}
export default connect(mapStateToProps)(FilmDetail)