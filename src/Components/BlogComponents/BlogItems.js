import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import CacheImage from "_Components/CacheImage";
import textStyles from "_styles/textStyles";

var icon;
var iconFB;

class BlogItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      author: "",
      title: "",
      description: "",
    };
  }

  componentDidMount() {
    console.log("****************** BLOGITEMS ******************");
    this._adaptText();
    this._getAuthorData(this.props.blog._links.author[0].href);
  }

  //Fonction permettant de choisir le logo à afficher dans le coin en haut à droite. Les assos sont à ajouter progressivement. En raison de l'architecture de la donnée du site, on ne peut que récupérer un numéro. Il faut donc ajouter les associations manuellement au fur et à mesure.
  _chooseAssoIcon(name) {
    var authorIcon = "";
    console.log("Switch Author Name");
    console.log(name);

    switch (name) {
      case 18:
        authorIcon = "PNP.png";
        console.log("PNP Selected");
        return authorIcon;
        break;

      case 22:
        authorIcon = "Racing.png";
        return authorIcon;
        break;

      case 12:
        authorIcon = "Transaction.png";
        return authorIcon;
        break;

      case 13:
        authorIcon = "Noise.png";
        return authorIcon;
        break;

      default:
        authorIcon = "Verbat'em.png";
        return authorIcon;
        break;
    }
  }

  _getAuthorData = async (link) => {
    const response = await fetch(link);
    const json = await response.json();
    this.setState({ author: json.name });
  };

  _adaptText() {
    this.setState({
      title: this.props.blog.title.rendered
        .replace(/&#8211;/g, "-")
        .replace(/&#8217;/g, "'"),
      description: this.props.blog.excerpt.rendered
        .replace(/&#8211;/g, "-")
        .replace(/&#8217;/g, "'")
        .replace(/<[^>]*>?/gm, ""),
    });
  }

  render() {
    var blog = this.props.blog;
    const imgURL = blog.jetpack_featured_media_url;
    iconFB = this._chooseAssoIcon(blog.author);

    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("WebView", {
            link: blog.link,
          })
        }
        style={{ flex: 1 }}
      >
        <View style={styles.main_container}>
          <Image style={styles.imageView} source={{ uri: imgURL }} />
          <CacheImage
            style={styles.assoIcon}
            firebaseFolder={"Logo-asso"}
            resizeMode={"cover"}
            firebaseFileName={iconFB}
          />
          <View style={styles.textView}>
            <Text style={[textStyles.h2, { fontSize: 17 }]} numberOfLines={1}>
              {this.state.title}
            </Text>
            <Text style={[textStyles.h5, styles.authorName]} numberOfLines={1}>
              {this.state.author}
            </Text>
            <Text style={[textStyles.h4, { fontSize: 14 }]} numberOfLines={3}>
              {this.state.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 235,
    flexDirection: "column",
    flex: 1,
    borderRadius: 4,
    marginVertical: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  imageView: {
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "grey",
    flex: 2.5,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginHorizontal: 2.5,
  },
  textView: {
    flexDirection: "column",
    flex: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    paddingBottom: 5,
    justifyContent: "space-between",
  },
  authorName: {
    color: "grey",
  },
  assoIcon: {
    height: 40,
    width: 40,
    position: "absolute",
    top: 5,
    right: 8,
  },
});

export default withNavigation(BlogItems);
