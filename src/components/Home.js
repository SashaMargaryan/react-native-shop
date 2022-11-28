import React, {useState, useEffect} from 'react';
import { StyleSheet, 
        Text,
        View,
        ScrollView,
        StatusBar,
        Image,
        TouchableOpacity,
        TextInput,
        FlatList ,
        SafeAreaView,
        VirtualizedList, 
        Button,
        LogBox
        } from 'react-native';
import { COLOURS, Categories, product } from "../database/items";
import Material from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";

const Home = ({navigation}) => {

    const [currentSelected, setCurrentSelected] = useState([0]);
    const [searche, setSearche] = useState('');
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
  

    //Push Details
    const renderItems = (data, index) => {
        return (
            <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                style={{
                    width: "100%",
                    height: 180,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onPress={() => navigation.push("details", {
                    name: data.name,
                    price: data.price,
                    image: data.image,
                    size: data.size,
                    crust: data.crust,
                    delivery: data.delivery,
                    ingredients: data.ingredients,
                    isTopOfTheWeek: data.isTopOfTheWeek,
                    navigation: navigation
                })}
            >
                <View
                    style={{
                        width: "90%",
                        height: 160,
                        backgroundColor: COLOURS.white,
                        borderRadius: 20,
                        elevation: 4,
                        position: "relative",
                        padding: 15,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <View 
                        style={{
                            marginBottom: 50
                        }}
                    >
                        {/* 41 */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                display: data.isTopOfTheWeek ? "flex" : "none"
                            }}
                        >
                            <FontAwesome 
                                name="crown"
                                style={{
                                    fontSize: 10,
                                    color: COLOURS.accent
                                }} 
                            />
                            <Text style={{
                                fontSize: 12,
                                color: COLOURS.black,
                                opacity: 0.8,
                                marginLeft: 5
                            }}
                            >
                                top of the week
                            </Text> 
                        </View>
                        <Text
                            style={{
                                fontSize: 22,
                                color: COLOURS.black,
                                fontWeight: "bold",
                                paddingTop: 10,
                            }}
                        >
                            {data.name}
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: COLOURS.black,
                                opacity: 0.5
                            }} 
                        >
                            {data.weight}
                        </Text>
                    </View>
                    <View
                        style={{
                            width: 150,
                            height: 150,
                            marginRight: -45
                        }}
                    >
                        <Image
                            source={data.image}
                            style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "contain"
                            }} 
                        />
                    </View>
                    <View 
                        style={{
                            position: "absolute",
                            bottom: 0,
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <View
                            style={{
                                width: 85,
                                height: 50,
                                backgroundColor: COLOURS.accent,
                                borderTopRightRadius: 20,
                                borderBottomLeftRadius: 20
                            }}   
                        >
                            <Entypo 
                                name="plus"
                                style={{
                                    fontSize: 18,
                                    color: COLOURS.black
                                }} 
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: 20
                            }}
                        >
                            <AntDesign
                                name='star'
                                style={{
                                    fontSize: 12,
                                    color: COLOURS.black,
                                    paddingRight: 5
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: COLOURS.black,
                                    fontWeight: 'bold'
                                }}
                            >
                                {data.rating}
                            </Text>       
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    //Categories
    const renderCategories = ({item, index}) => {
        return (
            <TouchableOpacity 
                activeOpacity={0.9}
                onPress={() => setCurrentSelected(index)}
            >
                <View 
                    style={{
                        width:120,
                        height: 180,
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        backgroundColor: 
                            currentSelected == index ? COLOURS.accent : COLOURS.white,
                        borderRadius: 20,
                        margin: 10,
                        elevation: 5
                    }}
                >
                    <View
                        style={{
                            width: 60,
                            height: 60,
                            marginTop: 0
                        }}
                    >
                        <Image 
                            source={item.image}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'center',
                                
                            }}
                        />
                    </View>
                        <Text
                            style={{
                                fontSize: 16,
                                color: COLOURS.black,
                                fontWeight: "600"
                            }}
                        >
                            {item.name}
                        </Text>
                    <View
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 100,
                            backgroundColor:
                                currentSelected == index ? COLOURS.white : COLOURS.accentRed,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        >
                        <FontAwesome
                            name="angle-right"
                            style={{
                                fontSize: 12,
                                color: currentSelected == index ? COLOURS.black : COLOURS.white
                            }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        setMasterDataSource(product)
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
      }, []);
    //Search data
    const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
        // Inserted text is not blank
        // Filter the masterDataSource and update FilteredDataSource
        const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
    });
        setFilteredDataSource(newData);
        setSearch(text);
    } else {
        setFilteredDataSource();
         setSearch();
        }
    };
    //Flat List Item
    const ItemView = ({ item, index }) => {
   
        return (
            <TouchableOpacity 
                style={styles.searchFlatListCont} 
                onPress={() => getItem(item)}
                key={index} 
                activeOpacity={0.9}
                horizontal={false} 
                >
                <Text >
                    {item.name.toUpperCase()}
                </Text>
                <Image source={item.image} style={styles.searchFlatListImage} />
            </TouchableOpacity>
        );
    };
     
    const getItem = (item) => {
        
        navigation.push("details", {
            name: item.name,
            price: item.price,
            image: item.image,
            size: item.size,
            crust: item.crust,
            delivery: item.delivery,
            ingredients: item.ingredients,
            isTopOfTheWeek: item.isTopOfTheWeek,
            navigation: navigation
        });
        setFilteredDataSource();
         setSearch();
    };

  return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.contBackg} >

                <StatusBar backgroundColor={COLOURS.white} barStyle={'dark-content'} />
                <Image
                    source={require('../database/images/background.png')}
                    style={styles.imageBackg}    
                />

                <View style={styles.contProfile}>
                    <TouchableOpacity
                        style={{width: 40, height:40}}
                    >
                        <Image 
                            source={require('../database/images/profile.jpg')}
                            style={styles.imageProfile} 
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        {/* <Material 
                            name='segment'
                            style={styles.iconMaterial}
                            onPress={() => navigation.push('login')} 
                        /> */}
                        <Button 
                            title='Log out'
                            onPress={() => navigation.push('login')} 
                            color={'#333'}
                            
                        />
                    </TouchableOpacity>
                </View>

                <View style={{padding: 20}}>
                    <Text
                        style={styles.food}
                    >
                        Food
                    </Text>
                    <Text style={styles.delivery}>
                        Delivery
                    </Text>
                </View>
                {/*Search */}
                <SafeAreaView>
                <TouchableOpacity style={styles.iconSerchCont}>
                    <Ionicons name="search" style={styles.iconSearch} />
                    <TextInput
                        placeholder='Search...'
                        style={styles.inputText}
                        onChangeText={(text) => searchFilterFunction(text)}
                        value={search}
                        underlineColorAndroid="transparent"
                    />
                    {/* <Search results /> */}
                </TouchableOpacity>
                <SafeAreaView style={styles.searchFlatList}>
                    <FlatList
                        data={ filteredDataSource }
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={ItemView}
                        scrollEnabled={true} 
                        showsHorizontalScrollIndicator={false} 
                    />
                </SafeAreaView>
                </SafeAreaView>

                {/* Categories */}
                <Text style={styles.textCategories}>
                    Categories
                </Text>
                <FlatList
                    horizontal={true}
                    data={Categories}
                    renderItem={renderCategories}
                    showsHorizontalScrollIndicator={false}   
                />
                <Text style={styles.textPopular}>
                    Popular
                </Text>
                {Categories[currentSelected].items.map(renderItems)}
                <TouchableOpacity
                    style={{
                        margin: 30,
                        justifyContent: 'center',
                        alignItems: "center",
                        opacity: 0.5
                    }} 
                >
                </TouchableOpacity>
            </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: COLOURS.white
    },
    contBackg: {
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
        position: "relative"
    },
    imageBackg: {
        position: "absolute",
        top: 0,
        left: -100
    },
    contProfile: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20
    },
    imageProfile: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        borderRadius: 500           
    },
    iconMaterial: {
        fontSize: 28,
        color: COLOURS.black
    },
    food: {
        fontSize: 16,
        color: COLOURS.black,
        opacity: 0.5,
        fontWeight: "400"
    },
    delivery: {
        fontSize: 40,
        color: COLOURS.black,
        fontWeight: "600",
        letterSpacing: 3
    },
    iconSerchCont: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    iconSearch: {
        fontSize: 20,
        color: COLOURS.black,
        opacity: 0.8
    },
    inputText: {
        color:COLOURS.black,
        fontSize: 16,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: COLOURS.black + 20,
        width: "90%",
        marginLeft: 10,
        letterSpacing: 1
    },
    textCategories: {
        paddingTop: 20,
        paddingHorizontal: 20,
        fontSize: 18,
        fontWeight: "700",
        color: COLOURS.black,
        letterSpacing: 1
    },
    textPopular: {
        paddingTop: 20,
        paddingHorizontal: 20,
        fontSize: 18,
        fontWeight: '700',
        color: COLOURS.black
    },
    searchFlatList: {
         // flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    searchFlatListCont: {
        flex: 1,
        width: 150,
        height: 150,
        marginTop: 2,
        justifyContent: 'center',
        alignItems: "center",
        elevation: 4,
        // position: "absolute",
        padding: 15,
        backgroundColor: "#FAEBD7",
        borderRadius: 20,
        elevation: 4,
    },
    searchFlatListImage: {
        width: "100%",
        height: "100%",
        // position: "absolute"
    }
  });

export default Home;