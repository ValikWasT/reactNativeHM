import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
export const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params.readyState]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Text style={styles.imageTitle}>{item.title}</Text>
            <View style={styles.description}>
              <View style={styles.comments}>
                <Feather name="message-circle" size={18} color="#BDBDBD" />
                <Text style={styles.commentsNumber}>0</Text>
              </View>
              <View style={styles.location}>
                <Feather
                  style={styles.locationIcon}
                  name="map-pin"
                  size={18}
                  color="#BDBDBD"
                />
                <Text style={styles.locationText}>{item.locationTitle}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  post: {
    marginTop: 32,
    width: "100%",
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  imageTitle: {
    marginTop: 8,
    color: "#212121",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
  },
  description: {
    marginTop: 11,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comments: {
    flexDirection: "row",
  },
  commentsNumber: {
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
  },
  location: {
    flexDirection: "row",
  },
  locationText: {
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
});
