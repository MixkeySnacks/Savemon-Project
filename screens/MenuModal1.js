import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  Image,
  Switch,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import MenuScreen , {datas} from "./MenuScreen";

const deviceHeight = Dimensions.get("window").height;
export class MenuModal1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      content: false,
      imagePath: "../images/plus.png",
    };
  }
  show = () => {
    this.setState({ show: true });
  };
  close = () => {
    this.setState({ show: false });
  };
  componentHideAndShow = () => {
    this.setState((previousState) => ({ content: !previousState.content }));
  };
  renderOutsideTouchable(onTouch) {
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
  }
  handleCallback = (childData) => {
    this.setState({ imagePaht: childData });
  };


  renderMenu1 = () => {
    let images = '';
    return (
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.addmonButton}
            onPress={() => {
              (images = "../images/salad.png"),
                this.close(),
                console.log(images)
                this.handleCallback = images
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
              (images = "../images/shopping-cart.png"),
                this.close(),
                console.log(images);
                this.handleCallback = images
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
              (images = "../images/bill.png"),
                this.close(),
                console.log(images);
                this.handleCallback = images
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
              (images = "../images/popcorn.png"),
                this.close(),
                console.log(images);
                this.handleCallback = images
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
              (images = "../images/bus-school.png"),
                this.close(),
                console.log(images);
                this.handleCallback = images
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
              (images = "../images/first-aid-kit.png"),
                this.close(),
                console.log(images);
                this.handleCallback = images
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
              (images = "../images/passport.png"),
                this.close(),
                console.log(images);
                this.handleCallback = images
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
              (images = "../images/more.png"),
                this.close(),
                console.log(images);
                this.handleCallback = images
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
  renderMenu2 = () => {
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
  render() {
    let { show } = this.state;
    const {imagePath} = this.state;
    const { onTouchOutside, title } = this.props;
    this.handleCallback = '../images/plus.png'
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={show}
        onRequestClose={this.close}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#000000AA",
            justifyContent: "flex-end",
          }}
        >
          {this.renderOutsideTouchable(onTouchOutside)}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              width: "100%",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
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
                onValueChange={this.componentHideAndShow}
                value={this.state.content}
              />
              <Text style={styles.TankTop}>รายรับ</Text>
            </View>
            {this.state.content ? (
              <View>{this.renderMenu2()}</View>
            ) : (
              <View>{this.renderMenu1()}</View>
            )}
            <Text>{this.handleCallback}</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#488FB1",
    width: "20%",
    height: "25%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    marginLeft: 5,
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
  addmonButton: {
    marginLeft: "10%",
    marginTop: "10%",
    width: 50,
    height: 50,
    bottom: 30,
    right: 20,
    borderRadius: 100,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    marginLeft: "10%",
    marginTop: "10%",
  },
});
