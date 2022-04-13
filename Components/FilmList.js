import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'
import ViewedItem from './ViewedItem'

class FilmList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: []
        }
    }

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate('Film', { idFilm: idFilm })
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.films}
                extraData={this.props.favoritesFilm}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    this.props.showFilmDetails ? (
                        <FilmItem
                            film={item}
                            isFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1)}
                            displayDetailForFilm={this._displayDetailForFilm}
                        />) : (
                        <ViewedItem
                            film={item}
                            displayDetailForFilm={this._displayDetailForFilm}
                        />)
                )}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (this.props.searchList && this.props.page < this.props.totalPages) {
                        this.props.loadFilms()
                    }
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})

const mapStateToProps = state => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmList)