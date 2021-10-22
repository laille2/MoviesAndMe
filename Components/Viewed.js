import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import FilmList from './FilmList'
import Avatar from './Avatar'

class Viewed extends React.Component {

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.avatar_container}>
          <Avatar />
        </View>
        <Text style={styles.title}>Films déjà vus</Text>
        {this.props.viewedFilms.length > 0 ? (
          <FilmList
            films={this.props.viewedFilms}
            navigation={this.props.navigation}
            favoriteList={true}
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
  title: {
    textAlign: 'center',
    fontSize: 28,
    margin: 5,
    fontWeight: 'bold'
  },
  avatar_container: {
    alignItems: 'center'
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