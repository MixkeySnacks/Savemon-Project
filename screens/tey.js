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
} from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useModal } from "@idiosync/react-native-modal";
import { MenuModal1 } from "./MenuModal1";
import { Button } from "react-native-elements";
import CurrencyInput from "react-native-currency-input";
const tey = () => {
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
  const [show, setShow] = useState(false);
  const [text, setText] = useState("วันที่");
  const [baht, setBaht] = React.useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [detail, setDetail] = useState("");
  const [ModalShow, setModalShow] = useState(false);
  const [imagePath, setImagePath] = useState(require("../images/plus.png"));
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
    setText(fDate + "\n" + fTime);
    console.log(fDate + " (" + fTime + ")");
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  let popupRef = React.createRef();
  const onShowPopup = () => {
    popupRef.show();
  };
  const onClosePopup = () => {
    popupRef.close();
  };
  const renderOutsideTouchable = (onTouch) => {
    const view = <View style={{ flex: 1, width: "100%" }} />;
    if (!onTouch) return view;
    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{ flex: 1, width: "100%" }}
      >
        {view}
      </TouchableWithoutFeedback>
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
              setModalShow(false)
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
              setModalShow(false)
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
              setImagePath(require("../images/bill.png")),
              setModalShow(false)
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
              setModalShow(false)
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
              setModalShow(false)
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
              setModalShow(false)
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
              setModalShow(false)
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
              setImagePath(require("../images/more.png")),
              setModalShow(false)
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
              เงินเดือน
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
              ธุระกิจ
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
              เงินพิเศษ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const view = <View style={{ flex: 1, width: "100%" }} />;
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.addmonContainer}>
          <View style={{ alignItems: "center", marginTop: 5 }}>
            <Text></Text>
            <Text style={{ color: "white", fontSize: 16 }}>
              เพิ่มรายการธุรกรรม
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
            <CurrencyInput
              value={baht}
              onChangeValue={setBaht}
              prefix="฿"
              delimiter=","
              separator="."
              precision={2}
              style={styles.input}
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> เลือกหมวดหมู่ </Text>
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
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
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

export default tey;

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
