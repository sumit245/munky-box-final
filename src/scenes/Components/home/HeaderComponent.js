import React, { useEffect, useState } from "react";
import DeliveryOptions from "./DeliveryOptions";
import SortAndFilter from "./SortAndFilter";
import { styles, width } from "../../styles/HomeStyles";
import { View } from "react-native";
import FavoritePicker from "./FavoritePicker";
import { Searchbar } from "react-native-paper";
import SearchComponent from "./SearchComponent";
import Icon from "react-native-vector-icons/Ionicons";
export default function HeaderComponent({
  favCount,
  applyfilter,
  clearfilter,
  searchTerm,
  filterCount,
  clearSearch,
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
          placeholder="Search by city"
          style={{
            width: width - 100,
            backgroundColor: "#ededed",
            elevation: 0,
          }}
          onChangeText={onChangeSearch}
          value={searchQuery}
          iconColor="#226cff"
          clearIcon={()=>null}
          //clearIcon={() => <Icon name="close" size={16} color="#000" />}
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
