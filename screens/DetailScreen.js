import {
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
  Switch,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useModal } from "@idiosync/react-native-modal";
import { Button } from "react-native-elements";
import CurrencyInput from "react-native-currency-input";
import { auth, db , storage} from "../database/firebaseDB";
const userid = db.collection("Incoming-out");

const DetailScreen = ({ route }) => {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [forChart, setForChart] = useState("");
  const [detail, setDetail] = useState("");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("วันที่");
  const [baht, setBaht] = React.useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [ModalShow, setModalShow] = useState(false);
  const [imagePath, setImagePath] = useState(require("../images/plus.png"));
  const [icon, setIcon] = useState("");
  const [chooseDay, setChooseDay] = useState(false);
  const [chooseMoney, setChooseMoney] = useState(0);
  const [inoutcome, setInoutcome] = useState(0);
  const [state, setState] = useState([
    {
      fdetail: "",
      fimage: "",
      forChart: "",
      icon: "",
      inoutcome: "",
      money: 0,
      uid: "",
      isLoading: true,
    },
  ]);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");

    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fTime = tempDate.getHours() + "." + tempDate.getMinutes();
    setChooseDay(true)
    setText(fDate + "\n" + fTime + " น.");
    console.log(fDate + " (" + fTime + ")");
    console.log(date);
    if (tempDate.getMonth() + 1 == 1) {
      setForChart("Jan");
    } else if (tempDate.getMonth() + 1 == 2) {
      setForChart("Feb");
    } else if (tempDate.getMonth() + 1 == 3) {
      setForChart("Mar");
    } else if (tempDate.getMonth() + 1 == 4) {
      setForChart("Apr");
    } else if (tempDate.getMonth() + 1 == 5) {
      setForChart("May");
    } else if (tempDate.getMonth() + 1 == 6) {
      setForChart("Jun");
    } else if (tempDate.getMonth() + 1 == 7) {
      setForChart("Jul");
    } else if (tempDate.getMonth() + 1 == 8) {
      setForChart("Aug");
    } else if (tempDate.getMonth() + 1 == 9) {
      setForChart("Sep");
    } else if (tempDate.getMonth() + 1 == 10) {
      setForChart("Oct");
    } else if (tempDate.getMonth() + 1 == 11) {
      setForChart("Nov");
    } else if (tempDate.getMonth() + 1 == 12) {
      setForChart("Dec");
    }
  };
  function getDatafromdb() {
    const dbRef = userid.doc(route.params.docKey);
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        setState({
          key: res.id,
          fimage: user.fimage,
          fdetail: user.fdetail,
          forchart: user.forchart,
          icon: user.icon,
          inoutcome: user.inoutcome,
          money: user.money,
          uid: user.uid,
          isLoading: false,
        });
        setBaht(route.params.money);
        setDetail(route.params.fdetail);
        if (route.params.icon == "Food&Drink") {
          setImagePath(require("../images/salad.png"));
          setIcon("Food&Drink");
          setInoutcome(1);
        }
        if (route.params.icon == "Shopping") {
          setImagePath(require("../images/shopping-cart.png"));
          setIcon("Shopping");
          setInoutcome(1);
        }
        if (route.params.icon == "Bill") {
          setImagePath(require("../images/bill.png"));
          setIcon("Bill");
          setInoutcome(1);
        }
        if (route.params.icon == "Entertainment") {
          setImagePath(require("../images/popcorn.png"));
          setIcon("Entertainment");
          setInoutcome(1);
        }
        if (route.params.icon == "Passage") {
          setImagePath(require("../images/bus-school.png"));
          setIcon("Passage");
          setInoutcome(1);
        }
        if (route.params.icon == "Medic") {
          setImagePath(require("../images/first-aid-kit.png"));
          setIcon("Medic");
          setInoutcome(1);
        }
        if (route.params.icon == "Travel") {
          setImagePath(require("../images/passport.png"));
          setIcon("Travel");
          setInoutcome(1);
        }
        if (route.params.icon == "More") {
          setImagePath(require("../images/more.png"));
          setIcon("More");
          setInoutcome(1);
        }
        if (route.params.icon == "Salary") {
          setImagePath(require("../images/payroll.png"));
          setIcon("Salary");
          setInoutcome(0);
        }
        if (route.params.icon == "Bonus") {
          setImagePath(require("../images/money2.png"));
          setIcon("Bonus");
          setInoutcome(0);
        }
        if (route.params.icon == "Gift") {
          setImagePath(require("../images/gift.png"));
          setIcon("Gift");
          setInoutcome(0);
        }
      } else {
        console.log("Document doesn't exists");
      }
    });
  }
  useEffect(() => {
    getDatafromdb();
  }, []);
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const storeUpdate = () => {
    if (chooseDay == false) {
      Alert.alert("กรุณาเลือกวันที่");
    }
    else {
      const dbRef = userid.doc(route.params.docKey);
      dbRef
        .set({
          icon: icon,
          money: parseInt(baht),
          time: date,
          fdetail: detail,
          fimage: "dd",
          forchart: forChart,
          inoutcome: inoutcome,
          uid: auth.currentUser?.uid,
        })
        .then(navigation.navigate("Home"));
    }
  };
  const StoreDelete = () => {
    userid.doc(route.params.docKey).delete().then(navigation.navigate("Home"));
  };
  const openTwoButtonAlert = () => {
    Alert.alert(
      "Delete List",
      "Are you sure ?",
      [
        { text: "Yes", onPress: () => StoreDelete() },
        { text: "No", onPress: () => console.log("No") },
      ],
      {
        cancelable: true,
      }
    );
  };
  const renderMenu1 = () => {
    let images = "";
    return (
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.addmonButton}
            onPress={() => {
              setImagePath(require("../images/salad.png")),
                setModalShow(false),
                setIcon("Food&Drink");
              setInoutcome(1);
            }}
          >
            <Image
              style={styles.tinyLogo}
              source={require("../images/salad.png")}
            />
            <Text
              style={{
                marginTop: 8,
                width: 70,
                textAlign: "center",
                marginLeft: -10,
              }}
            >
              อาหาร เครื่องดื่ม
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addmonButton}
            onPress={() => {
              setImagePath(require("../images/shopping-cart.png")),
                setModalShow(false);
              setIcon("Shopping");
              setInoutcome(1);
            }}
          >
            <Image
              style={styles.tinyLogo}
              source={require("../images/shopping-cart.png")}
            />
            <Text
              style={{
                marginTop: 8,
                width: 70,
                textAlign: "center",
                marginLeft: -10,
              }}
            >
              ช้อปปิ้ง
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addmonButton}
            onPress={() => {
              setImagePath(require("../images/bill.png")), setModalShow(false);
              setIcon("Bill");
              setInoutcome(1);
            }}
          >
            <Image
              style={styles.tinyLogo}
              source={require("../images/bill.png")}
            />
            <Text
              style={{
                marginTop: 8,
                width: 70,
                textAlign: "center",
                marginLeft: -10,
              }}
            >
              บิล
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addmonButton}
            onPress={() => {
              setImagePath(require("../images/popcorn.png")),
                setModalShow(false);
              setIcon("Entertainment");
              setInoutcome(1);
            }}
          >
            <Image
              style={styles.tinyLogo}
              source={require("../images/popcorn.png")}
            />
            <Text
              style={{
                marginTop: 8,
                width: 70,
                textAlign: "center",
                marginLeft: -10,
              }}
            >
              บรรเทิง
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <TouchableOpacity
            style={styles.addmonButton}
            onPress={() => {
              setImagePath(require("../images/bus-school.png")),
                setModalShow(false);
              setIcon("Passage");
              setInoutcome(1);
            }}
          >
            <Image
              style={styles.tinyLogo}
              source={require("../images/bus-school.png")}
            />
            <Text
              style={{
                marginTop: 8,
                width: 70,
                textAlign: "center",
                marginLeft: -10,
              }}
            >
              ค่าเดินทาง
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addmonButton}
            onPress={() => {
              setImagePath(require("../images/first-aid-kit.png")),
                setModalShow(false);
              setIcon("Medic");
              setInoutcome(1);
            }}
          >
            <Image
              style={styles.tinyLogo}
              source={require("../images/first-aid-kit.png")}
            />
            <Text
              style={{
                marginTop: 8,
                width: 70,
                textAlign: "center",
                marginLeft: -10,
              }}
            >
              พยาบาล
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addmonButton}
            onPress={() => {
              setImagePath(require("../images/passport.png")),
                setModalShow(false);
              setIcon("Travel");
              setInoutcome(1);
            }}
          >
            <Image
              style={styles.tinyLogo}
              source={require("../images/passport.png")}
            />
            <Text
              style={{
                marginTop: 8,
                width: 70,
                textAlign: "center",
                marginLeft: -10,
              }}
            >
              ท่องเที่ยว
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addmonButton}
            onPress={() => {
              setImagePath(require("../images/more.png")), setModalShow(false);
              setIcon("More");
              setInoutcome(1);
            }}
          >
            <Image
              style={styles.tinyLogo}
              source={require("../images/more.png")}
            />
            <Text
              style={{
                marginTop: 8,
                width: 70,
                textAlign: "center",
                marginLeft: -10,
              }}
            >
              อื่นๆ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderMenu2 = () => {
    return (
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.addmonButton}
            onPress={() => {
              setImagePath(require("../images/payroll.png")),
                setModalShow(false);
              setIcon("Salary");
              setInoutcome(0);
            }}
          >
            <Image
              style={styles.tinyLogo}
              source={require("../images/payroll.png")}
            />
            <Text
              style={{
                marginTop: 8,
                width: 70,
                textAlign: "center",
                marginLeft: -10,
              }}
            >
              เงินเดือน
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addmonButton}
            onPress={() => {
              setImagePath(require("../images/money2.png")),
                setModalShow(false);
              setIcon("Bonus");
              setInoutcome(0);
            }}
          >
            <Image
              style={styles.tinyLogo}
              source={require("../images/money2.png")}
            />
            <Text
              style={{
                marginTop: 8,
                width: 70,
                textAlign: "center",
                marginLeft: -10,
              }}
            >
              เงินพิเศษ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addmonButton}
            onPress={() => {
              setImagePath(require("../images/gift.png")), setModalShow(false);
              setIcon("Gift");
              setInoutcome(0);
            }}
          >
            <Image
              style={styles.tinyLogo}
              source={require("../images/gift.png")}
            />
            <Text
              style={{
                marginTop: 8,
                width: 70,
                textAlign: "center",
                marginLeft: -10,
              }}
            >
              ของขวัญ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addmonButton} onPress={() => {}}>
            <Image
              style={styles.tinyLogo}
              source={require("../images/more.png")}
            />
            <Text
              style={{
                marginTop: 8,
                width: 70,
                textAlign: "center",
                marginLeft: -10,
              }}
            >
              อื่นๆ
            </Text>
          </TouchableOpacity> 
        </View>
      </View>
    );
  };
  const view = <View style={{ flex: 1, width: "100%" }} />;
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.addmonContainer}>
          <View style={{ alignItems: "center", marginTop: 5 }}>
            <Text></Text>
            <Text style={{ color: "white", fontSize: 16 }}>
              แก้รายการธุรกรรม
            </Text>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.addmonButtons}
              onPress={() => {
                setModalShow(true);
              }}
            >
              <Image style={styles.tinyLogo} source={imagePath} />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              defaultValue={route.params.money.toString()}
              onChangeText={(text) => setBaht(text)}
            />
            <Text
              style={{
                color: "white",
                fontSize: 16,
                marginTop: "5%",
                marginLeft: "3%",
              }}
            >
              Baht.
            </Text>
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 5 }}>
        <TouchableOpacity
          style={styles.allButton}
          onPress={() => showMode("date")}
        >
          <View style={styles.row}>
            <Image
              style={styles.Icons}
              source={require("../images/calendar.png")}
            />
            <Text style={{ marginLeft: "5%", marginTop: "4%", fontSize: 16 }}>
              {text}
            </Text>
            <TouchableOpacity
              style={{
                width: "25%",
                height: 30,
                marginTop: "2.5%",
                marginLeft: 100,
                backgroundColor: "#EFFFFD",
                borderRadius: 10,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "black",
                padding: "auto",
              }}
              onPress={() => showMode("time")}
            >
              <Text style={{ marginLeft: "5%", marginTop: "2%", fontSize: 16 }}>
                เลือกเวลา
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <View style={styles.textDetail}>
          <View style={styles.row}>
            <Image
              style={{
                width: 30,
                height: 30,
                marginLeft: "6%",
                marginTop: "2%",
              }}
              source={require("../images/pencil.png")}
            />
            <TextInput
              style={{
                marginLeft: "7%",
                marginTop: "2%",
                width: "70%",
                fontSize: 16,
              }}
              defaultValue={route.params.fdetail}
              onChangeText={(text) => setDetail(text)}
              multiline={true}
              placeholder="รายละเอียด"
              placeholderTextColor="black"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.allButton} onPress={pickImage}>
          <View style={styles.row}>
            <Image
              style={styles.Icons}
              source={require("../images/photos.png")}
            />
            <Text style={{ marginLeft: "5%", marginTop: "4%", fontSize: 16 }}>
              {" "}
              เลือกรูปภาพ{" "}
            </Text>
          </View>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.imageShow} />}
        {imagePath == require("../images/plus.png") ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalShow(true);
            }}
          >
            <Text style={styles.buttonText}> เลือกหมวดหมู่ </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              storeUpdate();
            }}
          >
            <Text style={styles.buttonText}> แก้ไขธุระกรรม </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.buttonDe}
          onPress={() => {
            openTwoButtonAlert();
          }}
        >
          <Text style={styles.buttonText}> ลบ </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={ModalShow}
        onRequestClose={false}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ backgroundColor: "#000000AA", flex: 100 }}
          onPress={() => setModalShow(!setModalShow)}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: "#000000AA",
            justifyContent: "flex-end",
          }}
        ></View>

        <View
          style={{
            backgroundColor: "#FFFFFF",
            width: "100%",
            paddingHorizontal: 10,
            height: "50%",
          }}
        >
          <Text style={{ fontSize: 20, marginTop: 15, marginLeft: 15 }}>
            หมวดหมู่
          </Text>
          <View style={styles.TankTopContainer}>
            <Text style={styles.TankTop}>รายจ่าย</Text>
            <Switch
              trackColor={{ false: "white", true: "white" }}
              thumbColor={"#FFD365"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={styles.TankTop}>รายรับ</Text>
          </View>
          {isEnabled ? (
            <View>{renderMenu2()}</View>
          ) : (
            <View>{renderMenu1()}</View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#C1F4C5",
  },
  TankTopContainer: {
    flexDirection: "row",
    marginLeft: 15,
    backgroundColor: "#C1F4C5",
    width: "50%",
    height: "8%",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: "3%",
  },
  TankTop: {
    marginTop: 4,
    fontSize: 16,
  },
  imageShow: {
    marginTop: "5%",
    width: "30%",
    height: "30%",
    borderRadius: 50,
    borderColor: "#406882",
    borderWidth: 5,
  },
  addmonContainer: {
    width: "95%",
    backgroundColor: "#406882",
    borderRadius: 10,
    marginTop: 5,
    borderColor: "black",
    borderWidth: 2,
  },
  button: {
    backgroundColor: "#406882",
    width: "80%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: "5%",
  },
  buttonDe: {
    backgroundColor: "#E45826",
    width: "80%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: "2%",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  allButton: {
    height: 70,
    width: "95%",
    backgroundColor: "#EFFFFD",
    borderRadius: 10,
    marginBottom: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  textDetail: {
    height: 70,
    width: "95%",
    backgroundColor: "#EFFFFD",
    borderRadius: 10,
    marginBottom: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  addmonButton: {
    marginLeft: "10%",
    marginTop: "10%",
    width: 50,
    height: 50,
    bottom: 30,
    right: 20,
    borderRadius: 100,
  },
  addmonButtons: {
    marginLeft: "10%",
    marginTop: "10%",
    width: 50,
    height: 50,
    bottom: 30,
    right: 20,
    borderRadius: 100,
    backgroundColor: "#65C18C",
  },
  row: {
    flexDirection: "row",
  },
  tinyLogo: {
    width: 40,
    height: 40,
    marginLeft: "10%",
    marginTop: "10%",
  },
  Icons: {
    width: 40,
    height: 40,
    marginLeft: "5%",
    marginTop: "1%",
  },
  input: {
    color: "white",
    fontSize: 16,
    marginLeft: "5%",
    marginTop: "3.3%",
    width: "50%",
    textAlign: "right",
    backgroundColor: "#65C18C",
    height: "40%",
    paddingRight: 7,
    borderRadius: 6,
  },
});
