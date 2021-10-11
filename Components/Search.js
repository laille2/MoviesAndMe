import React from "react";
import { StyleSheet, View, Button, TextInput, ActivityIndicator, Text } from "react-native";
import { connect } from "react-redux";
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";
import FilmList from "./FilmList";


class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchedText = "",
            this.page = 0,
            this.totalPages = 0,
            this.state = {
                films: [],
                isLoading: false,
                isEmpty: false
            }

        this._loadFilms=this._loadFilms.bind(this)
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: [],
        }, () => {
            this._loadFilms()
        })
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({
                isLoading: true,
                isEmpty: false
            })
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: [...this.state.films, ...data.results],
                    isLoading: false
                })
                this.setState({ isEmpty: !(this.state.films.length > 0)})
            })
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' color="#0000ff" />
                </View>
            )
        } else {
            return (this.state.isEmpty ? (
                <View style={styles.loading_container}>
                    <Text> Aucun film trouvé </Text>
                </View>
            ) : (
                null
            ))
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate('Film', { idFilm: idFilm });
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._searchFilms()}
                    style={styles.textinput}
                    placeholder="Titre du film" />
                <Button title="Rechercher" onPress={() => this._searchFilms()} />
                {/* <FlatList
                    data={this.state.films}
                    extraData={this.props.favoritesFilm}
                    keyExtractor={item => item.id.toString()}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) {
                            this._loadFilms()
                        }
                    }}
                    renderItem={({ item }) => <FilmItem
                        film={item}
                        displayDetailForFilm={this._displayDetailForFilm}
                        isFavorite={this.props.favoritesFilm !== undefined && this.props.favoritesFilm.findIndex(object => object.id === item.id) !== -1} />}
                /> */}
                <FilmList
                    films={this.state.films} 
                    navigation={this.props.navigation} 
                    loadFilms={this._loadFilms} 
                    page={this.page}
                    totalPages={this.totalPages} 
                    favoriteList={false}
                />
                {this._displayLoading()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
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
});

/* const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    };
}
export default connect(mapStateToProps)(Search); */

export default Search