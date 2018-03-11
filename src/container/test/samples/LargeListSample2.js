/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: bolan999999@gmail.com
 * Date: 2017/12/14
 *
 */

import React from "react";
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { LargeList } from "react-native-largelist";
import { messages } from "./DataSource";

export default class SquareIOS extends React.Component {
  messages;
  largeList;

  constructor(props) {
    super(props);
    this.state = { refreshing: false };
    this.messages = [...messages];
  }

  render() {
    return (
      <LargeList
        style={{flex:1}}
        ref={ref => (this.largeList = ref)}
        numberOfRowsInSection={() => this.messages.length}
        heightForCell={() => 88}
        refreshing={this.state.refreshing}
        renderCell={this.renderItem.bind(this)}
       
        renderEmpty={() =>
          <View
            style={{
              height: 667,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>Empty</Text>
          </View>}
        renderItemSeparator={() =>
          <View
            style={{ backgroundColor: "#EEE", height: 1, marginLeft: 16 }}
          />}
      />
    );
  }

  renderItem(section: number, row: number) {
    let msg = this.messages[row];
    return (
      <View style={{ flex: 1, backgroundColor: "#FFF" }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Image
            source={msg.icon}
            style={{ marginLeft: 16, width: 44, height: 44 }}
          />
          <View style={{ marginLeft: 4 }}>
            <Text style={{ fontSize: 18 }}>
              {msg.title}
            </Text>
            <Text style={{ fontSize: 14, marginTop: 8 }}>
              {msg.subtitle}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  
}
