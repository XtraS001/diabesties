import React, { Component } from "react";
import { StyleSheet, Text, View, Styl } from "react-native";
import { WebView } from "react-native-webview";

// ...

export default function Testwebview() {
  return (
    <View style={styles.container}>
    <Text>testwebview here</Text>
      <WebView source={{ uri: "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.activity.read&response_type=code&client_id=943487317292-0acg66rkabv0q1f0j5enr6vu66sdd9k8.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth2callback/" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "flex-start",
  },
});
