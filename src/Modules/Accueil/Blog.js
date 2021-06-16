import React, { Component } from "react";
import { View, StyleSheet, FlatList, Text, Button } from "react-native";
import * as rssParser from "react-native-rss-parser";

import BlogItems from "_Components/BlogComponents/BlogItems";
import textStyles from "_styles/textStyles";

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], isFetching: true };
    this.articles = [];
    this.page = 1;
  }

  componentDidMount() {
    this._fetchArticles(this.page);
  }

  _fetchArticles = async (page) => {
    this.setState({ isFetching: true });
    const response = await fetch(
      "https://le-m-verbatem.fr/wp-json/wp/v2/posts/?page=" + page
    );
    const json = await response.json();
    console.log(json[0].id);
    this.setState({
      articles: this.state.articles.concat(json),
      isFetching: false,
    });
  };

  _refreshList() {
    console.log("Refresh");
  }

  _onReachEnd() {
    console.log("End reached");
    this.page = this.page + 1;
    this._fetchArticles(this.page);
  }

  render() {
    console.log("****************** BLOG ******************");
    return (
      <View style={styles.maincontainer}>
        <View style={styles.listView}>
          <Text style={[textStyles.h3, styles.text]}>
            Retrouvez ici les articles rédigés par les associations de l'EM
            Lyon.
          </Text>

          <FlatList
            refreshing={this.state.isFetching}
            data={this.state.articles}
            onRefresh={() => {
              this._refreshList();
            }}
            renderItem={({ item }) => <BlogItems blog={item} />}
            onEndReachedThreshold={2}
            onEndReached={() => {
              this._onReachEnd();
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  listView: {
    flex: 1,
  },
  text: {
    marginBottom: 5,
  },
});
