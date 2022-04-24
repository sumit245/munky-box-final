import React, { useEffect, useState } from "react";
import DeliveryOptions from "./DeliveryOptions";
import SortAndFilter from "./SortAndFilter";
import { styles, width } from "../../styles/HomeStyles";
import { View } from "react-native";
import FavoritePicker from "./FavoritePicker";
import { Searchbar } from "react-native-paper";
import SearchComponent from "./SearchComponent";

export default function HeaderComponent({
  favCount,
  applyfilter,
  clearfilter,
  searchTerm,
  filterCount,
}) {
  const [isSearching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const setSearch = (state) => {
    setSearching(state);
  };
  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <View style={!isSearching ? styles.header : styles.headerWithSearch}>
      {!isSearching ? (
        <DeliveryOptions />
      ) : (
        <Searchbar
          placeholder="Search..."
          style={{
            width: width - 100,
            backgroundColor: "#ededed",
            elevation: 0,
          }}
          onChangeText={onChangeSearch}
          value={searchQuery}
          iconColor="#000"
          selectionColor="#ff6600"
          clearIcon={() => null}
          onSubmitEditing={() => searchTerm(searchQuery)}
        />
      )}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <SearchComponent setSearch={setSearch} />
        <FavoritePicker favCount={favCount} />
        <SortAndFilter
          applyFilter={applyfilter}
          filterCount={filterCount}
          clearfilter={clearfilter}
        />
      </View>
    </View>
  );
}
