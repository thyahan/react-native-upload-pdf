import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { DocumentPicker } from "expo";

const url = "http://192.168.1.51:3000/upload";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const fetchWithResponse = (url, body) => {
  const options = {
    method: "POST",
    body,
    headers: {
      Accept: "*/*",
      "content-type": "multipart/form-data"
    }
  };

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => {
        reject(err);
      });
  });
};

const upload = async data => {
  const formData = new FormData();
  const info = {
    uri: data.uri,
    name: data.name,
    type: `application/${data.name.split(".").reverse()[0]}`
  };
  
  formData.append("file", info);

  const { status, responseData } = await fetchWithResponse(url, formData);
  if (status === "SUCCESS") console.log({ responseData });
  else console.log("error");
};

const onSelectDocument = async () => {
  let file = await DocumentPicker.getDocumentAsync({});
  upload(file);
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text>PDF Upload</Text>
      <Button title="Select Document" onPress={onSelectDocument} />
    </View>
  );
}
