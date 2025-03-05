import Colors from '@/constants/Colors';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const Header = () => {
    const {user} = useContext(AuthContext);
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text
            style={{ fontSize: 25, color: Colors.PRIMARY, fontWeight: "bold" }}
          >
            Hey There!
          </Text>
          <Text
            style={{ fontSize: 18, color: Colors.GARY }}
          >
            Iskenderun Technical University
          </Text>
        </View>
        <Image source={{uri: user?.image}} style={{width: 50, height: 50, borderRadius: 99}} />
      </View>
    );
}

const styles = StyleSheet.create({})

export default Header;
