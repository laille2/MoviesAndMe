import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { getFilmsFromApiOrderedByLatest } from '../API/TMDBApi'
import FilmList from './FilmList'

class News extends React.Component {

    constructor(props) {
        super(props)
        this.page = 0,
            this.totalPages = 0,
            this.state = {
                films: [],
                isLoading: false
            }

        this._loadFilms = this._loadFilms.bind(this)
    }

    componentDidMount() {
        this._loadFilms()
    }

    _loadFilms() {
        this.setState({
            isLoading: true
        })
        getFilmsFromApiOrderedByLatest(this.page + 1).then(data => {
            this.page = data.page
            this.totalPages = data.total_pages
            this.setState({
                films: [...this.state.films, ...data.results],
                isLoading: false
            })
        })
    }

    _displayLoading() {
        return this.state.isLoading ? (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' color="#0000ff" />
            </View>
        ) : null
    }

    render() {
        return (
            <View style={styles.main_container}>
                <FilmList
                    films={this.state.films}
                    navigation={this.props.navigation}
                    loadFilms={this._loadFilms}
                    page={this.page}
                    totalPages={this.totalPages}
                    searchList={true}
                    showFilmDetails={true}
                />
                {this._displayLoading()}
            </View>
        )
    }


}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default News;