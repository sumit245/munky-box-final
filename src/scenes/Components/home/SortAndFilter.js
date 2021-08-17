import React, { Component } from 'react';
import { View, TouchableOpacity, Modal, StyleSheet, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper'
import { Slider } from 'react-native-elements'
const { width, height } = Dimensions.get("window")
export default class SortAndFilter extends Component {
    state = {
        sortVisible: false,
        isEnabled: false,
        value: 0
    };

    setsortVisible = (visible) => {
        this.setState({ sortVisible: visible });
    }
    setEnable = () => {
        this.setState(prevState => ({
            isEnabled: !prevState.check
        }));
    }
    toggleRight = (filter) => {
        this.setState({ filter: filter })
    }
    setChecked = (meal_type) => {
        this.setState({ meal_type: meal_type })
    }
    render() {
        const { sortVisible, isEnabled, filter, meal_type, value } = this.state;
        return (
            <>
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={sortVisible}
                        onRequestClose={() => {
                            this.setsortVisible(!sortVisible);
                        }}
                    >
                        <View style={styles.sortView}>
                            <View style={styles.modalView}>
                                <View style={styles.modalHeader}>
                                    <Text style={{ fontSize: 18, color: "#444" }} >Sort and Filters</Text>
                                    <TouchableOpacity
                                        style={styles.buttonClose}
                                        onPress={() => this.setsortVisible(!sortVisible)}
                                    >
                                        <Icon name="close-outline" color="#888" size={22} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.body}>
                                    <View style={styles.leftView} >
                                        <TouchableOpacity style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1 }} onPress={() => this.toggleRight("type_filter")} >
                                            <Text style={styles.modalText}>Meal Type</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1 }} onPress={() => this.toggleRight("rating_filter")} >
                                            <Text style={styles.modalText}>Rating</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1 }} onPress={() => this.toggleRight("location_filter")} >
                                            <Text style={styles.modalText}>Nearby Restaurant</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.toggleRight("more_filter")} >
                                            <Text style={styles.modalText}>More Filters</Text>
                                        </TouchableOpacity>

                                    </View>
                                    <View style={styles.rightView}>
                                        {
                                            filter === "type_filter" ? (
                                                <View style={{ justifyContent: 'flex-start' }} >
                                                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                                        <RadioButton
                                                            value="veg"
                                                            status={meal_type === 'veg' ? 'checked' : 'unchecked'}
                                                            onPress={() => this.setChecked('veg')}
                                                        />
                                                        <Text>Veg</Text>
                                                    </View>
                                                    <View style={{ flexDirection: "row", alignItems: 'baseline' }}>
                                                        <RadioButton
                                                            value="non-veg"
                                                            status={meal_type === 'non-veg' ? 'checked' : 'unchecked'}
                                                            onPress={() => this.setChecked('non-veg')}
                                                        />
                                                        <Text>Non-Veg</Text>

                                                    </View>

                                                </View>

                                            ) : filter === "rating_filter" ? (
                                                <>
                                                    <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 10 }} >
                                                        <Slider
                                                            value={value}
                                                            onValueChange={(value) => this.setState({ value })}
                                                            maximumValue={5}
                                                            style={{ flexDirection: 'column' }}
                                                            minimumValue={0}
                                                            orientation="vertical"
                                                            step={1}
                                                            trackStyle={{ height: 200, backgroundColor: 'transparent' }}
                                                            thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                                                            thumbProps={{
                                                                children: (
                                                                    <Icon
                                                                        name="star-outline"
                                                                        size={20}
                                                                        containerStyle={{ bottom: 0, right: 20 }}
                                                                        color="#f50"
                                                                    />
                                                                ),
                                                            }}
                                                            minimumTrackTintColor="#ff4466"
                                                            maximumTrackTintColor="#cccccc"
                                                            animationType="spring"

                                                        />
                                                        <Text>Rating: {this.state.value}</Text>
                                                    </View>


                                                </>

                                            ) : filter === "location_filter" ? (
                                                <Text>This is a location filter</Text>

                                            ) : filter === "more_filter" ? (
                                                <Text>More Filters Coming Soon...</Text>

                                            ) : null
                                        }
                                    </View>
                                </View>
                            </View>
                            <View style={styles.bottomView}>
                                <TouchableOpacity style={styles.buttons} >
                                    <Text style={{ fontSize: 22, color: "#cc4666" }} >Clear All</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.buttons, { backgroundColor: "#ddd" }]} >
                                    <Text style={{ fontSize: 22, color: "#46cc66" }}>Apply</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>
                </View>

                <View>
                    <TouchableOpacity onPress={() => this.setsortVisible(true)}>
                        <Icon name="ios-options-outline" size={30} />
                    </TouchableOpacity>
                </View>
            </>
        )
    }
}
const styles = StyleSheet.create({
    modalHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    sortView: {
        flex: 1,
        position: 'absolute',
        bottom: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: width - 4,
        height: 400,
        marginHorizontal: 2,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        paddingHorizontal: 10,
        fontWeight: 'bold',
        color: '#979797',
        paddingVertical: 10,
        textAlign: "justify",
    },
    bottomView: {
        position: 'absolute',
        bottom: 2,
        width: width - 8,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        width: 140,
        justifyContent: 'center'
    },
    leftView: {
        alignSelf: 'flex-start',
        width: width / 3,
        height: 'auto',
        borderRightWidth: 1,
        borderColor: "#ccc",
        height: 300
    },
    rightView: {
        justifyContent: 'space-around',
        width: 2 * width / 3,
        position: 'absolute',
        left: width / 3
    }
});
