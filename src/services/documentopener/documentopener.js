import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";

const dataSource = [
  {
    id: "1",
    src: "https://images.unsplash.com/flagged/photo-1558963675-94dc9c4a66a9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=333&q=80",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1600132806608-231446b2e7af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1533135044283-42dc2b70abfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1547316020-f008a0a25931?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  },
];

const { width, height } = Dimensions.get("window");
export const ModalOpener = ({ modalVisible }) => {
  const [papers, setPapers] = useState([]);
  const fetchPapers = async (id) => {
    const response = await axios.get(
      "https://munkybox-admin.herokuapp.com/api/newrest/" + id
    );
    const restaurant = await response.data;
    const paper = restaurant.papers;
    setPapers(paper);
  };
  useEffect(() => {
    let mount = true;
    if (mount) {
      fetchPapers("617f7588cac87319dce8c5df");
    }
    return () => {
      mount = false;
    };
  }, []);
  return (
    <>
      <FlatList
        contentContainerStyle={{ marginHorizontal: 4 }}
        ItemSeparatorComponent={() => <View style={{ width: 0.1 * width }} />}
        data={papers}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              margin: 1,
            }}
          >
            <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
          </View>
        )}
        horizontal
        keyExtractor={(item, index) => index}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: "98%",
    width: 0.98 * width,
  },
});
