import {
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLegend,
  VictoryAnimation,
  VictoryLabel,
} from "victory-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { auth, db } from "../database/firebaseDB";
import { useNavigation } from "@react-navigation/core";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ListItem, Badge, Button } from "react-native-elements";
const Tab = createBottomTabNavigator();
const { height } = Dimensions.get("screen");
const userid = db.collection("Incoming-out");
function BottomTap() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Total" component={TotalScreen} />
    </Tab.Navigator>
  );
}
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const HomeScreen = ({ isLoding }) => {
  const [loading, setLoading] = useState(false);
  const [allUser, setallUser] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [Chartin, setChartin] = useState([]);
  const [Chartout, setChartout] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Jan");
  const navigation = useNavigation();
  function getDatafromdb(eiei) {
    userid
      .where("uid", "==", eiei)
      .get()
      .then((querySnapshot) => {
        const item = [];
        querySnapshot.forEach((doc) => {
          item.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setallUser(item);
      });
    userid
      .where("uid", "==", eiei)
      .where("inoutcome", "==", 0)
      .get()
      .then((querySnapshot) => {
        let Chartin = [];
        let month;
        querySnapshot.forEach((doc) => {
          const { forchart, money } = doc.data();
          if (Chartin.length < 1) {
            Chartin.push({ x: forchart, y: money });
            month = forchart;
            console.log("1");
          } else {
            console.log("2");
            if (month != forchart) {
              Chartin.push({ x: forchart, y: money });
              console.log("3");
            } else {
              let index = Chartin.findIndex((i) => i.x == month);
              Chartin[index].y += money;
              console.log("4");
            }
          }
        });
        setChartin(Chartin);
      });
    userid
      .where("uid", "==", eiei)
      .where("inoutcome", "==", 1)
      .get()
      .then((querySnapshot) => {
        const item = [];
        let Chartout = [];
        let month;
        querySnapshot.forEach((doc) => {
          const { forchart, money } = doc.data();
          if (Chartout.length < 1) {
            Chartout.push({ x: forchart, y: money });
            month = forchart;
            console.log("1");
          } else {
            console.log("2");
            if (month != forchart) {
              Chartout.push({ x: forchart, y: money });
              console.log("3");
            } else {
              let index = Chartout.findIndex((i) => i.x == month);
              Chartout[index].y += money;
              console.log("4");
            }
          }
      });
      setChartout(Chartout);
      });
    setLoading(false);
  }
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    getDatafromdb(uid);
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const uid = auth.currentUser?.uid;
    getDatafromdb(uid);
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }
  const renderPost = (item) => {
    console;
    let image;
    let inout = "";
    let colors = "";
    if (item.icon == "Food&Drink") {
      image = require("../images/salad.png");
    } else if (item.icon == "Shopping") {
      image = require("../images/shopping-cart.png");
    } else if (item.icon == "Bill") {
      image = require("../images/bill.png");
    } else if (item.icon == "Entertainment") {
      image = require("../images/popcorn.png");
    } else if (item.icon == "Passage") {
      image = require("../images/bus-school.png");
    } else if (item.icon == "Medic") {
      image = require("../images/first-aid-kit.png");
    } else if (item.icon == "Travel") {
      image = require("../images/passport.png");
    } else if (item.icon == "More") {
      image = require("../images/more.png");
    } else if (item.icon == "Salary") {
      image = require("../images/payroll.png");
    } else if (item.icon == "Bonus") {
      image = require("../images/money2.png");
    } else if (item.icon == "Gift") {
      image = require("../images/gift.png");
    }
    var t = new Date(item.time.seconds * 1000);
    var hours = t.getHours();
    var minutes = t.getMinutes();
    var newformat = t.getHours() >= 12 ? "PM" : "AM";
    var month = "";

    // Find current hour in AM-PM Format
    hours = hours % 12;
    // To display "0" as "12"
    if (item.inoutcome == 0) {
      inout = "รายรับ";
      colors = "#00C897";
    } else if (item.inoutcome == 1) {
      inout = "รายจ่าย";
      colors = "#F0A500";
    }
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var formatted =
      t.toString().split(" ")[0] +
      ", " +
      ("0" + t.getDate()).slice(-2) +
      "/" +
      ("0" + (t.getMonth() + 1)).slice(-2) +
      "/" +
      t.getFullYear() +
      " - " +
      ("0" + t.getHours()).slice(-2) +
      ":" +
      ("0" + t.getMinutes()).slice(-2) +
      " " +
      newformat;
    return (
      <TouchableOpacity
        style={styles.listitem}
        onPress={() => {
          navigation.navigate("Detail", {
            docKey: item.key,
            icon: item.icon,
            money: item.money,
            fdetail: item.fdetail,
            forchart: item.forchart,
            inoutcome: item.inoutcome,
          });
        }}
      >
        <Image style={{ width: 30, height: 30 }} source={image}></Image>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ marginLeft: 7 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.name}>{item.icon}</Text>
                <Text style={{ color: colors, fontSize: 11, marginLeft: 5 }}>
                  {inout}
                </Text>
              </View>
              <Text style={styles.timestamp}>{formatted}</Text>
            </View>
            <View style={{ marginRight: 7, flexDirection: "row" }}>
              <Text style={{ color: colors }}>{item.money} ฿ </Text>
              <Icon
                name="angle-right"
                size={20}
                color="black"
                style={{ marginLeft: 15 }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  console.log("---");
  const onChangeSizeChange = (contentWidh, conteHeight) => {};
  const Chart = () => {
    return (
      <VictoryChart
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        width={350}
      >
        <VictoryGroup offset={25}>
          <VictoryBar
            cornerRadius={{ top: 10 }}
            alignment="end"
            data={Chartout}
            barWidth={20}
            width={20}
            style={{
              data: {
                fill: "orange",
              },
            }}
          />
          <VictoryBar
            cornerRadius={{ top: 10 }}
            barWidth={20}
            alignment="end"
            data={Chartin}
            style={{
              data: {
                fill: "#00C897",
              },
            }}
          />
        </VictoryGroup>
        <VictoryLegend
          x={Dimensions.get("screen").width / 2 - 70}
          orientation="horizontal"
          gutter={10}
          data={[
            {
              name: "รายรับ",
              symbol: {
                fill: "#00C897",
              },
            },
            {
              name: "รายจ่าย",
              symbol: {
                fill: "orange",
              },
            },
          ]}
        />
      </VictoryChart>
    );
  };
  let searcString = selectedValue;
  const searchData = allUser.filter((task) =>
    task.forchart.includes(searcString)
  );
  return (
    <View style={styles.container}>
      {Chart()}
      {console.log(Chartout)}
      <Picker
        selectedValue={selectedValue}
        style={styles.picky}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Jan" value="Jan" />
        <Picker.Item label="Feb" value="Feb" />
        <Picker.Item label="Mar" value="Mar" />
        <Picker.Item label="Apr" value="Apr" />
        <Picker.Item label="May" value="May" />
        <Picker.Item label="June" value="Jun" />
        <Picker.Item label="Jul" value="Jul" />
        <Picker.Item label="Aug" value="Aug" />
        <Picker.Item label="Sep" value="Sep" />
        <Picker.Item label="Oct" value="Oct" />
        <Picker.Item label="Nov" value="Nov" />
        <Picker.Item label="Dec" value="Dec" />
      </Picker>
      <FlatList
        data={searchData}
        renderItem={({ item }) => renderPost(item)}
        keyExtractor={(item, index) => {
          return item.key;
        }}
        showsVerticalScrollIndicator={false}
        style={{ width: "95%", marginHorizontal: 16, marginBottom: "20%" }}
        onContentSizeChange={onChangeSizeChange}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <TouchableOpacity
        style={styles.btbutton}
        onPress={() => {
          navigation.navigate("Menu");
        }}
      >
        <Image
          style={styles.tinyLogo}
          source={require("../images/plus.png")}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFFFFD",
    justifyContent: "center",
    alignItems: "center",
  },
  topcorner: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: "flex-end",
    marginTop: -5,
    position: "absolute", // add if dont work with above
  },
  tinyLogo: {
    width: 40,
    height: 40,
    marginTop: 3.8,
  },
  btbutton: {
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    width: 50,
    position: "absolute",
    bottom: 90,
    right: 20,
    height: 50,
    backgroundColor: "#65C18C",
    borderRadius: 100,
    elevation: 5,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  listitem: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  picky: {
    height: 50,
    width: 150,
    borderColor: "green",
  },
});
