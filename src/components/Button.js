import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React  from 'react'


const Button = ({onPress,title,style,textStyle}) => {

  return (
    <TouchableOpacity
    style={[styles.btnStyle,style]}
    onPress={onPress}
    activeOpacity={0.7}>
  
      <Text style={[styles.btnText,textStyle]}>{title}</Text>
  
  </TouchableOpacity>
  )
  
}

export default Button

const styles = StyleSheet.create({
    btnStyle: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: 'grey',
        alignSelf: 'center',
        borderRadius: 10,
      },
      btnText:{
        color:"#000000",
        fontSize:15,
        fontWeight:"500"
      }
})