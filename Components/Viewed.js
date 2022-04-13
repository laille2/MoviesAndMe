import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import FilmList from './FilmList'

class Viewed extends React.Component {

  render() {
    return (
      <View style={styles.main_container}>
        {this.props.viewedFilms.length > 0 ? (
          <FilmList
            films={this.props.viewedFilms}
            navigation={this.props.navigation}
            searchList={false}
            showFilmDetails={false}
          />) : (
          <Text style={styles.text}>Aucun film vu</Text>
        )}
      </View>

    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  text: {
    flex: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20
  }
})

const mapStateToProps = (state) => {
  return {
    viewedFilms: state.toggleViewed.viewedFilms
  };
}
export default connect(mapStateToProps)(Viewed)